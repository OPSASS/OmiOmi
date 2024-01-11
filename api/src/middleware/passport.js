const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook");
const GoogleStrategy = require("passport-google-oauth20");
const { User } = require("../app/models/User");
const bcrypt = require("bcrypt");
const config = require("../config/config");

module.exports = (passport) => {
  const salt = bcrypt.genSalt(10);
  // Local Strategy
  passport.use(
    "user",
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (error, user) => {
        if (error) throw error;
        if (!user)
          return done(null, false, { message: "Người dùng không tồn tại" });
        salt.compare(password, user.password, (error, result) => {
          if (error) throw error;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Mật khẩu không đúng" });
          }
        });
      });
    })
  );
  passport.use(
    "admin",
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username, isAdmin: true }, (error, user) => {
        if (error) throw error;
        if (!user)
          return done(null, false, { message: "Người dùng không tồn tại" });
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) throw error;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Mật khẩu không đúng" });
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });

  // Facebook Strategy
  passport.use(
    new FacebookStrategy(
      {
        clientID: config.facebookAuth.clientID,
        clientSecret: config.facebookAuth.clientSecret,
        callbackURL: config.facebookAuth.callbackURL,
      },
      function (accessToken, refreshToken, profile, cb) {
        User.findOne({ facebookId: profile.id }, (error, user) => {
          if (error) {
            return cb(error);
          }
          if (!user) {
            user = new User({
              name: profile.displayName,
              email: profile.id + "ex@gmail.com",
              password: profile.id,
              cpassword: profile.id,
              facebookId: profile.id,
            });
            user.save(function (error) {
              if (error) {
                throw error;
              }
              return cb(null, user);
            });
          } else {
            return cb(null, user);
          }
          console.log(profile);
        });
      }
    )
  );

  // Twitter Strategy
  // passport.use(new TwitterStrategy({
  //     consumerKey: config.twitterAuth.consumerKey,
  //     consumerSecret: config.twitterAuth.consumerSecret,
  //     callbackURL: config.twitterAuth.callbackURL
  // },
  // function(token, tokenSecret, profile, cb) {
  //     User.findOne({ twitterId: profile.id }, function(error, user) {
  //         if (error) { return cb(error); }
  //         if (!user) {
  //             user = new User({
  //                 username: profile.displayName,
  //                 twitterId: profile.id
  //             });
  //             user.save(function(error) {
  //                 if (error) { throw error; }
  //                 return cb(null, user);
  //             });
  //         } else {
  //             return cb(null, user);
  //         }
  //         console.log(profile);
  //     });
  // }));

  // Google Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
        callbackURL: config.googleAuth.callbackURL,
      },
      (token, tokenSecret, profile, cb) => {
        User.findOne({ googleId: profile.id }, function (error, user) {
          if (error) {
            return cb(error);
          }
          if (!user) {
            user = new User({
              username: profile.displayName,
              email: profile.emails[0].value,
              password: profile.id,
              cpassword: profile.id,
              profilePicture: profile.photos[0].value,
              googleId: profile.id,
            });
            user.save(function (error) {
              if (error) {
                throw error;
              }
              return cb(null, user);
            });
          } else {
            return cb(null, user);
          }
          console.log(profile);
        });
      }
    )
  );
};
