import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#3d393f] text-white">
        <h1 className="text-2xl font-semibold">No favorites added yet.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#3d393f] text-white px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Favorites</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.movieId}
            movie={{
              id: movie.movieId,
              title: movie.title,
              poster_path: movie.posterPath,
              release_date: "", // You can ignore release_date or fetch from TMDB if needed
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
