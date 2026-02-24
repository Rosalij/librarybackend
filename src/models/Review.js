const mongoose = require("mongoose");
// Review schema
const reviewSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  reviewText: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
