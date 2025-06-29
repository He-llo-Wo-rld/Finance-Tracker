"use client";

import { DollarSign, PlusCircle, TrendingDown, TrendingUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Dashboard from "@/components/Dashboard";
import PublicNavbar from "@/components/PublicNavbar";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";

interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }
  }, [session, status, router]);

  const fetchTransactions = async () => {
    if (!session) return;

    try {
      const response = await fetch("/api/transactions");
      if (response.status === 401) {
        router.push("/auth/signin");
        return;
      }
      const data = await response.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchTransactions();
    }
  }, [session]);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!session) {
    return null;
  }

  return (
    <>
      <PublicNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome back, {session.user?.name}!{" "}
          </h1>
          <p className="text-lg text-gray-600">
            Track your finances and analyze your spending patterns
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Balance</p>
                <p
                  className={`text-3xl font-bold ${
                    balance >= 0 ? "text-green-600" : "text-rose-600"
                  }`}
                >
                  £{balance.toFixed(2)}
                </p>
              </div>
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  balance >= 0 ? "bg-green-100" : "bg-rose-100"
                }`}
              >
                <DollarSign
                  className={`h-6 w-6 ${
                    balance >= 0 ? "text-green-600" : "text-rose-600"
                  }`}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Income</p>
                <p className="text-3xl font-bold text-green-600">
                  £{totalIncome.toFixed(2)}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expenses</p>
                <p className="text-3xl font-bold text-rose-600">
                  £{totalExpenses.toFixed(2)}
                </p>
              </div>
              <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-rose-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <Dashboard transactions={transactions} />

        {/* Add Transaction Button */}
        <div className="text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            {showForm ? "Close form" : "Add transaction"}
          </button>
        </div>

        {/* Transaction Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <TransactionForm
              onSuccess={() => {
                fetchTransactions();
                setShowForm(false);
              }}
            />
          </div>
        )}

        {/* Transaction List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <TransactionList
            transactions={transactions}
            loading={loading}
            onUpdate={fetchTransactions}
          />
        </div>
      </div>
    </>
  );
}
