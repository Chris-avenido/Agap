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
REMOTE_ROOT  = "/mnt/agap-portal"
SSH_KEY_PATH = get_env_var("SSH_KEY_PATH", os.path.expanduser("~/.ssh/id_rsa")).replace("\\", "/")
# Check if key file exists locally, otherwise omit -i from SSH commands
SSH_KEY_OPT = f'-i "{SSH_KEY_PATH}"' if os.path.exists(SSH_KEY_PATH) else ""
ARCHIVE_NAME = "agap-portal-deploy.tar.gz"
ECOSYSTEM_CONFIG = "ecosystem.agap-portal.config.cjs"
PM2_NAME     = "agap-portal-backend"

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
    print("[DEPLOY] AGAP PRODUCTION PORTAL (v1.0)")
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
    env["VITE_BASE_PATH"] = "/insighted/AGAP-Portal/"
    env["VITE_API_URL"] = "/insighted/AGAP-Portal"
    env["NODE_OPTIONS"] = "--max-old-space-size=4096"
    try:
        # Run npm run build on the frontend
        subprocess.run("npm run build --prefix frontend", shell=True, check=True, env=env)
    except subprocess.CalledProcessError:
        print("  [ERROR] Frontend compilation failed! Aborting.")
        sys.exit(1)
    print("  [OK] Frontend built successfully.")

    # 2. Archive files
    print(f"\n[2/5] ARCHIVING deployment payload -> {ARCHIVE_NAME}...")

