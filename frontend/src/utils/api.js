import axios from "axios";

// All API calls go through /api — Vite proxy forwards to http://localhost:5000
const API = axios.create({
  baseURL: "https://dev-expense-tracker-ves6.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

export default API;
