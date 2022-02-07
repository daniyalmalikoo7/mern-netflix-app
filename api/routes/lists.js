const router = require("express").Router();
const List = require("../models/List");
const verifyToken = require("../verifyToken");

//CREATE

router.post("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(403).json("You are not allowed to add movies ");
  }
});

//Delete
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("List has been deleted");
    } catch (error) {
      res.status(500).json(error.message);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});

//Get random lists
router.get("/", verifyToken, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let lists = [];

  try {
    if (typeQuery) {
      if (genreQuery) {
        lists = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        lists = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      lists = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
