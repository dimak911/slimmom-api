const { getUserProductsByDate } = require("../models/usersProducts");

const getUserProductsByDateController = async (req, res, next) => {
  const date = req.params.date;
  const userId = "1"; // TODO: заменить на user_id из реквеста
  const usersProducts = await getUserProductsByDate(userId, date);

  if (!usersProducts.length) {
    return res.status(400).json({ message: "No data" });
  }

  res.status(200).json(usersProducts);
};

module.exports = {
  getUserProductsByDateController,
};
