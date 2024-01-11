const { Posts } = require("../models/Posts");
const { User } = require("../models/User");
class SiteController {
  index = (req, res) => {
    res.render("home");
  };

  searchKey = async (req, res, next) => {
    const key = req.params.key;

    const data = await User.find({
      $or: [
        { fullname: { $regex: `${key}`, $options: "i" } },
        { nickname: { $regex: `${key}`, $options: "i" } },
      ],
    }).sort({
      createdAt: -1,
    });
    try {
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  // search
  // GET /search/:key
  searchOptions = async (req, res, next) => {
    const key = req.params.key;
    const type = req.body.type;
    const filterQuery = req.body.filterQuery ? req.body.filterQuery : {};
    const options = req.body.options ? req.body.options : {};
    let result = null;
    let query = { ...filterQuery };
    switch (type) {
      case "user":
        query.$or = [
          { fullname: { $regex: `${key}`, $options: "i" } },
          { nickname: { $regex: `${key}`, $options: "i" } },
        ];
        result = await User.find(query, null, options).sort({ createdAt: -1 });
        break;

      case "post":
        query.$or = [{ desc: { $regex: `${key}`, $options: "i" } }];
        result = await Posts.find(query, null, options).sort({ createdAt: -1 });
        break;

      default:
        query.$or = [
          { fullname: { $regex: `${key}`, $options: "i" } },
          { nickname: { $regex: `${key}`, $options: "i" } },
        ];
        const users = await User.find(query, null, options).sort({
          createdAt: -1,
        });

        let query2 = { ...filterQuery };
        query2.$or = [{ desc: { $regex: `${key}`, $options: "i" } }];
        const posts = await Posts.find(query2, null, options).sort({
          createdAt: -1,
        });

        result = { users, posts };
    }

    try {
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new SiteController();
