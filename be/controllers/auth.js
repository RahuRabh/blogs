const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//User Model
const User = require("../models/user");

const registerUser = async (req, res) => {
  try {
    //receiving data from FE
    const { name, email, password } = req.body;

    //Checks if user exits or not
    const isExistingUser = await User.findOne({ email: email });

    if (isExistingUser) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    }

    //hashing password
    const hashPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      name: name,
      email: email,
      password: hashPassword,
    });

    await userData.save();
    res
      .status(201)
      .json({ status: "success", message: "Registered Successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    //fetching data from FE
    const { email, password } = req.body;

    //checking email in DB
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid Email" });
    }

    //bcrypting password with DB password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      token: token,
      userId: user.id,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser };
