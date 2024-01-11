const { Chat } = require("../models/Chat");

class ChatController {
  createChat = async (req, res, next) => {
    const chat = await Chat.findOne({
      membersId: { $all: [req.params.firstId, req.params.secondId] },
    });
    try {
      if (!chat) {
        const newChat = new Chat(req.body);
        await newChat.save();
        res.json(newChat);
      } else {
        res.json(chat);
      }
    } catch (error) {
      next(error);
    }
  };

  findChat = async (req, res, next) => {
    const filterQuery = req.body.filterQuery ? req.body.filterQuery : {};
    const options = req.body.options ? req.body.options : {};

    let query = { ...filterQuery };
    if (filterQuery.search) {
      query.$text = { $search: filterQuery.search };
      delete query.search;
    }

    await Chat.find(query, null, options)
      .populate([
        {
          path: "userData",
          select: "fullname lastName avtPicture",
        },
        {
          path: "latestData",
          options: { sort: { createdAt: -1 } },
        },
      ])
      .then((result) => {
        if (!result) {
          res.send("404");
        } else {
          res.send(result);
        }
      })
      .catch(next);
  };

  updateChat = async (req, res, next) => {
    try {
      const chat = await Chat.findByIdAndUpdate(req.params.id, req.body);
      res.json(chat);
    } catch (error) {
      next(error);
    }
  };

  removeChat = async (req, res, next) => {
    try {
      const chat = await Chat.findByIdAndDelete(req.params.id);
      res.json(chat);
    } catch (error) {
      next(error);
    }
  };

  getChatDetail = async (req, res, next) => {
    try {
      const chat = await Chat.findById(req.params.id).populate([
        {
          path: "userData",
          select: "fullname avtPicture",
        },
      ]);
      res.json(chat);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ChatController();
