const mongoose = require('mongoose');


const roleSchema = new mongoose.Schema({
 email: {
  type: String,
  required: true,
  trim: true
 },
 password: {
  type: String,
  required: true
 },
 role: {
  type: String,
  default: 'basic',
  enum: ["user", "visitor", "admin"]
 },
 accessToken: {
  type: String
 }
});

module.exports= mongoose.model('Role', roleSchema);

