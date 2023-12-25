const express = require("express");
const {
  createBooks,
  getAllBooks,
  getSingleBook,
  deleteBook,
  updateBook,
  getAdminBook
} = require("../controllers/bookController");
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.get('/admin/all',getAdminBook )

// Middleware to enforce authentication for book-related routes
router.use(requireAuth);

// Route to get user books
router.get("/", getAllBooks);

// Route to create a book
router.post("/create", createBooks);

// Route to get a single book
router.get("/details/:id", getSingleBook);

// Route to delete a book
router.delete("/delete/:id", deleteBook);

// Route to update a book
router.put("/edit/:id", updateBook);

module.exports = router;
