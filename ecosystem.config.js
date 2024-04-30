module.exports = {
    apps : [
        {
            name: "touchebuilderbot",
            script: "./dist/app.js",
            watch: false,
            max_memory_restart: '900M',
            exec_mode:"cluster",
            instances: 1,
            cron_restart: "59 23 * * *",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            }
        }
    ]
  }