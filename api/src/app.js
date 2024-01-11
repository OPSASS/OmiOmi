const express = require("express");
const path = require("path");
const http = require("http");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");
const Route = require("./routes");
const db = require("./config/database");
const socketIo = require("socket.io");

const app = express();
const port = process.env.PORT || "3001";
const ui = process.env.UI || "3000";
const server = http.createServer(app); // Tạo server HTTP từ ứng dụng Express
const io = socketIo(server, {
  cors: {
    origin: `http://localhost:${ui}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

let activeUsers = [];
io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} just connected!`);

  // add new User
  socket.on("user-status", (newUserId) => {
    if (!activeUsers.find((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
      console.log("New User Connected", activeUsers);
    }

    io.emit("get-user-status", activeUsers);
  });

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);

    console.log("🔥: A user disconnected");
    console.log("userData:", activeUsers);
    io.emit("get-users", activeUsers);
  });

  // send message to a specific user
  socket.on("send-message", (message) => {
    if (message) {
      const receiver = activeUsers.filter((user) =>
        message?.chatData?.membersId.includes(user.userId)
      );
      console.log(message, activeUsers, receiver);
      if (receiver.length > 0)
        receiver.forEach((item) => {
          if (item.userId !== message.userId) {
            socket.to(item.socketId).emit("recieve-message", message);
          }
        });
    }
  });

  // removed
  socket.on("removed", (data) => {
    console.log("removed: ", data);
    socket.broadcast.emit("send-removed", data);
  });

  socket.on("send-comment", (data) => {
    const receiverId = data;
    // const user = activeUsers.find(
    //   (user) => user.userId !== receiverId.senderId
    // );
    console.log(activeUsers);
    console.log("Data: ", data);
    const user = activeUsers.filter((user) => user.userId === data.userId);
    if (user) socket.broadcast.emit("recieve-comment", receiverId);
    console.log("recieve-comment", receiverId);
  });

  // typing
  socket.on("typing", (data) => {
    console.log("typing: ", data);
    socket.broadcast.emit("off-typing", data);
  });

  // status
  socket.on("status", (data) => {
    console.log("status: ", data);
    const user = activeUsers.filter((user) => user.userId === data.userId);
    console.log(user);
    if (user) socket.broadcast.emit("get-status", data);
  });

  socket.on("notification", (data) => {
    const receiverId = data;
    console.log("activeUsers: ", activeUsers);

    const user = activeUsers.filter((user) => user.userId === data.userId);
    if (user) socket.broadcast.emit("get-notification", receiverId);
    console.log("get-notification", receiverId);
  });
});

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(
  "/images/chats",
  express.static(path.join(__dirname, "public/uploads/chats"))
);

app.use(
  "/images/posts",
  express.static(path.join(__dirname, "public/uploads/posts"))
);
app.use(
  "/images/avatar",
  express.static(path.join(__dirname, "public/uploads/avatar"))
);
app.use(
  "/images/background",
  express.static(path.join(__dirname, "public/uploads/background"))
);

app.use(
  "/images/comments",
  express.static(path.join(__dirname, "public/uploads/comments"))
);

app.use(
  "/shorts",
  express.static(path.join(__dirname, "public/uploads/shorts"))
);
app.use("/files", express.static(path.join(__dirname, "public/uploads/files")));

app.use(methodOverride("_method"));
app.use(morgan("dev"));

// View Engine
app.engine("pug", require("pug").__express);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Express Session Middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Passport Config
require("./middleware/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Error Handling Middleware
app.use(function (error, req, res, next) {
  console.error(error.stack);
  res
    .status(500)
    .send("500 Có gì đó không ổn! Hoặc máy tính không có internet\n" + error);
});

app.get("*", function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// GET app
Route(app);

// Start server
server.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
