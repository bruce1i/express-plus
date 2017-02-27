module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // First application
        {
            name: "项目名称（端口）",
            script: "./bin/www",
            env: {
                NODE_ENV: "production"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        // production: {
        //     user: "username",
        //     host: "localhost",
        //     ref: "origin/master",
        //     repo: "git-path",
        //     path: "/Users/lixun/Desktop/git-source/test-deploy",
        //     "post-deploy": "pm2 startOrRestart ecosystem.config.js --env production"
        // }
    }
};
