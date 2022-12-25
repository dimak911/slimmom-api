const {
  getUserDiaryInfo,
  postUserDiaryInfo,
} = require("../models/diaryInfoModels");

const getUserDiaryInfoController = async (req, res, next) => {
  const { _id } = req.user;

  const userInfo = await getUserDiaryInfo(_id);

  if (!userInfo) return res.status(400).json({ message: "No user" });

  const { callorie, notRecommendedProduct } = userInfo;

  res.status(200).json({ callorie, notRecommendedProduct });
};

const postUserDiaryInfoController = async (req, res, next) => {
  const { _id } = req.user;

  const { callorie, notRecommendedProduct } = req.body;

  const user = await postUserDiaryInfo(_id, callorie, notRecommendedProduct);

  if (!user) {
    res.status(404).json("No user");
  }

  res.status(200).json({ callorie, notRecommendedProduct });
};

module.exports = {
  postUserDiaryInfoController,
  getUserDiaryInfoController,
};
