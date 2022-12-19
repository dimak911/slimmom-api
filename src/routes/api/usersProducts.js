const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  getUserProductsByDateController,
} = require("../../controllers/userProductsController");
const {
  postUserDiaryInfoController,getUserDiaryInfoController
} = require("../../controllers/userDiaryInfoController");
const validationToken = require("../../middlewares/validationToken.js");
const {
  validationBody,
} = require("../../middlewares/validationMiddleware.js");
const { schemaDiaryInfo } = require("../../joiSchema/diaryInfoSchema");

const router = express.Router();

// TODO: добавить проверку авторизации
router.get("/dayinfo",validationToken, asyncWrapper(getUserDiaryInfoController));
router.get("/:date", asyncWrapper(getUserProductsByDateController));
router.post("/dayinfo", validationToken, validationBody(schemaDiaryInfo), asyncWrapper(postUserDiaryInfoController));


module.exports = router;
