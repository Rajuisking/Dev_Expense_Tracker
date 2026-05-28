const Transaction = require("../models/Transaction");

// GET /api/summary
// Returns totals, category breakdown, monthly data, and ML insight
const getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find();

    // --- Basic totals ---
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // --- Category breakdown (expenses only) ---
    const categoryMap = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      });

    const categoryBreakdown = Object.entries(categoryMap)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);

    // --- Monthly data (last 6 months) ---
    const monthlyMap = {};
    transactions.forEach((t) => {
      const key = t.date.toISOString().slice(0, 7); // "YYYY-MM"
      if (!monthlyMap[key]) monthlyMap[key] = { income: 0, expense: 0 };
      if (t.type === "income") monthlyMap[key].income += t.amount;
      else monthlyMap[key].expense += t.amount;
    });

    const monthlyData = Object.entries(monthlyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6)
      .map(([month, data]) => ({ month, ...data }));

    // --- ML Insight: spending ratio analysis ---
    const spendingRatio = totalIncome > 0 ? (totalExpense / totalIncome) * 100 : 100;
    const topCategory = categoryBreakdown[0]?.category || "None";

    let insight = "";
    let insightType = "info";

    if (spendingRatio > 80) {
      insight = `You're spending ${spendingRatio.toFixed(0)}% of your income. Top category: ${topCategory}. Consider cutting non-essentials.`;
      insightType = "warning";
    } else if (spendingRatio > 50) {
      insight = `Spending at ${spendingRatio.toFixed(0)}% of income. Biggest cost: ${topCategory}. On track but watch growth.`;
      insightType = "info";
    } else if (totalIncome === 0) {
      insight = "No income recorded yet. Add your income sources to see insights.";
      insightType = "info";
    } else {
      insight = `Healthy ratio — only ${spendingRatio.toFixed(0)}% spent. Top expense: ${topCategory}. Great savings pace!`;
      insightType = "success";
    }

    res.json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        balance,
        spendingRatio: parseFloat(spendingRatio.toFixed(2)),
        categoryBreakdown,
        monthlyData,
        insight: { message: insight, type: insightType },
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getSummary };
