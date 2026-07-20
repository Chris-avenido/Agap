module.exports = {
  apps: [
    {
      name: 'agap-portal-backend',
      script: 'dist/index.js',
      cwd: '/mnt/agap-portal/backend',
      env: {
        NODE_ENV: 'production',
        PORT: 5070,
      },
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1G',
      error_file: '/mnt/agap-portal/backend/logs/error.log',
      out_file: '/mnt/agap-portal/backend/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    }
  ]
};
