import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogRoot,
} from '@/components/ui/dialog';
import { useState } from 'react';

export interface DialogInputVariant {
  price: number;
  sku: string;
  stock: number;
  weight: number;
}

interface DialogInputVariantCombinationsProps {
  onSave: (variantCombination: DialogInputVariant) => void;
}

export const DialogInputVariantCombinations = ({
  onSave,
}: DialogInputVariantCombinationsProps) => {
  const [open, setOpen] = useState(false);

  // State to manage input values
  const [price, setPrice] = useState<number>(0);
  const [sku, setSku] = useState<string>('');
  const [stock, setStock] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  const handleSave = () => {
    // Creating a variant combination object to save
    const variantCombination: DialogInputVariant = {
      price,
      sku,
      stock,
      weight,
    };
    onSave(variantCombination); // Pass the data back to the parent component
    setOpen(false); // Close the dialog
  };

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Variant</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Input Variant Combinations</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box borderWidth="1px" borderRadius="md" width={'full'} p={4}>
            <VStack align="flex-start">
              <Text fontWeight={'bold'}>Variant: </Text>
              <HStack
                w={'full'}
                gap={5}
                width={'full'}
                display={'flex'}
                justifyContent={'space-between'}
              >
                <Flex w={'50%'} direction={'column'}>
                  <Text fontWeight="600" fontSize="15px">
                    Price *
                  </Text>
                  <Input
                    placeholder="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </Flex>
                <Flex w={'50%'} direction={'column'}>
                  <Text fontWeight="600" fontSize="15px">
                    SKU *
                  </Text>
                  <Input
                    placeholder="SKU"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                  />
                </Flex>
              </HStack>
              <HStack
                w={'full'}
                gap={5}
                width={'full'}
                display={'flex'}
                justifyContent={'space-between'}
              >
                <Flex w={'50%'} direction={'column'}>
                  <Text fontWeight="600" fontSize="15px">
                    Product Stock *
                  </Text>
                  <Input
                    placeholder="Stock"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                  />
                </Flex>
                <Flex w={'50%'} direction={'column'}>
                  <Text fontWeight="600" fontSize="15px">
                    Product Weight *
                  </Text>
                  <Input
                    placeholder="Weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                  />
                </Flex>
              </HStack>
            </VStack>
          </Box>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
