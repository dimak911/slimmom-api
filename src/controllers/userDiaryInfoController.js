const User = require("../models/schemas/authModel");

const postUserDiaryInfoController = async (req, res, next) => {
  const { id } = req.user;
  const { callorie, notRecommendedProduct } = req.body;
  
  if (!id) {
    return res.status(400).json({ message: "No data" });
  }
  await User.findByIdAndUpdate(id, { callorie, notRecommendedProduct });
  res.status(200).json({message: "Succes"});
};

const getUserDiaryInfoController = async (req, res, next) => {
  const { id } = req.user;
  console.log(id)
  if (!id) {
    return res.status(400).json({ message: "No data" });
  }
  const {callorie,notRecommendedProduct} = await User.findOne({_id: id});
  if (!callorie) { 
    return res.status(400).json({ message: "No user" });
  }
  
  res.status(200).json({callorie,notRecommendedProduct});
};

module.exports = {
  postUserDiaryInfoController,
  getUserDiaryInfoController,
};
