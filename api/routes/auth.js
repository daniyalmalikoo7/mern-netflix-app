const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  const password = req.body?.password;
  const encrptedPassword = CryptoJS.AES.encrypt(
    password,
    process.env.SECRET_KEY
  ).toString();

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: encrptedPassword,
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

//login
router.post("/login", async (req, res) => {
  console.log("loginservice");
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    !user && res.status(401).json("Wrong password or username");

    //password decrpyt
    const bytes = CryptoJS.AES.decrypt(user?.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password or username");

    //takes an object containing id's and admin property so we dont have to send these properties through params making it secure
    // takes a secret key
    //and it takes an object with expiresIn key to define the expiry date for the token
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;
    res.status(201).json({ ...info, accessToken });
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = router;
