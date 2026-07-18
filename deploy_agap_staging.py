#!/usr/bin/env python3
import subprocess
import os
import sys
import tarfile
import time

# --- Helper function to parse local .env variables ---
def get_env_var(key: str, default=None) -> str:
    if not os.path.exists(".env"):
        return default
    with open(".env", "r") as f:
        for line in f:
            line = line.strip()
            if line.startswith("#") or not line:
                continue
            if "=" in line:
                k, v = line.split("=", 1)
                if k.strip() == key:
                    return v.strip().strip('"').strip("'")
    return default

# --- Configuration ---
REMOTE_USER  = get_env_var("SSH_USER", "Administrator1")
REMOTE_HOST  = get_env_var("SSH_HOST", "20.24.58.49")
REMOTE_ROOT  = "/mnt/agap-staging"
SSH_KEY_PATH = get_env_var("SSH_KEY_PATH", os.path.expanduser("~/.ssh/id_rsa")).replace("\\", "/")
# Check if key file exists locally, otherwise omit -i from SSH commands
SSH_KEY_OPT = f'-i "{SSH_KEY_PATH}"' if os.path.exists(SSH_KEY_PATH) else ""
ARCHIVE_NAME = "agap-staging-deploy.tar.gz"
ECOSYSTEM_CONFIG = "ecosystem.agap-staging.config.cjs"
PM2_NAME     = "agap-staging-backend"

def run_ssh(command: str, timeout=120):
    """Run commands over SSH with strict host key checking bypassed."""
    # Use BatchMode=yes for the non-interactive check to prevent hangs on password input
    ssh_cmd = f'ssh -o BatchMode=yes -o StrictHostKeyChecking=no -o ConnectTimeout=5 {SSH_KEY_OPT} {REMOTE_USER}@{REMOTE_HOST} "{command}"'
    try:
        return subprocess.run(ssh_cmd, shell=True, capture_output=True, text=True, timeout=timeout)
    except subprocess.TimeoutExpired:
        print(f"  [ERROR] SSH command timed out after {timeout}s")
        sys.exit(1)

