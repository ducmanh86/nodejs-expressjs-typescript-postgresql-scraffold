// configs for pm2
module.exports = {
  apps : [{
    name: 'articles',
    script: './src/index.ts',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: ['src'],
    watch_delay: 1000,
    merge_logs: false,
    max_memory_restart: '1G',
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    output: './logs/out.log',
    error: './logs/error.log',
    env: {
      NODE_ENV: 'production',
    }
  }]
};
