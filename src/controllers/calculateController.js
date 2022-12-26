const User = require("../models/schemas/authModel");

const calories = async (req, res, next) => {
  const { data = null,
    callorie = null,
    notRecommendedProduct = [], } = req.body;
  const { user } = req;

  const currentUser = await User.findOne({ token: user.token });
  await User.findByIdAndUpdate(user._id, { data, callorie, notRecommendedProduct });
  return res.status(200).json({
    name: currentUser.name,
    email: currentUser.email,
    data,
    callorie,
    notRecommendedProduct,
  });
};

const refreshCalories = async (req, res, next) => {
  const { user } = req;
  if (!user.token) {
    return res.status(400).json({ message: "No token" });
  }

  const currentUser = await User.findOne({ token: user.token });
  if (!currentUser) {
    return res.status(404).json({ message: "Not found user" });
  }

  return res.status(200).json({
    name: currentUser.name,
    email: currentUser.email,
    data: currentUser.data,
    callorie: currentUser.callorie,
    notRecommendedProduct: currentUser.notRecommendedProduct,
  });
};

module.exports = {
  calories,
  refreshCalories
};
