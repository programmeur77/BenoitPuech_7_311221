require('dotenv').config();
const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || process.env.CONNECTION_PORT);
const server = http.createServer(app);

server.on('listening', () => {
  console.log(`Listening on port: ${process.env.PORT || process.env.CONNECTION_PORT}`);
});

server.listen(process.env.PORT || process.env.CONNECTION_PORT);
