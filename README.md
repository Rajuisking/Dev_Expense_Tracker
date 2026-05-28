# 💰 Dev Expense Tracker

Full-stack MERN app to track income and expenses with ML-powered spending insights.

## 📁 Folder Structure

```
dev-expense-tracker/
├── backend/
│   ├── controllers/
│   │   ├── transactionController.js   ← CRUD logic
│   │   └── summaryController.js       ← ML insight logic
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Transaction.js             ← MongoDB schema
│   ├── routes/
│   │   ├── transactionRoutes.js       ← /api/transactions
│   │   └── summaryRoutes.js           ← /api/summary
│   ├── .env.example
│   ├── package.json
│   └── server.js                      ← Entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── SummaryCards.jsx        ← Income / Expense / Balance
    │   │   ├── AddTransaction.jsx      ← Form to add entries
    │   │   ├── MLInsight.jsx           ← Smart spending tip from backend
    │   │   ├── Charts.jsx              ← Bar + Doughnut charts
    │   │   └── TransactionList.jsx     ← All transactions with delete
    │   ├── context/
    │   │   └── ExpenseContext.jsx      ← Global state + API calls
    │   ├── pages/
    │   │   └── Dashboard.jsx           ← Main page
    │   ├── utils/
    │   │   └── api.js                  ← Axios instance
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🚀 How to Run

### Step 1 — Start MongoDB
Make sure MongoDB is running locally:
```bash
mongod
```
Or use a free MongoDB Atlas cluster (cloud).

### Step 2 — Setup Backend
```bash
cd backend
npm install

# Copy .env.example to .env and fill in your MONGO_URI
cp .env.example .env

npm run dev        # runs on http://localhost:5000
```

### Step 3 — Setup Frontend
```bash
cd frontend
npm install
npm run dev        # runs on http://localhost:5173
```

Open http://localhost:5173 in your browser.

## 🔗 API Endpoints

| Method | Route | What it does |
|--------|-------|-------------|
| GET | /api/transactions | Get all transactions |
| POST | /api/transactions | Add new transaction |
| PUT | /api/transactions/:id | Update transaction |
| DELETE | /api/transactions/:id | Delete transaction |
| GET | /api/summary | Get totals + ML insight |

## 🧠 ML Insight Logic (summaryController.js)
- Calculates `spendingRatio = totalExpense / totalIncome * 100`
- If ratio > 80% → warning
- If ratio 50–80% → info
- If ratio < 50% → healthy / success
- Returns top spending category from MongoDB aggregation

## 🛠 Tech Stack
- **Frontend**: React, Vite, Chart.js, Axios, react-hot-toast
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Styling**: CSS Modules (no Tailwind — easier to understand)
