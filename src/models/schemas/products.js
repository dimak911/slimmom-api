const {
  Schema,
  model,
  // SchemaTypes
} = require("mongoose");

const productSchema = new Schema({
  categories: {
    type: [String],
    required: [true, "Product categories"],
  },
  title: {
    ru: {
      type: String,
      index: true,
    },
    ua: {
      type: String,
      index: true,
    },
  },
  weight: {
    type: Number,
    required: [true, "Product weight"],
    default: 100,
  },
  calories: {
    type: Number,
    required: [true, "Product calories"],
  },
  groupBloodNotAllowed: {
    type: [Boolean],
    required: [true, "Product groupBloodNotAllowed"],
  },
});

const Product = model("product", productSchema);

module.exports = Product;
