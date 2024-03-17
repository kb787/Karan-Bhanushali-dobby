const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  userPassword: {
    type: String,
  },
});

let authModel;
if (mongoose.models.auths) {
  return mongoose.model("auths");
}

authModel = mongoose.model("auths", authSchema);
module.exports = authModel;
