module.exports = {
  apps: [
    {
      name: "abud-platform",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "/home/abdullah/abud-platform",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "/home/abdullah/.pm2/logs/abud-platform-error.log",
      out_file: "/home/abdullah/.pm2/logs/abud-platform-out.log",
      log_file: "/home/abdullah/.pm2/logs/abud-platform.log",
      time: true,
    },
  ],
};
