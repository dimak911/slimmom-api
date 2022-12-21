const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getDiaryListItem,
} = require("../../controllers/diaryListItemController");
const router = express.Router();

router.delete("/:userid", asyncWrapper(getDiaryListItem));

module.exports = router;
