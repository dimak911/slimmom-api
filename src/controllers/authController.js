require("dotenv").config();

const User = require("../models/schemas/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { customError } = require("../helpers/errors");

const generateTokens = (payload) => {
  const tokenR = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {
    expiresIn: "30d",
  });
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "30s",
  });
  return { token, tokenR };
};

const signup = async (req, res, next) => {
  const {
    name,
    email,
    password,
    data,
    callorie = null,
    notRecommendedProduct = [],
  } = req.body;
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    throw customError({ status: 409, message: "Email in use" });
  }

  try {
    const user = new User({
      name,
      email,
      password,
      data,
      callorie,
      notRecommendedProduct,
    });
    await user.save();

    const payload = {
      id: user.id,
    };
    const { token, tokenR } = generateTokens(payload);

    await User.findByIdAndUpdate(user.id, { token, tokenR });

    res.cookie("rtoken", tokenR, {
      httpOnly: true,
    });

    return res.status(201).json({
      token,
      tokenR,
      user: {
        name,
        email,
        userId: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

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

  const { token, tokenR } = generateTokens(payload);

  await User.findByIdAndUpdate(user.id, { token, tokenR });
  res.cookie("rtoken", tokenR, {
    httpOnly: true,
  });
  res.status(200).json({
    token,
    user: {
      email: user.email, name: user.name, data: user.data,
      callorie: user.callorie,
      notRecommendedProduct: user.notRecommendedProduct
    },
  });
};

const logout = async (req, res, next) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: null, tokenR: null });
  res.clearCookie("rtoken");
  res.status(200).json({ message: "Success" });
};

const currentUser = async (req, res, next) => {
  const { user } = req;
  const currentUser = await User.findOne({ token: user.token });

  return res.status(200).json({
    user: {
      name: currentUser.name,
      email: currentUser.email,
    },
  });
};

const refreshToken = async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  try {
    const payload = {
      id: user.id,
    };

    const { token, tokenR } = generateTokens(payload);

    const result = await User.findByIdAndUpdate(
      user.id,
      { token, tokenR },
      {
        new: true,
      }
    );

    res.cookie("rtoken", tokenR, {
      httpOnly: true,
    });

    return res.status(201).json({
      message: "Successfully refreshed",
      result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  signup,
  currentUser,
  refreshToken,
};
