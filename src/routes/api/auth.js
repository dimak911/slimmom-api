const express = require("express");
const router = express.Router();

const { passport } = require("../../middlewares/passport");
const ctrl = require("../../controllers/googleAuth");
const { ctrlWrapper } = require("../../helpers/ctrlWrapper");

const { login, logout, signup } = require("../../controllers/authController");

const { validationBody } = require("../../middlewares/validationMiddleware.js");
const { schemaAuth } = require("../../joiSchema/authSchema");
const {
  registrationUserSchema,
} = require("../../joiSchema/registrationSchema");
const { asyncWrapper } = require("../../helpers/apiHelpers.js");
const validationToken = require("../../middlewares/validationToken.js");

router.post(
  "/signup",
  validationBody(registrationUserSchema),
  asyncWrapper(signup)
);
router.post("/login", validationBody(schemaAuth), asyncWrapper(login));
router.get("/logout", validationToken, asyncWrapper(logout));

// google sign in

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  ctrlWrapper(ctrl.googleAuth)
);

//

module.exports = router;
