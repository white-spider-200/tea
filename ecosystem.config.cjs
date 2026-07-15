/** @type {import('pm2').StartOptions} */
module.exports = {
  apps: [
    {
      name: "royal-regime",
      script: "dist/server.cjs",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      merge_logs: true,
      time: true,
      error_file: "logs/pm2-error.log",
      out_file: "logs/pm2-out.log",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
