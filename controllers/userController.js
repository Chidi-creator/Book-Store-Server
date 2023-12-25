const User = require("../models/userModel");
const jwt = require("jsonwebtoken");






//signup user
exports.signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);

    //create token
    const token = jwt.sign({ _id:user.user._id }, process.env.SECRET, { expiresIn: "3d" });
    

    res.status(200).json({ username, email, role: user.role, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login user

exports.loginuser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.login(username, email, password);

    const token = jwt.sign({ _id:user.user._id }, process.env.SECRET, { expiresIn: "3d" });
    

    res.status(200).json({
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//getall users
exports.getUsers = async (req, res) => {

  try {
    const users = await User.find({role: "user"});

    res.status(200).json(users);
  } catch (error) {
    res.json(400).json(error.messages);
  }
};
