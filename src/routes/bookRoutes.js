const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/search", bookController.searchBooks);
router.get("/:bookId", bookController.getBook);
router.get("/rating/:bookId", bookController.getBookRating);

module.exports = router;
