module.exports = {
  apps: [
    {
      name: 'agap-staging-backend',
      script: 'dist/index.js',
      cwd: '/mnt/agap-staging/backend',
      env: {
        NODE_ENV: 'production',
        PORT: 5050,
      },
      instances: 1,
      exec_mode: 'fork',
      max_memory_restart: '1G',
      error_file: '/mnt/agap-staging/backend/logs/error.log',
      out_file: '/mnt/agap-staging/backend/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    }
  ]
};
