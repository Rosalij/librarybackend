const Review = require("../models/Review");
// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { bookId, reviewText, rating } = req.body;

    const review = await Review.create({
      bookId,
      reviewText,
      rating,
      user: req.user.id
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: "Failed to create review" });
  }
};

// Get reviews for a specific book
exports.getReviewsByBook = async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId })
      .populate("user", "username");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review || review.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    review.reviewText = req.body.reviewText;
    review.rating = req.body.rating;

    await review.save();

    res.json(review);
  } catch (error) {
    res.status(400).json({ message: "Update failed" });
  }
}; 

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review || review.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await review.deleteOne();

    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(400).json({ message: "Delete failed" });
  }
};
