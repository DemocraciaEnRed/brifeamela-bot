# Brifeame.LA - A simple telegram bot that serves a digital magazine.

## Requirements

- NodeJS 16 or higher (https://nodejs.org/en/download/)
- A Telegram bot token (https://core.telegram.org/bots#6-botfather)

Made By Democracia En Red (https://democraciaenred.org/)

- Guillermo Croppi [@guillermocroppi](https://twitter.com/guillermocroppi)

# Install

1. Git clone the repo
2. Make sure Node is version 16 (use nvm)
3. Run `npm install`
4. Create a `.env` making a copy of `.env.example` like `$ cp .env.example .env` and fill the variables
5. Create a `app.log` file in the root of the project by doing:

```sh
mapache@guillecro:~/brifeamela-bot$ touch app.log
mapache@guillecro:~/brifeamela-bot$ sudo chmod a+w app.log
```

6. Start the bot with pm2 by doing: `$ pm2 start index.js --name briefamela-bot`

* Check the logs with: `$ pm2 logs briefamela-bot`
* Check the status with: `$ pm2 status briefamela-bot`
* Stop the bot with: `$ pm2 stop briefamela-bot`
* Restart the bot with: `$ pm2 restart briefamela-bot`
* Delete the bot with: `$ pm2 delete briefamela-bot`
* Save the bot to run on startup with: `$ pm2 save`