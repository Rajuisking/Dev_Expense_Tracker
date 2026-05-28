import { Toaster } from "react-hot-toast";
import { ExpenseProvider } from "./context/ExpenseContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <ExpenseProvider>
      <Toaster position="top-right" />
      <Navbar />
      <Dashboard />
    </ExpenseProvider>
  );
}

export default App;