def main():
    print("\n" + "="*60)
    print("[DEPLOY] AGAP STAGING PORTAL (v1.0)")
    print("="*60)
    
    start_time = time.time()

    # Pre-check: Verify SSH Connection (Optional Key check)
    print("\n[PRE-CHECK] Checking SSH key authorization...")
    test_conn = run_ssh("echo connection_ok")
    if "connection_ok" in test_conn.stdout:
        print("  [OK] SSH Key authorized. Password-less login active.")
    else:
        print("  [INFO] SSH key not found/authorized. You will be prompted for your VM password during upload.")

    # 1. Build local frontend
    print("\n[1/5] BUILDING frontend client...")
    env = os.environ.copy()
    env["VITE_BASE_PATH"] = "/insighted/AGAP-staging/"
    env["VITE_API_URL"] = "/insighted/AGAP-staging"
    env["NODE_OPTIONS"] = "--max-old-space-size=4096"
    try:
        # Run npm run build on the frontend
        subprocess.run("npm run build --prefix frontend", shell=True, check=True, env=env)
    except subprocess.CalledProcessError:
        print("  [ERROR] Frontend compilation failed! Aborting.")
        sys.exit(1)

    # 2. Archive files
    print(f"\n[2/5] ARCHIVING deployment payload -> {ARCHIVE_NAME}...")
    files_to_include = ["backend", "frontend/dist", "package.json", "package-lock.json", ".env", ECOSYSTEM_CONFIG]
    
    def exclude_node_modules(tarinfo):
        if "node_modules" in tarinfo.name or ".git" in tarinfo.name or "dist" in tarinfo.name:
            # Keep frontend/dist but exclude backend/dist if any, and node_modules
            if tarinfo.name.startswith("frontend/dist"):
                return tarinfo
            if tarinfo.name.startswith("backend/dist"):
                return None
            return None
        return tarinfo

    with tarfile.open(ARCHIVE_NAME, "w:gz") as tar:
        for f in files_to_include:
            if os.path.exists(f):
                tar.add(f, filter=exclude_node_modules)
                print(f"       + {f}")
            else:
                print(f"       [SKIP] not found: {f}")

    # 3. Create remote folder and upload
    print(f"\n[3/5] UPLOADING archive to {REMOTE_HOST}:{REMOTE_ROOT}...")
    try:
        # Prepare remote directory with sudo, then transfer
        run_ssh(f"sudo mkdir -p {REMOTE_ROOT} && sudo chown -R {REMOTE_USER}:{REMOTE_USER} {REMOTE_ROOT}")
        scp_cmd = f'scp -o StrictHostKeyChecking=no -o ConnectTimeout=10 {SSH_KEY_OPT} {ARCHIVE_NAME} {REMOTE_USER}@{REMOTE_HOST}:{REMOTE_ROOT}/'
        subprocess.run(scp_cmd, shell=True, check=True)
    except subprocess.CalledProcessError:
        print("  [ERROR] SCP upload failed!")
        sys.exit(1)

    # 4. Remote extraction, npm installs, build backend, PM2 launch
    print("\n[4/5] REMOTE extraction, building backend, and launching PM2...")
    remote_script = (
        f"cd {REMOTE_ROOT} && "
        f"pm2 stop {PM2_NAME} 2>/dev/null || true && "
        f"sudo rm -rf backend frontend && "
        f"mkdir -p dist && sudo rm -rf dist/* && "
        f"tar -xzf {ARCHIVE_NAME} && "
        f"sudo chown -R {REMOTE_USER}:{REMOTE_USER} {REMOTE_ROOT} && "
        # Move frontend static files inside dist/ instead of renaming directory (prevents Nginx locks)
        f"mv frontend/dist/* dist/ && "
        f"rm -rf frontend && "
        # Install and build backend
        f"cd backend && "
        f"mkdir -p logs && "
        f"echo '       → Installing backend dependencies...' && "
        f"npm install --legacy-peer-deps --prefer-offline --no-audit --no-fund 2>&1 | tail -n 5 && "
        f"echo '       → Generating Prisma client...' && "
        f"npx prisma generate --schema=database/schema.prisma 2>&1 | tail -n 5 && "
        f"echo '       → Building backend TypeScript...' && "
        f"npm run build 2>&1 | tail -n 5 && "
        # Start backend with PM2
        f"cd {REMOTE_ROOT} && "
        f"pm2 delete {PM2_NAME} 2>/dev/null || true && "
        f"pm2 start {ECOSYSTEM_CONFIG} && "
        f"rm -f {ARCHIVE_NAME}"
    )

    ssh_cmd = f'ssh -t -o StrictHostKeyChecking=no {SSH_KEY_OPT} -o ConnectTimeout=10 {REMOTE_USER}@{REMOTE_HOST} "{remote_script}"'
    try:
        subprocess.run(ssh_cmd, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"  [ERROR] Remote execution failed with code {e.returncode}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\n  [WARN] Deployment interrupted by user.")
        sys.exit(1)

    # 5. Final Health Check
    print("\n[5/5] VERIFYING backend health on port 5050...")
    health = run_ssh("curl -s http://127.0.0.1:5050/ || curl -s http://127.0.0.1:5050/api/")
    if health.stdout.strip():
        print("      SUCCESS: AGAP Staging backend confirmed online on port 5050!")
    else:
        print("      [WARN] Backend health check failed to respond. Check PM2 logs using 'pm2 logs agap-staging-backend'.")

    # Clean up local archive
    if os.path.exists(ARCHIVE_NAME):
        os.remove(ARCHIVE_NAME)

    duration = time.time() - start_time
    print("\n" + "="*60)
    print(f"[SUCCESS] AGAP Staging deployed successfully! (Duration: {duration:.1f}s)")
    print("    URL: https://stride.deped.gov.ph/insighted/AGAP-staging/")
    print("="*60 + "\n")

if __name__ == "__main__":
    main()
