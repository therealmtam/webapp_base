'use strict';

const Server = require('server.js');
const server = new Server();

const startServer = async function() {
    await server.start();
};

startServer();
