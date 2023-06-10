const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//引入路由
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const chatmessageRoutes = require("./routes/chatmessage")
const app = express();

const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

//连接数据库
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chatmessages", chatmessageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  // 新的连接被建立
  console.log('连接上了')
  //添加消息的socket
  socket.on('add-message', (message) => {
    // 处理收到的消息
    // 将消息广播给其他客户端
    io.emit('add-message', message);
    console.log(message)
  });

  //添加登录信息的socket
  socket.on('add-login', (login) => {
    // 处理收到的消息
    // 将消息广播给其他客户端
    io.emit('add-login', login);
    console.log(login)
  });


  //聊天室的socket
  socket.on('chat-room', (message) => {
    //处理接收的数据
    io.emit('chat-room', message);
    console.log(message);
  })

  socket.on('disconnect', () => {
    // 处理连接断开的逻辑
    console.log('断开了！')
  });
});
