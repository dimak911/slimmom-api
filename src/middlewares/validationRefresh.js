const User = require("../models/schemas/authModel");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const secret = process.env.SECRET_KEY_REFRESH;

const validationRefresh = async (req, res, next) => {
  try {
    const { rtoken } = req.cookies;
    const { id, exp } = jwt.verify(rtoken, secret);
    const user = await User.findById(id);

    if (!rtoken || !user || Date.now() > exp * 1000) {
      throw new Error({ status: 400, message: "Auth error, go login/signup " });
    }

    if (rtoken === user.tokenR) {
      req.user = user;
      next();
    } else {
      throw new Error({ status: 400, message: "Auth error, go login/signup " });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = validationRefresh;
