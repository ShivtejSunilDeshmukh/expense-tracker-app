const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Simple in-memory database for now
let expenses = [
  {
    id: 1,
    title: "Groceries",
    amount: 850,
    category: "Food"
  },
  {
    id: 2,
    title: "Internet Bill",
    amount: 999,
    category: "Bills"
  },
  {
    id: 3,
    title: "Movie",
    amount: 450,
    category: "Entertainment"
  }
];

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "expense-tracker-backend"
  });
});

// Get all expenses
app.get("/api/expenses", (req, res) => {
  res.json(expenses);
});

// Add an expense
app.post("/api/expenses", (req, res) => {
  const { title, amount, category } = req.body;

  if (!title || !amount || !category) {
    return res.status(400).json({
      error: "Title, amount and category are required"
    });
  }

  const newExpense = {
    id: Date.now(),
    title,
    amount: Number(amount),
    category
  };

  expenses.push(newExpense);

  res.status(201).json(newExpense);
});

// Delete an expense
app.delete("/api/expenses/:id", (req, res) => {
  const id = Number(req.params.id);

  const expenseExists = expenses.some(
    (expense) => expense.id === id
  );

  if (!expenseExists) {
    return res.status(404).json({
      error: "Expense not found"
    });
  }

  expenses = expenses.filter(
    (expense) => expense.id !== id
  );

  res.json({
    message: "Expense deleted successfully"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});
