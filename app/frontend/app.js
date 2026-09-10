const API_URL = "/api";

const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");

// Fetch expenses
async function loadExpenses() {
  try {
    const response = await fetch(`${API_URL}/expenses`);

    if (!response.ok) {
      throw new Error("Failed to fetch expenses");
    }

    const expenses = await response.json();

    displayExpenses(expenses);
    calculateTotal(expenses);

  } catch (error) {
    expenseList.innerHTML = `
      <p class="error">
        Unable to load expenses.
      </p>
    `;

    console.error(error);
  }
}

// Display expenses
function displayExpenses(expenses) {

  if (expenses.length === 0) {
    expenseList.innerHTML = `
      <p class="empty">
        No expenses found.
      </p>
    `;
    return;
  }

  expenseList.innerHTML = expenses.map(expense => `
    <div class="expense-item">

      <div>
        <h3>${expense.title}</h3>
        <span class="category">
          ${expense.category}
        </span>
      </div>

      <div class="expense-right">

        <strong>
          ₹${expense.amount.toLocaleString("en-IN")}
        </strong>

        <button
          class="delete-btn"
          onclick="deleteExpense(${expense.id})"
        >
          Delete
        </button>

      </div>

    </div>
  `).join("");
}

// Calculate total
function calculateTotal(expenses) {

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  totalAmount.textContent =
    `₹${total.toLocaleString("en-IN")}`;
}

// Add expense
expenseForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const title =
    document.getElementById("title").value;

  const amount =
    document.getElementById("amount").value;

  const category =
    document.getElementById("category").value;

  try {

    const response = await fetch(
      `${API_URL}/expenses`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          title,
          amount,
          category
        })
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add expense");
    }

    expenseForm.reset();

    await loadExpenses();

  } catch (error) {
    alert("Unable to add expense");
    console.error(error);
  }
});

// Delete expense
async function deleteExpense(id) {

  try {

    const response = await fetch(
      `${API_URL}/expenses/${id}`,
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete expense");
    }

    await loadExpenses();

  } catch (error) {
    alert("Unable to delete expense");
    console.error(error);
  }
}

// Initial load
loadExpenses();
s