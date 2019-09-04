// HELPFUL REDIS INFO:
//-----------------------------------------------
// General Notes:

  1)

//-----------------------------------------------
// HOW TO ACCESS REDIS VIA TERMINAL:

  Reference https://redis.io/commands

  After Redis has been started by running:

  > redis-server

  access Redis by:

  > redis-cli
  127.0.0.1: 6379 >GET _<key>_  //insert commands here

//-----------------------------------------------
// HOW TO FLUSH THE CACHE SCRIPT:

const redis = require('redis');

const ClearCache = function () {

  const client = redis.createClient();

  client.once('ready', () => {
    client.flushall((err, result) => {
      if (err) {
        console.log(err); //error handle
      }
      console.log('Removed Redis Cache');
      client.quit();
    });
  });
};

ClearCache();
//-----------------------------------------------
// DEPLOYMENT NOTES:

1) To install Redis:

  > sudo apt-get update
  > sudo apt-get upgrade
  > sudo apt-get install redis-server

  (Reference: https://www.rosehosting.com/blog/how-to-install-configure-and-use-redis-on-ubuntu-16-04/)

2) To start Redis as daemon:

  > sudo redis-server --daemonize yes

3) To kill Redis daemon:

  > sudo killall redis-server

