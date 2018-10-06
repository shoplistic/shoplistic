# Not your average shopping list

### Prerequisites
* `libpq-dev` is installed.
* `git` is installed.
* `docker` is installed.
* `docker-compose` is installed.
* [Angular-cli](https://cli.angular.io/) is installed

### Install

1. Get The Code
  1.1 Clone and cd into the directory. `git clone https://github.com/olback/shopper & cd shopper`
  1.2 Copy `.env.sample` to `.env`. `cp .env.sample .env`
  1.3 Edit `.env` to your liking.
2. Install & Build Angular App
  2.1 Change directory to the Angular app. `cd app`
  2.2 Install dependencies. `npm install`
  2.3 Build the app. `ng build --prod`
  2.4 Go back to the root of shopper. `cd ..`
3. Install & Build Server
  3.1 Change directory to the server. `cd server`
  3.2 Install dependencies. `npm install`
  3.3 Build the server. `npm run ts:compile`
  3.4 Go back to the root of shopper. `cd ..`
4. Docker Setup
  4.1 Start the docker containers. `docker-compose up` (don't add `-d` here)
5. Postgres Setup
  5.1 Open a shell to the postgres instance. `docker exec -it shopper_postgres_1 /bin/bash`
  5.2 Change directory to `setup`. `cd setup`
  5.3 Run the setup script. `./install.sh` If you get promted to enter a password, enter the value of `PQ_PASSWORD` in the `.env` file.
  5.4 Exit the shell. `exit`
6. Mongo Setup
  6.1 Open a shell to the postgres instance. `docker exec -it shopper_mongo_1 /bin/bash`
  6.2 Change directory to `setup`. `cd setup`
  6.3 Run the setup script. `./install.sh`
  6.4 Exit the shell. `exit`
7. Production Ready
  7.1 Stop the docker-container command with CTRL+C. (don't force-kill it)
  7.2 Start to automatically run shopper on boot, run `docker-compose up -d`
8. Nginx Setup
  8.1 Comming later
