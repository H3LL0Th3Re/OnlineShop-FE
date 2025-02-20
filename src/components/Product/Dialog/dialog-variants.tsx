'use client';

import { Button, HStack, Text, VStack } from '@chakra-ui/react';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchVariants } from '@/features/dashboard/services/product';
import { Option, Variant_option_values } from '@/types/product-type';

export const DialogVariants = ({ productId }: { productId: string }) => {
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['variants', productId],
    queryFn: () => fetchVariants(productId),
    enabled: open,
  });

  const variants = data || [];

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button
          size="xs"
          rounded={'full'}
          bg="white"
          color={'black'}
          borderWidth={'1px'}
          borderColor={'black'}
          h={7}
        >
          Variants
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Variants Product</DialogTitle>
        </DialogHeader>
        <DialogBody spaceY={5}>
          {isLoading && <Text>Loading...</Text>}
          {error && <Text color="red.500">Error fetching variants</Text>}

          {variants.length > 0 ? (
            <VStack align="start" spaceY={3}>
              {variants.map((variant: Variant_option_values) => (
                <VStack
                  key={variant.id}
                  align="start"
                  p={3}
                  borderWidth="1px"
                  borderRadius="md"
                  width="100%"
                >
                  <HStack display={'flex'} w={'full'} gap={24}>
                    <VStack
                      display={'flex'}
                      justifyContent={'flex-start'}
                      alignItems={'flex-start'}
                    >
                      <Text fontWeight="bold">SKU: {variant.sku}</Text>
                      <Text fontWeight={'500'}>
                        Price: Rp {variant.price.toLocaleString()}
                      </Text>
                    </VStack>
                    <VStack
                      display={'flex'}
                      justifyContent={'flex-start'}
                      alignItems={'flex-start'}
                    >
                      <Text fontWeight={'500'}>Stock: {variant.stock} pcs</Text>
                      <Text fontWeight={'500'}>Weight: {variant.weight} g</Text>
                    </VStack>
                  </HStack>
                  <Text fontWeight="semibold">Options:</Text>
                  {variant.options && variant.options.length > 0 ? (
                    <HStack>
                      {variant.options.map((option: Option) => (
                        <Text
                          key={option.id}
                          px={2}
                          py={1}
                          borderWidth="1px"
                          borderRadius="md"
                          fontWeight={'500'}
                        >
                          {option.name}
                        </Text>
                      ))}
                    </HStack>
                  ) : (
                    <Text color="gray.500">No options available</Text>
                  )}
                </VStack>
              ))}
            </VStack>
          ) : (
            <Text>No variants available</Text>
          )}
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
