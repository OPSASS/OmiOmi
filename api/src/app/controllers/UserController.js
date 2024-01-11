const { User } = require("../models/User");

const bcrypt = require("bcrypt");

class UserController {
  getUserDetail = async (req, res, next) => {
    const id = req.params.id;
    try {
      const user = await User.findById(id).populate([
        { path: "relationshipsData" },
      ]);

      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  getUserByNickname = async (req, res, next) => {
    const nickname = req.params.nickname;
    try {
      const user = await User.find(nickname).populate([
        { path: "relationshipsData" },
      ]);
      if (user) {
        res.json(user);
      } else {
        res.json({ message: "Không có tài khoản này" });
      }
    } catch (error) {
      next(error);
    }
  };

  findUser = async (req, res, next) => {
    const filterQuery = req.body.filterQuery ? req.body.filterQuery : {};
    const options = req.body.options ? req.body.options : {};
    let query = { ...filterQuery };
    if (filterQuery.search) {
      query.$text = { $search: filterQuery.search };
      delete query.search;
    }
    await User.find(query, null, options)
      .populate([{ path: "relationshipsData" }])
      .then((result) => {
        if (!result) {
          res.send("404");
        } else {
          res.send(result);
        }
      })
      .catch(next);
  };

  updateUser = async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      res.json({ message: "Đã cập nhật thông tin tài khoản!", user });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const validity = await bcrypt.compare(req.body.password);
      if (!validity) {
        res.json({ message: "Mật khẩu không đúng!" });
      } else {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Xóa tài khoản thành công!" });
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserController();
