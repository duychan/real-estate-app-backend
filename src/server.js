import app from './app.js';
import { connectDataBase } from './database/connectDB.js';
import * as socketio from 'socket.io';
import WebSockets from './utils/WebSockets.js';
import http from 'http';

const PORT = process.env.PORT || 3000;
//Create HTTP server
const server = http.createServer(app);
/** Create socket connection */
global.io = new socketio.Server(server);
global.io.on('connection', WebSockets.connection);
async function run() {
  await connectDataBase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
run();
