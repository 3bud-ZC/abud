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
      max_memory_restart: "1G",
      
      // Environment variables
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      
      // Logging configuration
      error_file: "/home/abdullah/.pm2/logs/abud-platform-error.log",
      out_file: "/home/abdullah/.pm2/logs/abud-platform-out.log",
      log_file: "/home/abdullah/.pm2/logs/abud-platform.log",
      time: true,
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      
      // Log rotation (prevents log files from growing too large)
      max_log_size: "10M",
      retain_logs: 7, // Keep logs for 7 days
      
      // Restart behavior
      min_uptime: "10s", // Consider app crashed if it exits within 10s
      max_restarts: 10, // Max restart attempts within 1 minute
      restart_delay: 4000, // Wait 4s before restart
      
      // Health monitoring
      kill_timeout: 5000, // Wait 5s for graceful shutdown
      listen_timeout: 3000, // Wait 3s for app to be ready
      
      // Error handling
      exp_backoff_restart_delay: 100, // Exponential backoff for restarts
    },
  ],
};
