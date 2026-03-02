
const Review = require("../models/Review");

// Search books
exports.searchBooks = async (req, res) => {
  const { q, startIndex = 0 } = req.query;
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        q
      )}&startIndex=${startIndex}&maxResults=8&key=${process.env.GOOGLE_BOOKS_KEY}`
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching books" });
  }
};

// Get single book by ID
exports.getBook = async (req, res) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${req.params.bookId}?key=${process.env.GOOGLE_BOOKS_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch book" });
  }
};

// Get average rating for a book
exports.getBookRating = async (req, res) => {
  try {
    const result = await Review.aggregate([
      { $match: { bookId: req.params.bookId } },
      {
        $group: {
          _id: "$bookId",
          avgRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(result[0] || { avgRating: 0, count: 0 });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rating" });
  }
};
