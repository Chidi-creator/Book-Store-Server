const mongoose = require("mongoose");

const Book = require("../models/book");

//function to create new book
exports.createBooks = async (req, res) => {
  const { title, author, publishYear } = req.body;

  try {
    if (!title || !author || !publishYear) {
      return res.status(400).json({ error: "Fill all required fields" });
    }
    const user_id = req.user._id;
    const books = await Book.create({ title, author, publishYear, user_id });

    res.status(200).json({ message: "Book Created successfully", books });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ error: error.message });
  }
};

//function to get user books
exports.getAllBooks = async (req, res) => {
  try {
    const user_id = req.user._id;
    const books = await Book.find({ user_id });
    res.status(200).json(books);
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: error.message });
  }
};

//function to get a single  book
exports.getSingleBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ error: "Invalid Id" });
  }

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ error: "book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: error.message });
  }
};

//function to update book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, publishYear } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(401).json({ error: "no such id" });
  }
  try {
    if (!title || !author || !publishYear) {
      return res.status(400).json({ error: "Fill all required fields" });
    }

    const book = await Book.findByIdAndUpdate(id, req.body);

    if (!book) {
      return res.status(401).json({ error: "Boook not found" });
    }

    return res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: error.message });
  }
};

//funcion to delete a book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid) {
      return res.status(401).json({ error: "Invalid id" });
    }
    const book = await Book.findByIdAndDelete(id);
    res.status(200).json({ message: "Book deleted successfully" });

    if (!book) {
      return res.status(404).json({ error: "book not found" });
    }
  } catch (error) {}
};

//function to get all books

exports.getAdminBook = async (req, res) => {
  try {
    const book = await Book.find({});
    res.status(200).json(book);
  } catch (error) {
    res.status(401).json(error.message);
  }
};
