const http = require('http');
const app = require('./app');
const { wss, upgradeCb } = require('./ws/upgradeCb.ts');
const connectionCb = require('./ws/connectionCb.ts');

require('dotenv').config();

const { PORT } = process.env;

const server = http.createServer(app);

server.on('upgrade', upgradeCb);
wss.on('connection', connectionCb);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});