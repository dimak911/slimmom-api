const User = require("../models/schemas/authModel");
const jwt = require("jsonwebtoken");

const validationToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || " ";
  const [bearer, token] = authHeader.split(" ");
  console.log("11111111111       ", token);

  if (bearer === "Bearer" && token) {
    try {
      const { id, exp } = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(id);
      console.log("---------       ", user.token);
      console.log("---------       ", token);
      if (!user || !user.token) {
        console.log("!user || !user.token");
        throw new Error();
      }

      if (token !== user.token) {
        console.log("token !== user.token");

        throw new Error({
          status: 401,
          message: "bad token",
        });
      }

      if (Date.now() > exp * 1000) {
        console.log("Date.now() > exp * 1000");

        throw new Error({
          status: 401,
          message: "expired token",
        });
        // go to login
      }

      req.user = user;
      console.log("User is OK");

      next();
    } catch (error) {
      // // ???? sugnature
      // if (error.message === "Invalid signature") {
      //   error.status = 401;
      //   next(error);
      // }
      if (error.status === 401) {
        console.log("error.status === 401");

        next(error);
      }
      console.log("fucking 401");
      console.log(error);

      error.message = "Not authorized";

      error.status = 401;
      next(error);
    }
  }
};

module.exports = validationToken;
