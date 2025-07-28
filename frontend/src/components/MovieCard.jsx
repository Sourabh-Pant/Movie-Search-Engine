import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useMovieContext } from "../contexts/MovieContext";
import { useAuth } from "../contexts/AuthContext";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const { currentUser } = useAuth();

  const imagePath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  const favorite = isFavorite(movie.id);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please login to add favorites!");
      return;
    }

    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-[#2b2b2b] shadow-md group transition duration-300">
      <img
        src={imagePath}
        alt={movie.title}
        className="w-full h-[400px] object-cover group-hover:opacity-60 transition-opacity duration-300"
      />
      <div className="absolute top-2 right-2 z-10">
        <button onClick={handleFavoriteToggle} className="cursor-pointer text-2xl">
          {favorite ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-white hover:text-red-500" />
          )}
        </button>
      </div>
      <div className="p-3">
        <h3 className="text-white text-md font-semibold truncate">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          {movie.release_date?.split("-")[0] || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
