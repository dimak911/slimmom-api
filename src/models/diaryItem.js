const Item = require("./schemas/diaryUserProduct");

const getItemByID = async (id) => {
  const item = await Item.findByIdAndDelete(id).catch(() => null);
  return item;
};

module.exports = {
  getItemByID,
};
