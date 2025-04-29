// Create a file like utils/api.js
import axios from 'axios';

// Configure axios to use your backend URL
const api = axios.create({
  baseURL: 'http://localhost:5001', // Replace with your actual backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;