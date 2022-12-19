const {
  Schema,
  model,
  // SchemaTypes
} = require("mongoose");

const diaryUserProductSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Set product name"],
  },
  productWeight: {
    type: String,
    required: [true, "Set product weight"],
  },
  productCalories: {
    type: String,
    required: [true, "Set product calories"],
  },
  owner: {
    // TODO: разкоментить когда будет коллекция юзеров
    // type: SchemaTypes.ObjectId,
    // ref: "user",
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
});

const DiaryUserProduct = model("diary-user-product", diaryUserProductSchema);

module.exports = DiaryUserProduct;
