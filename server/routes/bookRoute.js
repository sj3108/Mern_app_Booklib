const express = require("express");
const {
  createBook,
  getAllBooks,
  deleteBook,
  searchcontroller,
} = require("../controller/bookC");
const router = express.Router();

router.post("/add", createBook);
router.get("/get", getAllBooks);
router.delete("/delete/:id", deleteBook);
router.get("/search", searchcontroller);

module.exports = router;
