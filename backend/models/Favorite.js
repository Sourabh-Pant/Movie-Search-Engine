import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  title: String,
  posterPath: String,
});

export default mongoose.model("Favorite", favoriteSchema);
