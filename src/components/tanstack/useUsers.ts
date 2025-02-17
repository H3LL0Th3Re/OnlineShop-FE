import { useQuery } from '@tanstack/react-query';
import { getAllRoles } from '@/features/get-roles';
import { getUser } from '@/features/get-user';

export function useFetchRoles() {
  return useQuery({
    queryKey: ['Role'],
    queryFn: () => getAllRoles(),
  });
}
export function useFetchUser(token: string) {
  return useQuery({
    queryKey: ['User'],
    queryFn: () => getUser(token),
    enabled: !!token,
  });
}
