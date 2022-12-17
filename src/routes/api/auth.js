const express = require("express");
const router = express.Router();

const { signup } = require("../../controllers/authController");

const { validationBody } = require("../../middlewares/validationMiddleware.js");
const { registrationUserSchema } = require("../../joiSchema/registrationSchema");
const { asyncWrapper } = require("../../helpers/apiHelpers.js");

router.post("/signup", validationBody(registrationUserSchema), asyncWrapper(signup));

module.exports = router;