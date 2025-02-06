import { useQuery } from '@tanstack/react-query';
import { currentStore, storeName } from '@/features/get-store';

export function useFetchStore(token: string) {
  return useQuery({
    queryKey: ['Store'],
    queryFn: () => currentStore(token),
    enabled: !!token,
  });
}
export function useFetchStoreName(username: string) {
  return useQuery({
    queryKey: ['Store'],
    queryFn: () => storeName(username),
    enabled: !!username,
  });
}
