"use client";

import { Check, Trash2, X } from "lucide-react";
import { useState } from "react";
import Pagination from "./Pagination";

interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  loading: boolean;
  onUpdate: () => void;
}

const ITEMS_PER_PAGE = 10;

export default function TransactionList({
  transactions,
  loading,
  onUpdate,
}: TransactionListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTransactions = transactions.slice(startIndex, endIndex);

  const deleteTransaction = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onUpdate();
        setConfirmDeleteId(null);

        // Adjust current page if we deleted the last item on the page
        const newTotal = transactions.length - 1;
        const newTotalPages = Math.ceil(newTotal / ITEMS_PER_PAGE);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete transaction");
      }
    } catch (error) {
      alert("Network error");
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setConfirmDeleteId(id);
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setConfirmDeleteId(null); // Clear any pending confirmations
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Transactions
        </h3>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Transactions ({transactions.length})
        </h3>

        {transactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No transactions yet. Add your first transaction!
          </p>
        ) : (
          <>
            <div className="space-y-3">
              {currentTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                    confirmDeleteId === transaction._id
                      ? "border-rose-300 bg-rose-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-gray-900 truncate">
                          {transaction.description}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {transaction.category}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <p
                          className={`font-bold ${
                            transaction.type === "income"
                              ? "text-green-600"
                              : "text-rose-600"
                          }`}
                        >
                          {transaction.type === "income" ? "+" : "-"}£
                          {transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4 flex items-center space-x-2 flex-shrink-0">
                    {confirmDeleteId === transaction._id ? (
                      // Inline confirmation
                      <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-lg border border-rose-300">
                        <span className="text-sm text-gray-700 hidden sm:inline">
                          Delete?
                        </span>
                        <button
                          onClick={() => deleteTransaction(transaction._id)}
                          disabled={deletingId === transaction._id}
                          className="text-rose-600 hover:text-rose-800 p-1 disabled:opacity-50"
                          title="Confirm delete"
                        >
                          {deletingId === transaction._id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-rose-600"></div>
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={cancelDelete}
                          className="text-gray-600 hover:text-gray-800 p-1"
                          title="Cancel"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      // Delete button
                      <button
                        onClick={() => handleDeleteClick(transaction._id)}
                        className="text-rose-600 hover:text-rose-800 p-2 rounded-md hover:bg-rose-50 transition-colors"
                        title="Delete transaction"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          loading={loading}
        />
      )}
    </div>
  );
}
