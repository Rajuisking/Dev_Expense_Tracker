const express = require("express");
const router = express.Router();
const {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");

// GET  /api/transactions        → get all (supports ?type=income&category=Freelance)
// POST /api/transactions        → create new
router.route("/").get(getTransactions).post(createTransaction);

// GET    /api/transactions/:id  → get one
// PUT    /api/transactions/:id  → update
// DELETE /api/transactions/:id  → delete
router
  .route("/:id")
  .get(getTransactionById)
  .put(updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
