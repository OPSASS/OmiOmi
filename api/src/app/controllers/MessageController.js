const { Chat } = require("../models/Chat");
const { Message } = require("../models/Message");
const { Interaction } = require("../models/Interaction");

class MessageController {
  createMessage = async (req, res, next) => {
    try {
      const message = new Message(req.body);
      await message.save();
      const newInteraction = new Interaction({
        targetId: message._id,
        type: "MESSAGE",
        emotions: [],
        recalls: [],
        deletes: [],
      });
      await newInteraction.save();
      const newMessage = await Message.findByIdAndUpdate(message._id, {
        interactionId: newInteraction._id,
      }).populate([{ path: "chatData", select: "membersId" }]);
      res.json(newMessage);
    } catch (error) {
      next(error);
    }
  };

  updateMessage = async (req, res, next) => {
    try {
      const hidded = await Message.findByIdAndUpdate(req.params.id, req.body);
      res.json(hidded);
    } catch (error) {
      next(error);
    }
  };

  findMessage = async (req, res, next) => {
    const filterQuery = req.body.filterQuery ? req.body.filterQuery : {};
    const options = req.body.options ? req.body.options : {};
    let query = { ...filterQuery };
    if (filterQuery.search) {
      query.$text = { $search: filterQuery.search };
      delete query.search;
    }
    await Message.find(query, null, options)
      .populate([{ path: "interactionData" }])
      .then((result) => {
        if (!result) {
          res.send("404");
        } else {
          res.send(result);
        }
      })
      .catch(next);
  };

  getDetail = async (req, res, next) => {
    try {
      const result = await Message.findById(req.params.id).populate([
        { path: "interactionData" },
      ]);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new MessageController();
