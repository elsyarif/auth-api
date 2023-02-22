require('dotenv').config();
const container = require('./infrastructures/container');
const createServer = require('./infrastructures/http/createServer');

const start = async () => {
  const server = await createServer(container);

  await server.start();
  console.log(`server start at ${server.info.uri}`);
};

start();
