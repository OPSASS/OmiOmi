const siteRouter = require("./site");
const authRouter = require("./auth");
const postsRouter = require("./posts");
const userRouter = require("./users");
const notificationsRouter = require("./notifications");
const shortsRouter = require("./shorts");
const adminRouter = require("./admin");
const chatRouter = require("./chat");
const messageRouter = require("./message");
const uploadRouter = require("./upload");
const commentRouter = require("./comment");
const interactionRouter = require("./interaction");
const relationshipsRouter = require("./relationships");
const watchedRouter = require("./watched");
// use the express router
function Route(app) {
  app.use("/auth", authRouter);

  app.use("/post", postsRouter);

  app.use("/interaction", interactionRouter);

  app.use("/relationships", relationshipsRouter);

  app.use("/shorts", shortsRouter);

  app.use("/comment", commentRouter);

  app.use("/user", userRouter);

  app.use("/admin", adminRouter);

  app.use("/chat", chatRouter);

  app.use("/watched", watchedRouter);

  app.use("/message", messageRouter);

  app.use("/upload", uploadRouter);

  app.use("/notifications", notificationsRouter);

  app.use("/", siteRouter);
}

module.exports = Route;
