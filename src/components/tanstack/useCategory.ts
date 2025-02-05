import { useQuery } from '@tanstack/react-query';
import { CategoryDisplay } from '@/types/categories';
import { getAllCategory } from '@/services/category-services';

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
