const express = require("express");
const router = express.Router();

const {
  calories,
  refreshCalories,
} = require("../../controllers/calculateController");

const { validationBody } = require("../../middlewares/validationMiddleware.js");
const { calculateSchema } = require("../../joiSchema/calculateSchema");
const { asyncWrapper } = require("../../helpers/apiHelpers.js");
const validationToken = require("../../middlewares/validationToken.js");


router.post("/calories", validationToken, validationBody(calculateSchema), asyncWrapper(calories));
router.get("/calories", validationToken, asyncWrapper(refreshCalories));

module.exports = router;
