import { useExpense } from "../context/ExpenseContext";
import styles from "./TransactionList.module.css";

const fmt = (n) => "₹" + n.toLocaleString("en-IN");
const catEmoji = {
  Freelance: "💻", Salary: "💼", Tools: "🔧", Learning: "📚",
  Hardware: "🖥", Food: "🍕", Transport: "🚌", Other: "📦",
};

export default function TransactionList() {
  const { transactions, loading, deleteTransaction } = useExpense();

  if (loading) return <p className={styles.loading}>Loading transactions...</p>;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>📋 Transactions</h3>
      {transactions.length === 0 ? (
        <p className={styles.empty}>No transactions yet. Add one above!</p>
      ) : (
        <div className={styles.list}>
          {transactions.map((t) => (
            <div className={styles.row} key={t._id}>
              <div className={`${styles.icon} ${t.type === "income" ? styles.inc : styles.exp}`}>
                {t.type === "income" ? "↑" : "↓"}
              </div>
              <div className={styles.info}>
                <div className={styles.desc}>{t.description}</div>
                <div className={styles.meta}>
                  {catEmoji[t.category] || "📦"} {t.category} ·{" "}
                  {new Date(t.date).toLocaleDateString("en-IN")}
                </div>
              </div>
              <div className={`${styles.amount} ${t.type === "income" ? styles.inc : styles.exp}`}>
                {t.type === "income" ? "+" : "-"}{fmt(t.amount)}
              </div>
              <button
                className={styles.del}
                onClick={() => deleteTransaction(t._id)}
                aria-label="Delete"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
