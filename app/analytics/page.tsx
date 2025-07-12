"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Dashboard, PublicNavbar } from "@/components";
import { getStats } from "@/utils/analytics";
import {
  Loading,
  StatsCards,
  TransactionSection,
  WelcomeSection,
} from "./components";
import { useTransactions } from "./hooks/useTransactions";

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const { transactions, loading, fetchTransactions } = useTransactions(session);
  const { totalIncome, totalExpenses, balance } = getStats(transactions);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/auth/signin");
      return;
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session) {
      fetchTransactions();
    }
  }, [session]);

  if (status === "loading") return <Loading />;

  if (!session) return null;

  return (
    <>
      <PublicNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <WelcomeSection session={session} />

        <StatsCards
          balance={balance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        <Dashboard transactions={transactions} />

        <TransactionSection
          showForm={showForm}
          setShowForm={setShowForm}
          transactions={transactions}
          loading={loading}
          fetchTransactions={fetchTransactions}
        />
      </div>
    </>
  );
}
