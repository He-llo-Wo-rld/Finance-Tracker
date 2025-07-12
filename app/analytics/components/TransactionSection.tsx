import { TransactionForm, TransactionList } from "@/components";
import { PlusCircle } from "lucide-react";

type TransactionSectionProps = {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  transactions: any[];
  loading: boolean;
  fetchTransactions: () => void;
};

export const TransactionSection = ({
  showForm,
  setShowForm,
  transactions,
  loading,
  fetchTransactions,
}: TransactionSectionProps) => {
  return (
    <>
      <div className="text-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          {showForm ? "Close form" : "Add transaction"}
        </button>
      </div>

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

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <TransactionList
          transactions={transactions}
          loading={loading}
          onUpdate={fetchTransactions}
        />
      </div>
    </>
  );
};
