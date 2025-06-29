"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface DashboardProps {
  transactions: Transaction[];
}

export default function Dashboard({ transactions }: DashboardProps) {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");

  // Helper functions for data processing
  const getMonthlyData = (
    transactions: Transaction[],
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
    }, {} as Record<string, { period: string; income: number; expenses: number }>);

    return Object.values(groupedData).sort((a, b) =>
      a.period.localeCompare(b.period)
    );
  };

  const getCategoryData = (
    transactions: Transaction[],
    type: "income" | "expense"
  ) => {
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
  };

  // Process transaction data
  const monthlyData = getMonthlyData(transactions, period);
  const incomeByCategory = getCategoryData(transactions, "income");
  const expenseByCategory = getCategoryData(transactions, "expense");

  // Calculate totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#f97316",
    "#84cc16",
  ];

  if (transactions.length === 0) {
    return (
      <div className="space-y-8">
        {/* Period Selector */}
        <div className="flex justify-center">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setPeriod("monthly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                period === "monthly"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Monthly View
            </button>
            <button
              onClick={() => setPeriod("yearly")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                period === "yearly"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Yearly View
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
          <p className="text-gray-500">
            No data to display. Add some transactions to see your financial
            overview.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Period Selector */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setPeriod("monthly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              period === "monthly"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Monthly View
          </button>
          <button
            onClick={() => setPeriod("yearly")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              period === "yearly"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Yearly View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* 1. Monthly/Yearly Income vs Expenses */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {period === "monthly" ? "Monthly" : "Yearly"} Income vs Expenses
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip formatter={(value: number) => `£${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="income" fill="#10b981" name="Income" />
              <Bar dataKey="expenses" fill="#f43f5e" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Income by Categories */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Income by Categories
          </h3>
          {incomeByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, total }) =>
                    `${category}: £${total.toFixed(0)}`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="total"
                >
                  {incomeByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `£${value.toFixed(2)}`}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">No income data available</p>
            </div>
          )}
        </div>

        {/* 3. Expenses by Categories */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Expenses by Categories
          </h3>
          {expenseByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenseByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="category"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => `£${value.toFixed(2)}`}
                />
                <Bar dataKey="total" fill="#f43f5e" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500">No expense data available</p>
            </div>
          )}
        </div>

        {/* 4. Income and Expenses Trends */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {period === "monthly" ? "Monthly" : "Yearly"} Trends
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip formatter={(value: number) => `£${value.toFixed(2)}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                strokeWidth={3}
                name="Income"
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="#f43f5e"
                strokeWidth={3}
                name="Expenses"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Statistics */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              £
              {transactions
                .filter((t) => t.type === "income")
                .reduce((sum, t) => sum + t.amount, 0)
                .toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Total Income</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-rose-600">
              £
              {transactions
                .filter((t) => t.type === "expense")
                .reduce((sum, t) => sum + t.amount, 0)
                .toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Total Expenses</p>
          </div>
          <div className="text-center">
            <p
              className={`text-2xl font-bold ${
                transactions
                  .filter((t) => t.type === "income")
                  .reduce((sum, t) => sum + t.amount, 0) -
                  transactions
                    .filter((t) => t.type === "expense")
                    .reduce((sum, t) => sum + t.amount, 0) >=
                0
                  ? "text-green-600"
                  : "text-rose-600"
              }`}
            >
              £
              {(
                transactions
                  .filter((t) => t.type === "income")
                  .reduce((sum, t) => sum + t.amount, 0) -
                transactions
                  .filter((t) => t.type === "expense")
                  .reduce((sum, t) => sum + t.amount, 0)
              ).toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Net Balance</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {transactions.length}
            </p>
            <p className="text-sm text-gray-600">Total Transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
