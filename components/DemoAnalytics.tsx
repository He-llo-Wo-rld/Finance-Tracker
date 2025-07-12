"use client";

import {
  demoTransactions,
  getCategoryData,
  getMonthlyData,
} from "@/lib/demoData";
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

export default function DemoAnalytics() {
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");

  const monthlyData = getMonthlyData(demoTransactions, period);
  const incomeByCategory = getCategoryData(demoTransactions, "income", period);
  const expenseByCategory = getCategoryData(
    demoTransactions,
    "expense",
    period
  );

  const categoryIncomeData = Object.entries(incomeByCategory).map(
    ([category, periods]: [string, any]) => ({
      category,
      total: Object.values(periods).reduce(
        (sum: number, amount: any) => sum + amount,
        0
      ),
    })
  );

  const categoryExpenseData = Object.entries(expenseByCategory).map(
    ([category, periods]: [string, any]) => ({
      category,
      total: Object.values(periods).reduce(
        (sum: number, amount: any) => sum + amount,
        0
      ),
    })
  );

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
            Income by Categories ({period})
          </h3>
          {categoryIncomeData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryIncomeData}
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
                  {categoryIncomeData.map((entry, index) => (
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
            Expenses by Categories ({period})
          </h3>
          {categoryExpenseData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryExpenseData}>
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
    </div>
  );
}
