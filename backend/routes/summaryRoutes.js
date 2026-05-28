const express = require("express");
const router = express.Router();
const { getSummary } = require("../controllers/summaryController");

// GET /api/summary → returns totals, breakdown, monthly data, ML insight
router.get("/", getSummary);

module.exports = router;
