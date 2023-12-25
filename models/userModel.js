const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
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
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.signup = async function (username, email, password) {
  //validation
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Invalid Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("This email has already been used");
  }

  const usernameExists = await this.findOne({ username });

  if (usernameExists) {
    throw Error("This username has been taken");
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    email,
    password: hash,
    role: "user",
  });

  return {
    user,
    role: user.role
};
};


//login function
UserSchema.statics.login = async function (username, email, password) {
  //validation
  if ((!username && !email) ||!password) {
    throw Error("Provide username or email");
  }
  const user = await this.findOne({ $or: [{ username }, { email }] });

  if(!user){
    throw Error('wrong username or email')
}

const match = await bcrypt.compare(password, user.password)

if(!match){
    throw Error('Check password')
}

return {
    user,
    username: user.username,
    email: user.email,
    role: user.role
}

};



module.exports = mongoose.model("User", UserSchema);
