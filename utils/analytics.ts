import { Transaction } from "@/types/analytics";

export function getStats(transactions: Transaction[]) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, balance };
}

export function getMonthlyData(
  transactions: Transaction[],
  period: "monthly" | "yearly" = "monthly"
) {
  const groupedData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const key =
      period === "monthly"
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
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
  }, {} as Record<string, { period: string; income: number; expenses: number }>);

  return Object.values(groupedData).sort((a, b) =>
    a.period.localeCompare(b.period)
  );
}

export function getCategoryData(
  transactions: Transaction[],
  type: "income" | "expense"
) {
  const filteredTransactions = transactions.filter((t) => t.type === type);

  const groupedData = filteredTransactions.reduce((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = 0;
    }
    acc[transaction.category] += transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(groupedData).map(([category, total]) => ({
    category,
    total,
  }));
}