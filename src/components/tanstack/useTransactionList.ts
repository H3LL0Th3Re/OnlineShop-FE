import { currentBalance } from '@/features/get-balance';
import { storeTransaction } from '@/features/get-transaction-list';
import { useQuery } from '@tanstack/react-query';

export function useFetchBalance(token: string) {
  return useQuery({
    queryKey: ['Transaction'],
    queryFn: () => currentBalance(token),
    enabled: !!token,
  });
}

export function useFetchTransactionStore(token: string) {
  return useQuery({
    queryKey: ['TransactionList'],
    queryFn: () => storeTransaction(token),
    enabled: !!token,
  });
}
