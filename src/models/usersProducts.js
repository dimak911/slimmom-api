const DiaryUserProduct = require("../models/schemas/diaryUserProduct");

const getUserProductsByDate = async (userId, date) => {
  const userProductsByDate = await DiaryUserProduct.find({
    owner: userId,
    date,
  }).catch(() => null);

  return userProductsByDate;
};

module.exports = {
  getUserProductsByDate,
};
