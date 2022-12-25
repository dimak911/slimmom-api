const User = require("../models/schemas/authModel");

const getUserDiaryInfo = async (_id) => {
  const userProductsByDate = await User.findOne({ _id }).catch(() => null);
  return userProductsByDate;
};

const postUserDiaryInfo = async (_id, callorie, notRecommendedProduct) => {
  const userProductsByDate = await User.findByIdAndUpdate(_id, {
    notRecommendedProduct,
    callorie,
  })
    .catch(() => null)
    .catch(() => null);
  return userProductsByDate;
};

module.exports = {
  getUserDiaryInfo,
  postUserDiaryInfo,
};
