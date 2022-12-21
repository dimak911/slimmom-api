const { getItemByID } = require("../models/diaryItem");

const getDiaryListItem = async (req, res, next) => {
  const id = req.params.userid;
  const item = await getItemByID(id);

  if (!item) {
    return res.status(404).json({ message: `id ${id} not found` });
  }

  res.status(204);
};

module.exports = {
  getDiaryListItem,
};
