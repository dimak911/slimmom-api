const passport = require("passport");
const googleStrategy = require("./strategy/google");

passport.use("google", googleStrategy);

module.exports = {
  passport,
};
