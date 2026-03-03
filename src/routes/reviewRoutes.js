const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createReview,
  getReviewsByBook,
  updateReview,
  deleteReview,
  getLatestReviews
} = require("../controllers/reviewController");
// Routes
router.get("/latest", getLatestReviews);
 router.get("/my-reviews", authMiddleware, reviewController.getMyReviews);
 router.get("/:bookId", getReviewsByBook);
router.post("/", authMiddleware, createReview);
router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);


module.exports = router;


