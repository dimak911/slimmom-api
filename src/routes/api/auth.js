const express = require("express");
const router = express.Router();

const { login, logout } = require("../../controllers/authController");

const { validationBody } = require("../../middlewares/validationMiddleware.js");
const { schemaAuth } = require("../../joiSchema/authSchema");
const { asyncWrapper } = require("../../helpers/apiHelpers.js");
const validationToken = require("../../middlewares/validationToken.js");

router.post("/login", validationBody(schemaAuth), asyncWrapper(login));
router.get("/logout", validationToken, asyncWrapper(logout));

module.exports = router;
