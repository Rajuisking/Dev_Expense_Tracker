import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { useExpense } from "../context/ExpenseContext";
import styles from "./Charts.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const CAT_COLORS = ["#1a56db","#0f9a6e","#e87e1a","#c94b8b","#8b5cf6","#ef4444","#14b8a6","#6b7280"];

export default function Charts() {
  const { summary } = useExpense();
  if (!summary) return null;

  const { monthlyData, categoryBreakdown } = summary;

  // Monthly bar chart data
  const barData = {
    labels: monthlyData.map((m) => m.month),
    datasets: [
      {
        label: "Income",
        data: monthlyData.map((m) => m.income),
        backgroundColor: "#1a9e5c",
        borderRadius: 5,
      },
      {
        label: "Expenses",
        data: monthlyData.map((m) => m.expense),
        backgroundColor: "#e05050",
        borderRadius: 5,
      },
    ],
  };

  // Category doughnut chart
  const doughnutData = {
    labels: categoryBreakdown.map((c) => c.category),
    datasets: [
      {
        data: categoryBreakdown.map((c) => c.amount),
        backgroundColor: CAT_COLORS.slice(0, categoryBreakdown.length),
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top", labels: { font: { size: 12 } } } },
    scales: {
      x: { grid: { display: false } },
      y: { ticks: { callback: (v) => "₹" + v.toLocaleString("en-IN") } },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "right", labels: { font: { size: 11 } } } },
  };

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <h4 className={styles.chartTitle}>Monthly Income vs Expenses</h4>
        <div className={styles.chartWrap}>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <div className={styles.card}>
        <h4 className={styles.chartTitle}>Expense by Category</h4>
        <div className={styles.chartWrap}>
          {categoryBreakdown.length > 0 ? (
            <Doughnut data={doughnutData} options={doughnutOptions} />
          ) : (
            <p className={styles.empty}>No expense data yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
