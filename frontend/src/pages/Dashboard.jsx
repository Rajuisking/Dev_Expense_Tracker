import SummaryCards from "../components/SummaryCards";
import AddTransaction from "../components/AddTransaction";
import MLInsight from "../components/MLInsight";
import Charts from "../components/Charts";
import TransactionList from "../components/TransactionList";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <main className={styles.main}>
      <SummaryCards />
      <AddTransaction />
      <MLInsight />
      <Charts />
      <TransactionList />
    </main>
  );
}
