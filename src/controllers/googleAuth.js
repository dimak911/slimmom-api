const User = require("../models/schemas/authModel");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { SECRET_KEY, REDIRECT_URL } = process.env;

const googleAuth = async (req, res) => {
  const { user } = req;
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "20m",
  });

  await User.findByIdAndUpdate(user._id, {
    token,
  });
  const userToSend = {
    name: user.name,
  };
  res.redirect(
    `${REDIRECT_URL}?token=${token}&user=${JSON.stringify(userToSend)}`
  );
};

module.exports = googleAuth;
