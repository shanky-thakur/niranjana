const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const { body, validationResult } = require("express-validator");

router.post(
  "/uploadBook",
  [
    body("title", "enter title").isString(),
    body("link", "provide valid link").isString(),
    body("author", "provide author").isString(),
    body("description", "provide description").isString(),
    body("imgLink", "provide cover link").isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let book = await Book.findOne({ title: req.body.title });
      if (book) {
        return res.status(400).json({ errors: "title already exists" });
      }
      book = await Book.create({
        title: req.body.title,
        link: req.body.link,
        author: req.body.author,
        description: req.body.description,
        imgLink: req.body.imgLink,
      });
      res.json("created book successfully");
    } catch (error) {
      res.status(500).send("an internal error ocurred");
    }
  }
);

router.get("/showBooks", async (req, res) => {
  try {
    const book = await Book.find({});
    res.send(book);
  } catch (error) {
    res.status(500).send("an internal error ocurred");
  }
});

router.post("/searchBook", async (req, res) => {
  const title = req.body.title;
  try {
    let book = await Book.findOne({ title });
    res.send(book);
  } catch (error) {
    res.status(500).send("an internal error ocurred");
  }
});

router.delete("/deleteBook", async (req, res) => {
  const title = req.body.title;
  try {
    let book = await Book.findOneAndDelete({ title });
    res.status(200).send("deleted");
  } catch (error) {
    res.status(500).send("an internal error ocurred");
  }
});

module.exports = router;
