const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  addBook: {},
  addAuthor: {},
  addUSer: {},
  editUser: {},
  role: ROLE.ADMIN
});

module.exports = mongoose.model("Role", adminSchema);
