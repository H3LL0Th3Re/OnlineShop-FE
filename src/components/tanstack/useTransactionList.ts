import { currentBalance } from '@/features/get-balance';
import { useQuery } from '@tanstack/react-query';

export function useFetchBalance(token: string) {
  return useQuery({
    queryKey: ['Transaction'],
    queryFn: () => currentBalance(token),
    enabled: !!token,
  });
}
