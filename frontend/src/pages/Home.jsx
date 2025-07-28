import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
  e.preventDefault();

  if (!search.trim()) return;
  if (loading) return;

  setLoading(true); // ✅ sabse pehle loading true karo
  setError(null);   // ✅ purana error hata do

  try {
    const searchResult = await searchMovies(search); // ✅ query pass karo
    setMovies(searchResult);
  } catch (err) {
    console.log(err);
    setError("Failed to load movies");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-[#3d393f] text-white px-4 py-6">
      {/* Search Form */}
      <form
        className="flex justify-center items-center gap-4 mb-8"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Enter movie name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-md text-white outline-white shadow-md bg-[#222]"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-md text-white font-semibold transition duration-300"
        >
          Search
        </button>
      </form>

      {/* Loading Message */}
      {loading ? (
        <div className="text-center text-lg text-gray-300 font-semibold mt-10">
          Loading movies...
        </div>
      ) : (
        // Movies Grid
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
