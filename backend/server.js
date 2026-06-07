const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const transactionRoutes = require("./routes/transactionRoutes");
const summaryRoutes = require("./routes/summaryRoutes");

const app = express();

// Middleware
app.use(cors({ origin: ["http://localhost:5173" ,  "https://dev-expense-tracker.vercel.app" , /\.vercel\.app$/ ]}));
app.use(express.json());

// Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/summary", summaryRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Dev Expense Tracker API running ✅" });
});

// Connect to MongoDB then start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
