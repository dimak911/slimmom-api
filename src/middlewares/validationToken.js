const User = require("../models/schemas/authModel");
const jwt = require("jsonwebtoken");

const validationToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || " ";
  const [bearer, token] = authHeader.split(" ");

  if (bearer === "Bearer" && token) {
    try {
      const { id } = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw new Error();
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.message === "Invalid signature") {
        error.status = 401;
      }
      error.message = "Not authorized";
      error.status = 401;
      next(error);
    }
  }
};

module.exports = validationToken;
