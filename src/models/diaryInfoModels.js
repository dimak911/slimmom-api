const User = require("../models/schemas/authModel");

const getUserDiaryInfo = async (_id) => {
  const userProductsByDate = await User.findOne({ _id }).catch(() => null);
  return userProductsByDate;
};

const postUserDiaryInfo = async (_id, calorie, notRecommendedProduct) => {
  const userProductsByDate = await User.findByIdAndUpdate(_id, {
    notRecommendedProduct,
    calorie,
  }).catch(() => null);
  return userProductsByDate;
};

module.exports = {
  getUserDiaryInfo,
  postUserDiaryInfo,
};
