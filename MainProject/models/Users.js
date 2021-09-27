const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter the email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "Password must of min 6 characters"],
  },
});

//Hashing password before saving it to db
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

// static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('Incorrect email');
};

const User = mongoose.model("user", userSchema);

module.exports = User;
