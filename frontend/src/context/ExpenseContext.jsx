import { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../utils/api";
import toast from "react-hot-toast";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all transactions from backend
  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/transactions");
      setTransactions(data.data);
    } catch (err) {
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch summary + ML insight
  const fetchSummary = useCallback(async () => {
    try {
      const { data } = await API.get("/summary");
      setSummary(data.data);
    } catch (err) {
      console.error("Summary fetch error", err);
    }
  }, []);

  // Add new transaction
  const addTransaction = async (formData) => {
    try {
      const { data } = await API.post("/transactions", formData);
      setTransactions((prev) => [data.data, ...prev]);
      toast.success("Transaction added!");
      fetchSummary(); // refresh summary after change
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add transaction");
    }
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
      toast.success("Deleted!");
      fetchSummary();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchTransactions();
    fetchSummary();
  }, [fetchTransactions, fetchSummary]);

  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        summary,
        loading,
        addTransaction,
        deleteTransaction,
        fetchTransactions,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

// Custom hook so any component can use context easily
export const useExpense = () => useContext(ExpenseContext);
