const {ChatModel} = require("../db/models");

module.exports = function (server) {
  // get IO object
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });
  // monitor connection
  io.on("connection", function (socket) {
    console.log("soketio connected");
    // binding sendMsg listening, and receive message from client
    socket.on("sendMsg", function ({ from, to, content }) {
      console.log("server receive msg from client", { from, to, content });

      const chat_id = [from, to].sort().join("_");
      const create_time = Date.now();
      new ChatModel({ from, to, content, chat_id, create_time }).save(function (
        err,
        chatMsg
      ) {
        io.emit("receiveMsg", chatMsg);
        console.log("server send msg to client", chatMsg);
      });
    });
  });
};
