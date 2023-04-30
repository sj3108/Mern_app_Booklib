const Book = require("../model/bookM");
const errorResponse = require("../utlis/errorresponse");

exports.createBook = async (req, res, next) => {
  try {
    const { book, author, desc } = req.body;

    const existingBook = await Book.findOne({ book });
    if (existingBook) {
      return next(new errorResponse("Book is already present", 500));
    }
    const newbook = await Book.create({ book, author, desc });
    res.status(200).json(newbook);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json("Book deleted Successfully");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// exports.searchcontroller = async (req, res, next) => {
//   try {
//     const { key, page, limit } = req.query;
//     const skip = (page - 1) * limit;
//     const search = key
//       ? {
//           $or: [
//             { name: { $regex: key, $options: "i" } },
//             { description: { $regex: key, $options: "i" } },
//           ],
//         }
//       : {};
//     const data = await Book.find(search)
//       .populate("author")
//       .skip(skip)
//       .limit(limit);
//     res.json({ data });
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.searchcontroller = async (req, res, next) => {
  try {
    const { key } = req.query;
    await Book.createIndexes({ book: "text" });
    const list = await Book.find({ $text: { $search: key } });
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
