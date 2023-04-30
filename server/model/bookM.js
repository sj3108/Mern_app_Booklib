const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  book: {
    type: String,
    required: [true, "Book name is required"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  desc: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
