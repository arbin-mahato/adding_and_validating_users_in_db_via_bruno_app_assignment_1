const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  try {
    // const saltRound = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt());
    console.log("Hashed Password:", this.password);
    // this.password = hash_password;
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
