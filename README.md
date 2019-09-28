# Backend for Shoplistic

### Prerequisites
* `git`
* `docker`
* `docker-compose`


### Install

1. Get the code: `git clone https://github.com/shoplistic/backend`.
2. Change directory to the code: `cd backend`.
3. Run the setup script: `./scripts/setup.sh`.
4. Edit `.env`. Make sure to add a recaptcha secret key and add your username to the admins list.
5. `docker-compose up` to start the server!

### Dev mode
1. Do step 1 and 2 from [Install](#Install).
2. Run `npm i`.
3. Run the setup script: `./scripts/setup.sh`.
4. Edit `.env`. Set `NODE_COMMAND` to `npm run dev`. Add your username to the admins list. Also, make sure to set `NODE_ENV` to `dev`.
5. `docker-compose up` to start the server!
