const { getProductsByTitle } = require("../models/products");

const getProductsController = async (req, res, next) => {
  const { productTitle = "", limit = 20, lang = "ua" } = req.query;
  const products = await getProductsByTitle(productTitle, lang, limit);

  res.status(200).json(products);
};

module.exports = {
  getProductsController,
};
