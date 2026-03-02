const express = require("express");
const router = express.Router();

router.get("/search", async (req, res) => {
  const { q, startIndex = 0 } = req.query;

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(q)}&startIndex=${startIndex}&maxResults=8&key=${process.env.GOOGLE_BOOKS_KEY}`
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching books" });
  }
});

module.exports = router;
