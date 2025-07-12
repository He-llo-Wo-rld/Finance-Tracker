import { useState } from "react";
import { Transaction } from "@/types/analytics";

export function useTransactionList(
  transactions: Transaction[],
  onUpdate: () => void,
  ITEMS_PER_PAGE: number
) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const deleteTransaction = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onUpdate();
        setConfirmDeleteId(null);

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
    setConfirmDeleteId(null);
  };

  return {
    deletingId,
    confirmDeleteId,
    currentPage,
    setCurrentPage,
    deleteTransaction,
    handleDeleteClick,
    cancelDelete,
    handlePageChange,
  };
}