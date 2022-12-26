const DiaryUserProduct = require("../models/schemas/diaryUserProduct");

const getUserProductsByDate = async (userId, date) => {
  const userProductsByDate = await DiaryUserProduct.find({
    owner: userId,
    date,
  });
  return userProductsByDate;
};

const createUserProduct = async (
  userId,
  { productName, productWeight, productCalories, date }
) => {
  const userProductsByDate = await DiaryUserProduct.create({
    owner: userId,
    date,
    productName,
    productWeight,
    productCalories,
  }).catch(() => null);

  return userProductsByDate;
};

const deleteItemByID = async (id) => {
  const item = await DiaryUserProduct.findByIdAndDelete(id).catch(() => null);

  return item;
};

module.exports = {
  getUserProductsByDate,
  createUserProduct,
  deleteItemByID,
};
