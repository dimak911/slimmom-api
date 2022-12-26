const User = require("../models/schemas/authModel");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const secret = process.env.SECRET_KEY_REFRESH;

const validationRefresh = async (req, res, next) => {
  try {
    const { rtoken } = req.cookies;
    // console.log("rtoken", rtoken);
    const { id, exp } = jwt.verify(rtoken, secret);
    const user = await User.findById(id);

    if (!rtoken || !user || Date.now() > exp * 1000) {
      throw new Error({ status: 400, message: "Auth error, go login/signup " });
      // go to login
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validationRefresh;
