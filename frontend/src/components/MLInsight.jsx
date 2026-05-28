import { useExpense } from "../context/ExpenseContext";
import styles from "./MLInsight.module.css";

const icons = { warning: "⚠️", success: "✅", info: "📊" };
const colors = {
  warning: { border: "#f59e0b", bg: "#fffbeb" },
  success: { border: "#10b981", bg: "#ecfdf5" },
  info: { border: "#1a56db", bg: "#eff6ff" },
};

export default function MLInsight() {
  const { summary } = useExpense();
  if (!summary?.insight) return null;

  const { message, type } = summary.insight;
  const style = colors[type] || colors.info;

  return (
    <div
      className={styles.box}
      style={{ borderLeftColor: style.border, background: style.bg }}
    >
      <span className={styles.icon}>{icons[type]}</span>
      <p className={styles.msg}>{message}</p>
    </div>
  );
}
