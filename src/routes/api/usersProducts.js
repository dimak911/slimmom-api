const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  getUserProductsByDateController,
} = require("../../controllers/userProductsController");

const router = express.Router();

// TODO: добавить проверку авторизации
router.get("/:date", asyncWrapper(getUserProductsByDateController));

module.exports = router;
