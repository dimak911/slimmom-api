const bcrypt = require("bcryptjs");
const { v4: uuid } = require("uuid");
const { Strategy } = require("passport-google-oauth2");
const User = require("../../models/schemas/authModel");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
  passReqToCallback: true,
};

const googleCallback = async (req, token, profile, done) => {
  try {
    const { email, displayName } = profile;
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    }
    const hashPassword = await bcrypt.hash(uuid(), 10);

    const newUser = await User.create({
      name: displayName,
      email,
      password: hashPassword,
    });

    return done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

module.exports = googleStrategy;