# --- FIXED PRODUCTION ENVIRONMENT ---
PRODUCTION_ENV = """\

DATABASE_URL=postgres://Administrator1:pRZTbQ2T1JD7@stride-posgre-prod-01.postgres.database.azure.com:5432/AGAP?sslmode=require
EMAIL_USER=helpdesk.stride@gmail.com
EMAIL_PASS=nsij vamm oqeu yhlx

# GOOGLE API
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"insighted-drive-api","private_key_id":"97b7546d1bba7882caca514791dcd7f408398ff0","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCmizsuUGiYThXP\ngF35aUYAs5bTj5EYdRut0njRSSlY54cwQbvSG5Xeza7u0Ty/XLvgKXFH2Jg1+wgv\nky50aT7vaRwekb2U6RSbXeF2+Q4ufL5i6VqmwQvAorHDWC2FG+7DsifnPzlWwyVg\nT00/tMvQnRvV0uyKQqf87OC/+djAiQCzFMVoiK1W3m07MR4LpDMrQdadvkYqLTHe\n/kHWPGIt+O0mxep9w18t3zvWsQaqNnH2zpRF3XHfL4ZqIhN6Qs8rlhSRZud36cc2\nWaf/BjRM5mi/+MLTEPDQwL94X4mDgn+QQntvs6s06SjNWFpoihCjEJMUdOXStRo9\nWAKvDEXpAgMBAAECggEAE1zhqw9PMdH2SDM4+cvrBx7aHMu2x1yqNKnhQRfb9kmo\n1ov17cYmRQqt2Xc7NFZwQ24eDQfaHoCKoZlfj8pCtmwGiGlSXNNCgZPHKGFpbC81\npWNTFksgdiuUNk10sWKffmIisIiRvowettVRemQnRCBYAaKtvJ9mT4os0TUXpb63\n5xObLVnKIttmGI2cNYQjimAcegruE+i8WRhYwwqHr+EeIHpqQ70iDSuu4HpdPkdW\nKfCl04plDUK7n+0FUN51WdLgJpjVuqYZEj0CO1U4NqlY9jDLJ78zVdWhCnq8904w\nqMgqQM6eViKaLoLBQaT6kG9IpxODGn9qPj43SlwJJwKBgQDXdq97XlQ0V/iecyG0\nK9AgSq7e2GKjCTA1yLeWrFT5N4WgOIJrAXG9CVzKgtTJbmgwD+a/y0bVIorL2L2D\nPuPSXdhIuFr7KLRSoWxCez237Y3YQt6iwTmVRlOHNPBE1ERcDsCy4h7yzyh8RQlV\nq6pL0IrjL5O2nyQj6hBoIomD7wKBgQDF4HAINL2829ZFLrZE7dgJUXEFpEiqxx6s\nxI8k8YRFfHq5t8QrkcZPOrW+yEk9kJZrYt8raElq8H4PszACDIJowupMNb5zsXA6\nS3IgYBqMIkePRyKUkcU+2MuRMZWwf8N07nztZOo0omYqxe32MXfTjtgZnWlAETp9\nWbLDb2MbpwKBgQCqsgwz4Hc1QLxmSy/YXR11d7UyNptuLklTUsCfTcfD6IikdiBc\nRbil2lT42s1ZB27jJLXaHGDxWXw8ImmBIMG8VzyR3/u0Hns9O0VZJemvXTOSsOdQ\naWQFLsHdy8LNxJyjkcx360w5cITSbp8GkAlKJtzhPz/23fzztutolHP9YQKBgEZx\njxCszftE+/PnHEZPsgAnOSg8Aw6hEn+I/ji1rlQaa4pgLHsiS0n7aaZAoSpEpfgW\n28IVP0XN1eL69JVWJLrs4QI+g82mFoD6SOfTrr/CmF0eguYHOwQTo+zNjS+nXErt\neBX/Pg183whNLFjf5XuwN6huzIBdYcgsPaKrrcmzAoGBAJwe6gcUAcxbdjS1h2a8\nUgxrh8skn/IFs3ZS5PrbKRoV5ZANtNI78BBTOVsAOOwo/uA9KWwYOsRKhY8FzJBA\nKaLB0m/+MEo7MT9rtm0hK6+A+E5XaD8iq4lvmuOnpmv912csPSr812x/iUokWtYq\npmv912csPSr812x/iUokWtYqzmwXFgVjPU5A+1qmXtMnB8tM\n-----END PRIVATE KEY-----\n","client_email":"insighted-drive-access@insighted-drive-api.iam.gserviceaccount.com","client_id":"108014449194467012301","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/insighted-drive-access%40insighted-drive-api.iam.gserviceaccount.com","universe_domain":"googleapis.com"}

# Master Password for Admin/Superuser Access (Keep Secret!)
ADMIN_MASTER_PASSWORD=STRIDEINSIGHTED2026

# Azure Blob Storage Configuration (For PDF Uploads)
# IMPORTANT: User must populate this before testing uploads
# AZURE_STORAGE_CONNECTION_STRING=ReplaceWithYourAzureStorageConnectionString

# Ollama Configuration (Remote VM)
OLLAMA_BASE_URL=http://20.24.58.49:11434

GEMINI_API_KEY=AIzaSyBDPVc93PHP9ZZQT0pQ4j0gn3ONP34WHP8
# Firebase Scrypt Parameters (Restored for legacy auth)
FIREBASE_HASH_SIGNER_KEY="m1vbW7x/AEK7drAFWBcDDvlRsRFyPhnf0epbKlBPNE26edlFEnCVutylfKOBi7/89UaHJIqXj3pvgvnz2rbY6Q=="
FIREBASE_HASH_SALT_SEPARATOR="Bw=="
FIREBASE_HASH_ROUNDS=8
FIREBASE_HASH_MEM_COST=14

# UPLOAD_DIR=E:/InsightEd-Mobile-PWA/uploads
UPLOAD_DIR=./uploads

# url=https://thirdlevel-file-api.onrender.com/
url=https://thirdlevel-file-yox9.vercel.app

AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=strideazureblobstorage;AccountKey=XmW/q9UpWObxTsN/OP46ILWt/KMcWkJCzF4lNlefzMC4X7VrVGZMzgUJJoqz+I9tgH7Qd6Yt0ZBc+AStLMLyGA==;EndpointSuffix=core.windows.net
# High-Capacity File Storage (matches VM pathing)
# UPLOAD_DIR=/mnt/uploads

AZURE_FOLDER_NAME=staging-agap

#VIRTUAL MACHINE
# 20.24.58.49
# mcp_agent
# mcp_agent_secret_2026

APP_AUTH_CODE=mXqWpLsKdJfN
CRON_SECRET=super_secret_midnight_key_123

# Frontend variables
VITE_API_URL=http://localhost:3000


AGAP_PORTAL_SSO_EMAIL=wilfredo.cabral@deped.gov.ph
AGAP_PORTAL_SSO_USERNAME=hr_officer

# Local Dev SSO Token Bypass
VITE_DEV_SSO_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpbnNpZ2h0ZWQtaHEiLCJhdWQiOiJhZ2FwLWFwcGxpY2FudHMiLCJzdWIiOiJ3aWxmcmVkby5jYWJyYWxAZGVwZWQuZ292LnBoIiwiZW1haWwiOiJ3aWxmcmVkby5jYWJyYWxAZGVwZWQuZ292LnBoIiwidHlwZSI6ImhxX3NzbyIsInJvbGUiOiJBcHBsaWNhbnQiLCJpYXQiOjE3ODQ1OTg5NTgsImV4cCI6MTc4NDU5OTI1OCwianRpIjoiNzZhMzFjZjEtNjgwNi00MjMxLTk4ZjUtNDE0YzkyNWFjMDFkIn0.1U9_sf0nIvBJEy9En52ai35lDp4Uam6NVY1n9RZmcrk

# HQ SSO Token Secret Key
JWT_SECRET=STRIDE_INSIGHTED_SECRET_2026_KEY_PROD
"""

# Write to temp file for archiving
with open(".env.prod.tmp", "w") as f:
    f.write(PRODUCTION_ENV)

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
    print("\n[5/5] VERIFYING backend health on port 5070...")
    health = run_ssh("curl -s http://127.0.0.1:5070/ || curl -s http://127.0.0.1:5070/api/")
    if health.stdout.strip():
        print("      SUCCESS: AGAP Portal backend confirmed online on port 5070!")
    else:
        print("      [WARN] Backend health check failed to respond. Check PM2 logs using 'pm2 logs agap-portal-backend'.")

    # Clean up local archive
    if os.path.exists(ARCHIVE_NAME):
        os.remove(ARCHIVE_NAME)

    duration = time.time() - start_time
    print("\n" + "="*60)
    print(f"[SUCCESS] AGAP Portal production deployed successfully! (Duration: {duration:.1f}s)")
    print("    URL: https://stride.deped.gov.ph/insighted/AGAP-Portal/")
    print("="*60 + "\n")

if __name__ == "__main__":
    main()
