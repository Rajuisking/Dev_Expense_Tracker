const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be positive"],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Type must be income or expense"],
    },
    category: {
      type: String,
      enum: ["Freelance", "Salary", "Tools", "Learning", "Hardware", "Food", "Transport", "Other"],
      default: "Other",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
