const { getProductsByTitle } = require("../models/products");

const getProductsController = async (req, res, next) => {
  const { productTitle = "", limit = 20, lang = "ua" } = req.query;
  const products = await getProductsByTitle(productTitle, lang, limit);

  // if (!products.length) {
  //   return res.status(400).json({ message: "No data" });
  // }

  res.status(200).json(products);
};

module.exports = {
  getProductsController,
};
