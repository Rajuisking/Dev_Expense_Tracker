import { useExpense } from "../context/ExpenseContext";
import styles from "./SummaryCards.module.css";

const fmt = (n) =>
  "₹" + Math.abs(n).toLocaleString("en-IN", { minimumFractionDigits: 0 });

export default function SummaryCards() {
  const { summary } = useExpense();

  if (!summary) return null;

  const { totalIncome, totalExpense, balance } = summary;

  const cards = [
    { label: "Total Income", value: fmt(totalIncome), color: "#1a9e5c", icon: "📈" },
    { label: "Total Expenses", value: fmt(totalExpense), color: "#d94040", icon: "📉" },
    {
      label: "Balance",
      value: (balance < 0 ? "-" : "") + fmt(balance),
      color: balance >= 0 ? "#1a56db" : "#d94040",
      icon: "💼",
    },
    {
      label: "Spending Ratio",
      value: summary.spendingRatio + "%",
      color: summary.spendingRatio > 80 ? "#d94040" : "#f59e0b",
      icon: "📊",
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <div className={styles.card} key={card.label}>
          <span className={styles.icon}>{card.icon}</span>
          <div className={styles.label}>{card.label}</div>
          <div className={styles.value} style={{ color: card.color }}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}
