import { useState } from "react";
import { useExpense } from "../context/ExpenseContext";
import styles from "./AddTransaction.module.css";

const CATEGORIES = ["Freelance", "Salary", "Tools", "Learning", "Hardware", "Food", "Transport", "Other"];

const defaultForm = {
  description: "",
  amount: "",
  type: "expense",
  category: "Other",
  date: new Date().toISOString().slice(0, 10),
};

export default function AddTransaction() {
  const { addTransaction } = useExpense();
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;
    setSubmitting(true);
    await addTransaction({ ...form, amount: parseFloat(form.amount) });
    setForm(defaultForm);
    setSubmitting(false);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>➕ Add Transaction</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label>Description</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. Freelance project"
              required
            />
          </div>
          <div className={styles.field}>
            <label>Amount (₹)</label>
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="5000"
              min="1"
              required
            />
          </div>
          <div className={styles.field}>
            <label>Type</label>
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="income">+ Income</option>
              <option value="expense">- Expense</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label>Date</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} />
          </div>
        </div>
        <button type="submit" className={styles.btn} disabled={submitting}>
          {submitting ? "Adding..." : "Add Entry"}
        </button>
      </form>
    </div>
  );
}
