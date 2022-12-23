const { deleteItemByID } = require("../models/usersProducts");
const jwt = require("jsonwebtoken");

const {
  getUserProductsByDate,
  createUserProduct,
} = require("../models/usersProducts");

const getUserProductsByDateController = async (req, res, next) => {
  const date = req.params.date;

  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.decode(token);
  const userId = decode.id;

  // const userId = "1"; // TODO: заменить на user_id из реквеста
  const usersProducts = await getUserProductsByDate(userId, date);

  if (!usersProducts.length) {
    return res.status(400).json({ message: "No data" });
  }

  res.status(200).json(usersProducts);
};

const createUserProductController = async (req, res) => {
  const date = req.params.date;
  // const userId = "1"; // TODO: заменить на user_id из реквеста
  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.decode(token);
  const userId = decode.id;

  const createdUserProduct = await createUserProduct(userId, date, req.body);

  if (!createdUserProduct) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(201).json(createdUserProduct);
};

const deleteDiaryListItem = async (req, res, next) => {
  const id = req.params.userid;
  const item = await deleteItemByID(id);

  if (!item) {
    return res.status(404).json({ message: `id ${id} not found` });
  }

  res.status(200).json({ message: "User successfully deleted" });
};

module.exports = {
  getUserProductsByDateController,
  createUserProductController,
  deleteDiaryListItem,
};
