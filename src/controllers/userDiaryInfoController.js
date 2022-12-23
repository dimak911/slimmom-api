const {
  getUserDiaryInfo,
  postUserDiaryInfo,
} = require("../models/diaryInfoModels");

const postUserDiaryInfoController = async (req, res, next) => {
  const { id, callorie, notRecommendedProduct } = req.user;
  // const { callorie, notRecommendedProduct } = req.body;

  if (!id) {
    return res.status(400).json({ message: "No data" });
  }
  console.log(id);
  await postUserDiaryInfo(id, callorie, notRecommendedProduct);
  res.status(200).json({ message: "Succes" });
};

const getUserDiaryInfoController = async (req, res, next) => {
  const { id } = req.user;

  if (!id) {
    return res.status(400).json({ message: "No data" });
  }
  const { callorie, notRecommendedProduct } = await getUserDiaryInfo(id);
  if (!callorie) {
    return res.status(400).json({ message: "No user" });
  }

  res.status(200).json({ callorie, notRecommendedProduct });
};

module.exports = {
  postUserDiaryInfoController,
  getUserDiaryInfoController,
};
