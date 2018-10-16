# Not your average shopping list

### Prerequisites
* `libpq-dev` is installed.
* `git` is installed.
* `docker` is installed.
* `docker-compose` is installed.
* [Angular-cli](https://cli.angular.io/) is installed

### Install

1.  Get The Code
    1. Clone and cd into the directory. `git clone https://github.com/olback/shopper & cd shopper`
    2. Copy `.env.sample` to `.env`. `cp .env.sample .env`
    3. Edit `.env` to your liking.
2.  Install & Build Angular App
    1. Change directory to the Angular app. `cd app`
    2. Install dependencies. `npm install`
    3. Build the app. `ng build --prod`
    4. Go back to the root of shopper. `cd ..`
3.  Install & Build Server
    1. Change directory to the server. `cd server`
    2. Install dependencies. `npm install`
    3. Build the server. `npm run ts:compile`
    4. Go back to the root of shopper. `cd ..`
4.  Docker Setup
    1. Start the docker containers. `docker-compose up` (don't add `-d` here)
5.  Postgres Setup
    1. Run the setup script in the container. `docker exec shopper_postgres_1 /bin/bash /setup/install.sh`
6.  Mongo Setup
    1. Run the setup script in the container. `docker exec shopper_mongo_1 /bin/bash /setup/install.sh`
7.  Production Ready
    1. Stop the docker-container command with CTRL+C. (don't force-kill it)
    2. To automatically run shopper on boot, run `docker-compose up -d`
8.  Nginx Setup
    1. Comming later
