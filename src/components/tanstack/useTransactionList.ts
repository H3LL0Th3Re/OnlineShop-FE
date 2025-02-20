import { currentBalance } from '@/features/get-balance';
import { storeTransaction } from '@/features/get-transaction-list';
import {
  acceptedWithdrawal,
  allWithdrawal,
  pendingWithdrawal,
  rejectWithdrawal,
} from '@/features/get-withdrawal-all';
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

export function useFetchAllWithdrawal(token: string) {
  return useQuery({
    queryKey: ['TransactionList'],
    queryFn: () => allWithdrawal(token),
    enabled: !!token,
  });
}
export function useFetchPendingWithdrawal(token: string) {
  return useQuery({
    queryKey: ['TransactionList'],
    queryFn: () => pendingWithdrawal(token),
    enabled: !!token,
  });
}
export function useFetchAcceptedWithdrawal(token: string) {
  return useQuery({
    queryKey: ['TransactionList'],
    queryFn: () => acceptedWithdrawal(token),
    enabled: !!token,
  });
}
export function useFetchRejectedWithdrawal(token: string) {
  return useQuery({
    queryKey: ['TransactionList'],
    queryFn: () => rejectWithdrawal(token),
    enabled: !!token,
  });
}
