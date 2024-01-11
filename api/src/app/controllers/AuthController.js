const { User } = require("../models/User");
const { Relationships } = require("../models/Relationships");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class SiteController {
  // POST /auth/register
  registerProcess = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    try {
      // kiem tra user
      const oldUser = await User.findOne({
        username: req.body.username,
        email: req.body.email,
      });
      if (oldUser)
        return res.status(404).json({ message: "Tài khoản đã tồn tại!" });
      // tao user
      const newUser = new User(req.body);
      await newUser.save();

      const newRelationships = new Relationships({
        userId: newUser._id,
      });

      const userDetail = await User.findByIdAndUpdate(newUser._id, {
        relationshipsId: newRelationships._id,
      });

      await newRelationships.save();

      //tao token
      const token = jwt.sign(
        { username: userDetail.username, id: userDetail._id },
        process.env.JWTKEY,
        // set thoi gian token
        { expiresIn: "1h" }
      );
      res.send(userDetail);
      res.json({ message: "Đăng ký thành công! Vui lòng đăng nhập!" });
    } catch (error) {
      next(error);
    }
  };

  loginProcess = async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });

      if (user) {
        const validity = await bcrypt.compare(req.body.password, user.password);

        if (!validity) {
          res.status(404).json({ message: "Mật khẩu không đúng!" });
        } else {
          const token = jwt.sign(
            { username: user.username, id: user._id },
            process.env.JWTKEY,
            { expiresIn: "1h" }
          );
          res.json({ user, token });
        }
      } else {
        res.status(404).send({ message: "Tài khoản không tồn tại!" });
      }
    } catch (error) {
      next(error);
    }
  };

  searchAcc = async (req, res, next) => {
    try {
      const user = await User.find(req.body);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send({ message: "Tài khoản không tồn tại" });
      }
    } catch (error) {
      next(error);
    }
  };

  // POST /auth/reset
  resetProcess = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: "Đổi mật khẩu thành công!" });
      } else {
        res.status(404).send({ message: "Tài khoản không tồn tại" });
      }
    } catch (error) {
      next(error);
    }
  };

  // POST /auth/:id/reset
  changePassword = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(req.body.newPassword, salt);

        const match = await bcrypt.compare(req.body.password, user.password);

        if (match) {
          user.password = newPassword;
          await user.save();
          res.json({ message: "Đổi mật khẩu thành công!" });
        } else {
          res.status(500).json({ message: "Mật khẩu cũ không đúng!" });
        }
      } else {
        res.status(404).send({ message: "Tài khoản không tồn tại" });
      }
    } catch (error) {
      next(error);
    }
  };

  //
  ////////////////////// POST /auth/reset/:token
  resetToken = async (req, res, next) => {
    //Hash URL Token
    // const resetPasswordToken = crypto
    //   .createHash("sha256")
    //   .update(req.params.token)
    //   .digest("hex");

    const user = await User.findOne({
      // resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        new ErrorHandler(
          "Password reset token is invalid or has been expired.",
          400
        )
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not match", 400));
    }
    //Setup new password
    user.password = req.body.password;

    // user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
  };
}

module.exports = new SiteController();
