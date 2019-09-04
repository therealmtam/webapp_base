// README:
// This file contains the initialization of the Postgres DB.
// Import the models to access the CRUD functions for each table in the DB.
// The models will use this file as a dependency.
/*
  BEFORE USING:
  1) Make sure Postgres is installed.
    one source: https://gist.github.com/sgnl/609557ebacd3378f3b72

    Check by using:
    postgres -V (OR) postgres --version
    into the commandline.

  2) npm install the Sequalize ORM:
    npm install --save sequalize

  3) Before sequalize can connect to the DB, the DB must be
  created. Initially, there is no specific database for this
  application in Postgres. You must either create it manually
  via the commandline or by running a script that can execute
  sql commands and create the database.

    Option 1) via the commandline:
    > psql
    DefaultDB=# CREATE DATABASE <database name>;
    DefaultDB=# \q
*/
//------------------------------------------

const Sequelize = require('sequelize');
const Config = require('../../config/config.js');

// Parameters are database name, username ,password
/*
const sequelize = new Sequelize(`${database}`, `${username}`, `${password}`, {
  host: `${host}`,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
    native: true,
  },
  pool: {
    max: 1000000,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
*/

const sequelize = new Sequelize(`${Config.db.database}`, `${Config.db.username}`, `${Config.db.password}`, {
  host: `${Config.db.host}`,
  dialect: `${Config.db.dialect}`,
});

//------------------------------------------
// CONNECTION TO POSTGRES DB
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

//------------------------------------------
module.exports = {
  Sequelize,
  DB: sequelize,
};

