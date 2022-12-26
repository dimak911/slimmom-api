const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  validationQuery,
} = require("../../middlewares/validationMiddleware.js");
const { productsSchema } = require("../../joiSchema/productsSchema");

const {
  getProductsController,
} = require("../../controllers/productsController");
const validationToken = require("../../middlewares/validationToken");

const router = express.Router();

router.get(
  "/",
  validationToken,
  validationQuery(productsSchema),
  asyncWrapper(getProductsController)
);

module.exports = router;
