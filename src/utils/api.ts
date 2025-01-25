import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  // baseURL: "https://task-bachend.vercel.app",
  timeout: 15000, // 10 seconds timeout
  withCredentials: true, // Enable cookies
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

export default api;
