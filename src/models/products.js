const Product = require("./schemas/products");

const getProductsByTitle = async (productTitle, lang, limit) => {
  let query = {};

  if (productTitle.length) {
    const regex = new RegExp(productTitle, "i");
    query = { "title.ua": regex };
    if (lang === "ru") {
      query = { "title.ru": regex };
    }
  }

  const products = await Product.find(query)
    .limit(limit)
    .catch(() => null);

  return products;
};

module.exports = {
  getProductsByTitle,
};
