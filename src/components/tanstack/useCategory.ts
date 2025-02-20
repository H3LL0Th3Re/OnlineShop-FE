import { useQuery } from '@tanstack/react-query';
import { CategoryDisplay } from '@/types/categories';
import {
  getAllCategory,
  getCategoryByIdService,
} from '@/features/dashboard/services/category-services';

export const useCategories = (token: string) => {
  return useQuery({
    queryKey: ['Categories'],
    queryFn: () => getAllCategory.getAllCategories(token),
    select: (data): CategoryDisplay[] => {
      const categories = data.categories;

      const parentCategories = categories.filter((cat) => !cat.parentId);

      return parentCategories.map((parent) => ({
        id: parent.id,
        name: parent.name,
        subCategories: categories
          .filter((child) => child.parentId === parent.id)
          .map((child) => ({
            id: child.id,
            name: child.name,
          })),
      }));
    },
  });
};

export const useFilterCategories = (token: string) => {
  return useQuery({
    queryKey: ['Categories'],
    queryFn: () => getAllCategory.getAllCategories(token),
    select: (data) => data.categories,
  });
};

export const useCategoryById = (categoryId: string) => {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategoryByIdService(categoryId),
    enabled: !!categoryId,
  });
};
