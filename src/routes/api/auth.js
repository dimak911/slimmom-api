const express = require("express");
const router = express.Router();

const {
  login,
  logout,
  signup,
  currentUser,
  refreshToken,
} = require("../../controllers/authController");

const { validationBody } = require("../../middlewares/validationMiddleware.js");
const { schemaAuth } = require("../../joiSchema/authSchema");
const {
  registrationUserSchema,
} = require("../../joiSchema/registrationSchema");
const { asyncWrapper } = require("../../helpers/apiHelpers.js");
const validationToken = require("../../middlewares/validationToken.js");
const validationRefresh = require("../../middlewares/validationRefresh");

router.post(
  "/signup",
  validationBody(registrationUserSchema),
  asyncWrapper(signup)
);
router.post("/login", validationBody(schemaAuth), asyncWrapper(login));
router.post("/logout", validationToken, asyncWrapper(logout));
router.get("/current", validationToken, asyncWrapper(currentUser));
// refresh token  asyncWrapper(currentUser)
router.post(
  "/refreshToken",
  function (req, res, next) {
    console.log("Cookies: ", req.cookies);
    next();
  },
  validationRefresh,
  asyncWrapper(refreshToken)
);

module.exports = router;
