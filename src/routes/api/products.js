const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getProductsController,
} = require("../../controllers/productsController");

const router = express.Router();

router.get("/", asyncWrapper(getProductsController));

module.exports = router;
