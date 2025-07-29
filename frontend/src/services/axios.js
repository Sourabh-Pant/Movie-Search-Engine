// frontend/src/services/axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://movie-search-engine-dwoq.onrender.com/api', // ✅ Set correct backend base URL
  withCredentials: true, // ✅ important for cookies (JWT)
});

export default instance;
