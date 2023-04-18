import webSocketsMessages from '../configs/webSocketsMessages.js';
class WebSockets {
  users = [];
  connection(client) {
    // event fired when the chat room is disconnected
    client.on(webSocketsMessages.disconnect, () => {
      this.users = this.users?.filter((user) => user.id !== client.id);
    });
    // add identity of user mapped to the socket id
    client.on('webSocketsMessages.identity', (userId) => {
      console.log(userId);
      this.users?.push({
        socketId: client.id,
        userId: userId,
      });
    });
    //subcribe seller and buyer to the chat room
    client.on(webSocketsMessages.subcribed, (room, buyerId) => {
      this.subcribeBuyer(room, buyerId);
      client.join(room);
    });
    // mute a chat room
    client.on(webSocketsMessages.unsubcribed, (room) => {
      client.leave(room);
    });
  }
  subcribeBuyer(room, buyerId) {
    const userSockets = this.users.filter((user) => user.userId === buyerId);
    userSockets.map((userInfo) => {
      const socketConn = global.io.sockets.connected(userInfo.socketId);
      if (socketConn) {
        socketConn.join(room);
      }
    });
  }
}
export default new WebSockets();
