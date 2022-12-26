const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "Anonim",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    callorie: {
      type: String,
    },
    data: {
      type: Object,
      default: {
        age: "",
        bloodType: "",
        currentWeight: "",
        desiredWeight: "",
        height: "",
      },
    },
    notRecommendedProduct: {
      type: Array,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) next();

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

const User = model("user", userSchema);

module.exports = User;
