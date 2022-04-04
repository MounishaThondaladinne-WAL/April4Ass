var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, maxLength: 20 },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
});
module.exports = mongoose.model("UserRegister", UserSchema);
