import axios from "axios";

// All API calls go through /api — Vite proxy forwards to http://localhost:5000
const API = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

export default API;
