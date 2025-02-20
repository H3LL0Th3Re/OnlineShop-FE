import { Box, Text, VStack, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { useCategories } from '../tanstack/useCategory';
import { useAuthStore } from '@/hooks/authstore';

interface DropdownCategoryProps {
  onSelectCategory: (categoryId: string) => void;
}

export default function DropdownCategory({
  onSelectCategory,
}: DropdownCategoryProps) {
  const token = useAuthStore((state) => state.token);
  const { data: categories, isLoading, error } = useCategories(token || '');

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  if (isLoading) {
    return <Spinner size="sm" />;
  }

  if (error) {
    return <Text color="red.500">Error loading categories</Text>;
  }

  return (
    <VStack w="300px" position="relative">
      <Box
        w="full"
        p="2"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text>{selectedCategory || 'Pilih Kategori'}</Text>
      </Box>

      {isOpen && categories && categories.length > 0 && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          width="300px"
          zIndex={10}
          bg="white"
          boxShadow="lg"
          borderRadius="md"
          mt={2}
        >
          {categories.map((category) => (
            <Box
              key={category.id}
              p={3}
              _hover={{ bg: 'gray.50' }}
              cursor="pointer"
              onClick={() => {
                onSelectCategory(category.id); // Only pass categoryId
                setSelectedCategory(category.name); // Set selected category name
                setIsOpen(false); // Close the dropdown after selection
              }}
            >
              {category.name}
            </Box>
          ))}
        </Box>
      )}
    </VStack>
  );
}
