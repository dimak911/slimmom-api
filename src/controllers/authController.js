const User = require("../models/schemas/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { customError } = require("../helpers/errors");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw customError({ status: 401, message: "Email or password is wrong" });
  }

  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    throw customError({ status: 401, message: "Email or password is wrong" });
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY);

  await User.findByIdAndUpdate(user.id, { token });
  res.status(200).json({
    token,
    user: { email: user.email },
  });
};

const logout = async (req, res, next) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });
  res.status(204).json();
};

module.exports = {
  login,
  logout,
};
