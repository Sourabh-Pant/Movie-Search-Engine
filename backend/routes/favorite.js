import express from 'express';
import Favorite from '../models/Favorite.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// GET all favorites
router.get('/', verifyToken, async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add to favorites
router.post('/add', verifyToken, async (req, res) => {
  const { movieId, title, posterPath } = req.body;

  try {
    const exists = await Favorite.findOne({ userId: req.user.id, movieId });
    if (exists) return res.status(400).json({ message: "Already in favorites" });

    const fav = new Favorite({
      userId: req.user.id, // ✅ Correct key
      movieId,
      title,
      posterPath,
    });

    await fav.save();
    res.status(201).json(fav);
  } catch (err) {
    console.error("🔥 Error saving favorite:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Remove from favorites
router.delete('/remove/:movieId', verifyToken, async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      userId: req.user.id,
      movieId: req.params.movieId,
    });
    res.status(200).json({ message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove" });
  }
});

export default router;
