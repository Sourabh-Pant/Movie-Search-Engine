import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import favoriteRoutes from './routes/favorite.js';

dotenv.config();
const app = express();
const port=process.env.PORT || 4000; 
app.use(cors({
  origin: 'https://movie-search-engine-1.onrender.com',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoriteRoutes); // ✅ Favorite route added

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected");
  app.listen(port, () => {
    console.log("Server running on port 5000");
  });
}).catch(err => console.error(err));
