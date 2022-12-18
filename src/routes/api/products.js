const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  validationQuery,
} = require("../../middlewares/validationMiddleware.js");
const { productsSchema } = require("../../joiSchema/productsSchema");

const {
  getProductsController,
} = require("../../controllers/productsController");

const router = express.Router();

router.get(
  "/",
  validationQuery(productsSchema),
  asyncWrapper(getProductsController)
);

module.exports = router;
