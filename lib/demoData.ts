// Demo data for showcasing features
export const demoTransactions = [
  // Current month transactions
  {
    id: "1",
    type: "income",
    amount: 3500,
    category: "Salary",
    description: "Monthly salary",
    date: "2024-01-15",
  },
  {
    id: "2",
    type: "income",
    amount: 800,
    category: "Freelance",
    description: "Web development project",
    date: "2024-01-20",
  },
  {
    id: "3",
    type: "expense",
    amount: 1200,
    category: "Bills",
    description: "Rent payment",
    date: "2024-01-01",
  },
  {
    id: "4",
    type: "expense",
    amount: 350,
    category: "Food",
    description: "Groceries and dining",
    date: "2024-01-10",
  },
  {
    id: "5",
    type: "expense",
    amount: 150,
    category: "Transportation",
    description: "Fuel and maintenance",
    date: "2024-01-12",
  },
  {
    id: "6",
    type: "expense",
    amount: 80,
    category: "Entertainment",
    description: "Movies and subscriptions",
    date: "2024-01-18",
  },

  // Previous month
  {
    id: "7",
    type: "income",
    amount: 3500,
    category: "Salary",
    description: "Monthly salary",
    date: "2023-12-15",
  },
  {
    id: "8",
    type: "income",
    amount: 600,
    category: "Investment",
    description: "Dividend income",
    date: "2023-12-20",
  },
  {
    id: "9",
    type: "expense",
    amount: 1200,
    category: "Bills",
    description: "Rent payment",
    date: "2023-12-01",
  },
  {
    id: "10",
    type: "expense",
    amount: 400,
    category: "Food",
    description: "Groceries and dining",
    date: "2023-12-10",
  },
  {
    id: "11",
    type: "expense",
    amount: 200,
    category: "Shopping",
    description: "Clothing and accessories",
    date: "2023-12-15",
  },
  {
    id: "12",
    type: "expense",
    amount: 120,
    category: "Healthcare",
    description: "Medical checkup",
    date: "2023-12-22",
  },

  // Two months ago
  {
    id: "13",
    type: "income",
    amount: 3500,
    category: "Salary",
    description: "Monthly salary",
    date: "2023-11-15",
  },
  {
    id: "14",
    type: "income",
    amount: 1200,
    category: "Business",
    description: "Consulting work",
    date: "2023-11-25",
  },
  {
    id: "15",
    type: "expense",
    amount: 1200,
    category: "Bills",
    description: "Rent payment",
    date: "2023-11-01",
  },
  {
    id: "16",
    type: "expense",
    amount: 300,
    category: "Food",
    description: "Groceries and dining",
    date: "2023-11-08",
  },
  {
    id: "17",
    type: "expense",
    amount: 180,
    category: "Transportation",
    description: "Public transport",
    date: "2023-11-12",
  },
  {
    id: "18",
    type: "expense",
    amount: 250,
    category: "Education",
    description: "Online courses",
    date: "2023-11-20",
  },
];

export const demoCategories = {
  income: ["Salary", "Freelance", "Investment", "Business", "Gift", "Other"],
  expense: [
    "Food",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills",
    "Healthcare",
    "Education",
    "Other",
  ],
};

// Helper functions for demo data processing
export const getMonthlyData = (
  transactions: any[],
  period: "monthly" | "yearly" = "monthly"
) => {
  const groupedData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const key =
      period === "monthly"
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}`
        : `${date.getFullYear()}`;

    if (!acc[key]) {
      acc[key] = { period: key, income: 0, expenses: 0 };
    }

    if (transaction.type === "income") {
      acc[key].income += transaction.amount;
    } else {
      acc[key].expenses += transaction.amount;
    }

    return acc;
  }, {});

  return Object.values(groupedData).sort((a: any, b: any) =>
    a.period.localeCompare(b.period)
  );
};

export const getCategoryData = (
  transactions: any[],
  type: "income" | "expense",
  period: "monthly" | "yearly" = "monthly"
) => {
  const filteredTransactions = transactions.filter((t) => t.type === type);

  const groupedData = filteredTransactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const periodKey =
      period === "monthly"
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}`
        : `${date.getFullYear()}`;

    if (!acc[transaction.category]) {
      acc[transaction.category] = {};
    }

    if (!acc[transaction.category][periodKey]) {
      acc[transaction.category][periodKey] = 0;
    }

    acc[transaction.category][periodKey] += transaction.amount;

    return acc;
  }, {});

  return groupedData;
};
