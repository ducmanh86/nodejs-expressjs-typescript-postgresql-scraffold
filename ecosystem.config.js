module.exports = {
  apps : [{
    name: 'articles',
    script: './node_modules/.bin/ts-node',
    args: '--project tsconfig.json ./src/index.ts',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: true,
    merge_logs: true,
    max_memory_restart: '1G',
    wait_ready: true,
    listen_timeout: 3000,
    log_date_format: 'YYYY-MM-DD HH:mm Z',
    output: './logs/out.log',
    error: './logs/error.log',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
