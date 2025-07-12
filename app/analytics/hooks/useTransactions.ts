import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Transaction } from "@/types/analytics";

export function useTransactions(session: any) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchTransactions = useCallback(async () => {
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
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [session, router]);

  return { transactions, loading, fetchTransactions, setTransactions };
}