// README:
// This file contains database CRUD functions.
/*
  BEFORE USING:
  1) Make sure Redis is installed.

  2) npm install the Redis client for Node:
    npm install --save redis

  3) Create a script in package.json to start Redis:

    "redis": "redis-server"

    Redis must be started before the server can connect to it.
*/
//------------------------------------------
const redis = require('redis');
//------------------------------------------
const client = redis.createClient(); // Note: Async process
//------------------------------------------
// CRUD FUNCTIONS:

const create = (id, val, callback) => {
  client.set(id, val, (err, result) => {
    if (err) {
      console.log(err); // error handle
    }
    console.log('created new cache entry');
    if (callback) {
      callback(result);
    }
  });
};

const read = (id, callback) => {
  client.get(id, (err, result) => {
    if (err) {
      console.log(err); // error handle
    }
    callback(result);
  });
};

module.exports = {
  create,
  read,
};

