import axios from "axios";

const API = axios.create({
  baseURL: "https://dev-expense-tracker-ves6.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

export default API;