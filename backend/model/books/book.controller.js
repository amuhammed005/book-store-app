import Book from "./book.model.js";
import fallbackBooks from "../../data/fallbackBooks.js";
import { isDatabaseAvailable } from "../../config/db.js";

export const createBook = async (req, res) => {
  try {
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res.status(200).send({
      success: true,
      message: "Book posted successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Error creating book", error);
    res.status(500).send({ message: "Failed to create book" });
  }
};

export const getAllBooks = async (req, res) => {
  if (!isDatabaseAvailable()) {
    return res.status(200).json({ books: fallbackBooks, source: "fallback" });
  }

  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json({ books, source: "database" });
  } catch (error) {
    console.error("Error fetching books", error);
    res.status(200).json({ books: fallbackBooks, source: "fallback" });
  }
};

export const getSingleBook = async (req, res) => {
  const { id } = req.params;
  const fallbackBook = fallbackBooks.find((book) => book._id === id);

  if (!isDatabaseAvailable()) {
    return fallbackBook
      ? res.status(200).json(fallbackBook)
      : res.status(404).json({ success: false, message: "Book not found" });
  }

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(404)
        .send({ success: false, message: "Book not found" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("Error fetching book", error);
    return fallbackBook
      ? res.status(200).json(fallbackBook)
      : res.status(500).send({ success: false, message: "Failed to fetch book" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res
        .status(404)
        .send({ success: false, message: "Book not found" });
    }
    res.status(200).send({ message: "Book updated successfully", updatedBook });
  } catch (error) {
    console.error("Error updating book", error);
    res.status(500).send({ success: false, message: "Failed to update book" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res
        .status(404)
        .send({ success: false, message: "Book not found" });
    }
    res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book", error);
    res.status(500).send({ success: false, message: "Failed to delete book" });
  }
};
