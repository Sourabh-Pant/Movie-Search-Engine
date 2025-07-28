import { createContext, useContext, useEffect, useState } from "react";
import axios from "../services/axios";
import { useAuth } from "./AuthContext"; // 🔥 ADD THIS

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { currentUser } = useAuth(); // 🔥 Get logged-in user

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!currentUser) {
        setFavorites([]); // Clear when user logs out
        return;
      }

      try {
        const res = await axios.get("/favorites");
        setFavorites(res.data);
      } catch (err) {
        console.error("Failed to fetch favorites", err);
      }
    };

    fetchFavorites();
  }, [currentUser]); // 🔥 Reload favorites whenever user logs in or logs out

  const isFavorite = (movieId) => {
    return favorites.some((fav) => fav.movieId === movieId);
  };

  const addToFavorites = async (movie) => {
    try {
      const res = await axios.post("/favorites/add", {
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
      });
      setFavorites((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to add to favorites", err.response?.data || err.message);
    }
  };

  const removeFromFavorites = async (movieId) => {
    try {
      await axios.delete(`/favorites/remove/${movieId}`);
      setFavorites((prev) => prev.filter((m) => m.movieId !== movieId));
    } catch (err) {
      console.error("Failed to remove from favorites", err.response?.data || err.message);
    }
  };

  return (
    <MovieContext.Provider value={{ favorites, isFavorite, addToFavorites, removeFromFavorites }}>
      {children}
    </MovieContext.Provider>
  );
};
