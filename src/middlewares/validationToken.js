const User = require("../models/schemas/authModel");
const jwt = require("jsonwebtoken");

const validationToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || " ";
  const [bearer, token] = authHeader.split(" ");

  if (bearer === "Bearer" && token) {
    try {
      const { id, exp } = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(id);

      if (!user || !user.token) {
        throw new Error();
      }

      if (token !== user.token) {
        throw new Error({
          status: 401,
          message: "bad token",
        });
      }

      if (Date.now() > exp * 1000) {
        throw new Error({
          status: 401,
          message: "expired token",
        });
      }

      req.user = user;

      next();
    } catch (error) {
      if (error.status === 401) {
        next(error);
      }

      error.message = "Not authorized";
      error.status = 401;
      next(error);
    }
  }
};

module.exports = validationToken;
