import { currentBank, getBankById } from '@/features/get-bank';
import { useQuery } from '@tanstack/react-query';

export function useFetchBank(token: string) {
  return useQuery({
    queryKey: ['Bank'],
    queryFn: () => currentBank(token),
    enabled: !!token,
  });
}
export function useFetchBankId(id: string, token: string) {
  return useQuery({
    queryKey: ['Bank'],
    queryFn: () => getBankById(id, token),
    enabled: !!token,
  });
}
