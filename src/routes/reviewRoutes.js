const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createReview,
  getReviewsByBook,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");
// Routes
router.get("/:bookId", getReviewsByBook);
router.post("/", authMiddleware, createReview);
router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;
