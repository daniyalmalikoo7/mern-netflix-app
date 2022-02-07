const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verifyToken = require("../verifyToken");
const { findByIdAndDelete, findById } = require("../models/User");

//update user

router.put("/:id", verifyToken, async (req, res) => {
  console.log(req.user);
  if (req.params.id === req.user.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        JSON.stringify(req.body.password),
        process.env.SECRET_KEY
      ).toString();

      // const bytes = CryptoJS.AES.decrypt(
      //   user.password,
      //   process.env.SECRET_KEY
      // );
      // const decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      // console.log(decryptedPassword);
    }
    //if you dont add new it won't return the updated user
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
});

//delete user
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.params.id === req.user.id || req.user.isAdmin) {
    try {
      await findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can only delete your account.");
  }
});

//get one user
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});
//get all users
router.get("/", verifyToken, async (req, res) => {
  const query = req.query?.new;
  if (req.user.isAdmin) {
    try {
      //limit method is going to fetch only last 10 users
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(10)
        : await User.find();
      //   const { password, ...info } = users;
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not authenticated.");
  }
});

//get user stats
router.get("/stats", verifyToken, async (req, res) => {
  const today = new Date();
  console.log(today);
  const lastYear = today.setFullYear(today.getFullYear() - 1);
  const formattedLastYear = new Date(lastYear);
  console.log("lastyear", formattedLastYear);

  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (req.user.isAdmin) {
    try {
      //match defines the limit of the document objects required to be passed to the next stage
      //project Passes along the documents with the requested fields to the next stage in the pipeline
      //group will group our documents
      const stats = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(stats);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(403).json("You are not authenticated.");
  }
});

module.exports = router;
