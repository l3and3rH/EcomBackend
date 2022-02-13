# Storefront Backend Project

First clone the repository. Then you have to run the following commands to install the dependencies:

npm install & npm run build

# Database and Variables

You will need a database and a couple of env variables

First Create local database

CREATE USER EcomDB_User WITH PASSWORD 'devpw123';
CREATE DATABASE EcomDB;
GRANT ALL PRIVILEGES ON DATABASE EcomDB TO EcomDB_User;

Then Setup an .env file with the following variables:
DEV_DB=ecomdb
DEV_DB_User=ecomdb_user
DEV_DB_PW=devpw123
DEV_DB_HOST=localhost
Pepper=pfsönjlfshadiuwer8892p3i4pj3hwef832zhliwd
SaltRounds=10
TOKEN_SECRET=nsaldksahdlsesfdd

# Migrate

After that you just have to use db-migrate to create all the tables

- db-migrate up

# Test

Finally you can build and test with the following command:

- npm run test

# Run

And running the Project with:

- npm run start
