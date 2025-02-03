import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  HStack,
  Input,
  InputAddon,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { FileUploadProduct } from './file-upload-product';
import { useAuthStore } from '@/hooks/authstore';
import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { useCreateProduct } from '../tanstack/useProduct';

function AddProduct() {
  const { token } = useAuthStore();
  const { mutate: createProduct, isPending } = useCreateProduct(token || '');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryIds: [],
    subcategoryIds: [],
  });

  const [attachments, setAttachments] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (file: File | null) => {
    setAttachments(file); // Set file yang dipilih ke state
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast.loading('Waiting...');

    if (attachments) {
      createProduct({
        ...formData,
        attachments,
        id: '',
        variants: [],
      });
    } else {
      alert('Image is required');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Flex>
          <VStack align={'flex-start'} w={'100%'}>
            <VStack
              bgColor="white"
              w={'full'}
              p="7"
              gap="10px"
              align="flex-start"
              borderRadius="10px"
            >
              <Text fontWeight="700" fontSize="17px" color="#2400FE">
                Product Information
              </Text>
              <VStack gap="5px" w={'full'} align="flex-start">
                <Text fontWeight="600" fontSize="15px">
                  Product Name
                </Text>
                <Input
                  name="name"
                  placeholder="Enter product name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </VStack>
              <VStack gap="5px" w={'full'} align="flex-start">
                <Text fontWeight="600" fontSize="15px">
                  Product URL
                </Text>
                <Input placeholder="Enter your URL" />
              </VStack>
              <VStack gap="5px" w={'full'} align="flex-start">
                <Text fontWeight="600" fontSize="15px">
                  Category
                </Text>
                <Input placeholder="Select category" />
              </VStack>
            </VStack>

            <VStack
              bgColor="white"
              w={'full'}
              p="7"
              gap="10px"
              mt="30px"
              align="flex-start"
              borderRadius="10px"
            >
              <Text fontWeight="700" fontSize="17px" color="#2400FE">
                Product Detail
              </Text>
              <VStack gap="5px" w="full" align="flex-start">
                <Text fontWeight="600" fontSize="15px">
                  Description
                </Text>
                <Textarea
                  placeholder="Enter description product..."
                  size="xl"
                  p="2"
                  borderRadius="10px"
                  height="200px"
                  name="description"
                  onChange={handleChange}
                  value={formData.description}
                />
              </VStack>
              <Text fontWeight="600" fontSize="15px">
                Product URL
              </Text>
              <VStack gap="5px" w="full" align="center">
                <HStack align="center" gap="50px">
                  <Center
                    bg="bg.emphasized"
                    h="200px"
                    w="200px"
                    borderWidth="3px"
                    borderRadius="10px"
                    style={{ borderStyle: 'dashed' }}
                  >
                    <FileUploadProduct onFileSelect={handleFileSelect} />
                  </Center>

                  <Center
                    bg="bg.emphasized"
                    h="200px"
                    w="200px"
                    borderWidth="3px"
                    borderRadius="10px"
                    style={{ borderStyle: 'dashed' }}
                  >
                    <FileUploadProduct onFileSelect={handleFileSelect} />
                  </Center>
                  <Center
                    bg="bg.emphasized"
                    h="200px"
                    w="200px"
                    borderWidth="3px"
                    borderRadius="10px"
                    style={{ borderStyle: 'dashed' }}
                  >
                    <FileUploadProduct onFileSelect={handleFileSelect} />
                  </Center>
                  <Center
                    bg="bg.emphasized"
                    h="200px"
                    w="200px"
                    borderWidth="3px"
                    borderRadius="10px"
                    style={{ borderStyle: 'dashed' }}
                  >
                    <FileUploadProduct onFileSelect={handleFileSelect} />
                  </Center>
                </HStack>
              </VStack>
            </VStack>

            <VStack
              bgColor="white"
              w={'full'}
              p="7"
              gap="10px"
              mt="30px"
              align="flex-start"
              borderRadius="10px"
            >
              <Text fontWeight="700" fontSize="17px" color="#2400FE">
                Product Variant
              </Text>
              <HStack gap="5px" w="full" align="flex-start">
                <Text fontWeight="600" fontSize="15px">
                  Add variants so buyers can choose the right product, come on!{' '}
                </Text>
                {/* <DialogAddVariant /> */}
              </HStack>

              {/* {variants.map((variant, index) => ( */}
              <Button
                gap="5px"
                bg={'white'}
                color={'black'}
                border={'1px solid rgb(87, 87, 87)'}
                borderRadius={'10px'}
              >
                <HStack gap="2">
                  <Text fontWeight="500" fontSize="14px">
                    {/* {variant.name} */}
                  </Text>
                  <Checkbox size="sm" />
                </HStack>
              </Button>
              {/* ))} */}

              {/* {showField && ( */}
              <VStack gap="5px" w="full" align="flex-start">
                <Text fontWeight="600" fontSize="15px">
                  Additional Information *
                </Text>
                <HStack>
                  {/* {additionalInfo.map((info, index) => ( */}
                  <Button size="sm" variant="outline">
                    {/* {info.name} &times; */}
                  </Button>
                  {/* ))} */}
                  <Input placeholder="Add info..." />
                </HStack>
              </VStack>
              {/* )} */}
              {/* {showField && additionalInfo.length > 0 && ( */}
              <VStack
                bgColor="white"
                w={'full'}
                gap="10px"
                mt="20px"
                borderRadius="10px"
                align="flex-start"
              >
                <Text fontWeight="700" fontSize="17px" color="#2400FE">
                  Variant List
                </Text>
                {/* {variants.map((variant, index) => ( */}
                <Box
                  // key={index}
                  w={'full'}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                >
                  <HStack justify="space-between" w="100%">
                    <Text fontWeight="600" fontSize="15px"></Text>
                  </HStack>
                  <Flex justify={'space-between'} w={'full'} gap={2}>
                    <Flex w={'50%'}>
                      <Text fontWeight="600" fontSize="15px">
                        Price *
                      </Text>
                      <InputAddon>Rp</InputAddon>
                      <Input placeholder="Enter price" />
                    </Flex>
                    <Flex w={'50%'}>
                      <Text fontWeight="600" fontSize="15px">
                        SKU (Stock Keeping Unit) *
                      </Text>
                      <Input placeholder="Enter SKU" />
                    </Flex>
                  </Flex>
                  <Flex justify={'space-between'} w={'full'} gap={2}>
                    <Flex w={'50%'}>
                      <Text fontWeight="600" fontSize="15px">
                        Product Stock *
                      </Text>
                      <Input placeholder="Enter stock" />
                    </Flex>
                    <Flex w={'50%'}>
                      <Text fontWeight="600" fontSize="15px">
                        Product Weight *
                      </Text>
                      <Input placeholder="Enter weight" />
                      <InputAddon>Gram</InputAddon>
                    </Flex>
                  </Flex>
                </Box>
                {/* ))} */}
              </VStack>
              {/* )} */}
            </VStack>

            <VStack
              bgColor="white"
              w={'full'}
              p="7"
              gap="10px"
              mt="30px"
              align="flex-start"
              borderRadius="10px"
            >
              <Text fontWeight="700" fontSize="17px" color="#2400FE">
                Product Price
              </Text>
              <VStack gap="5px" w="full" align="flex-start">
                <Text fontWeight="600" fontSize="15px">
                  Price
                </Text>
                <Group>
                  <InputAddon>Rp</InputAddon>
                  <Input borderLeftRadius="0" placeholder="Harga produk ..." />
                </Group>
              </VStack>
              <VStack gap="5px" w="full" align="flex-start">
                <Text fontWeight="600" fontSize="15px">
                  Minimum Order
                </Text>
                <Group>
                  <Input
                    placeholder="Jumlah produk ..."
                    borderRightRadius="0"
                  />
                  <InputAddon borderLeftRadius="0" borderRightRadius="5px">
                    Product
                  </InputAddon>
                </Group>
              </VStack>
            </VStack>

            <VStack
              bgColor="white"
              w={'full'}
              p="7"
              gap="10px"
              mt="30px"
              align="flex-start"
              borderRadius="10px"
            >
              <Text fontWeight="700" fontSize="17px" color="#2400FE">
                Product Management
              </Text>
              <HStack gap="10" width="full">
                <VStack w="full" align="flex-start">
                  <Text fontWeight="600" fontSize="15px">
                    Product Stock
                  </Text>
                  <Group flex="1">
                    <Input placeholder="Stock" />
                  </Group>
                </VStack>
                <VStack w="full" align="flex-start">
                  <Text fontWeight="600" fontSize="15px">
                    SKU (Stock Keeping Unit)
                  </Text>
                  <Group flex="1">
                    <Input placeholder="Sku" />
                  </Group>
                </VStack>
              </HStack>
            </VStack>

            <VStack
              bgColor="white"
              w={'full'}
              p="7"
              gap="10px"
              mt="30px"
              align="flex-start"
              borderRadius="10px"
            >
              <Text fontWeight="700" fontSize="17px" color="#2400FE">
                Weight & Dimension
              </Text>
              <VStack w="full" align="flex-start">
                <Text fontWeight="600" fontSize="15px">
                  Product Weight
                </Text>
                <Group>
                  <Input borderLeftRadius="5px" borderRightRadius="0" />
                  <InputAddon borderLeftRadius="0" borderRightRadius="5px">
                    Grams
                  </InputAddon>
                </Group>
              </VStack>
              <VStack w="full" align="flex-start">
                <Text fontWeight="600" fontSize="15px">
                  Product Stock
                </Text>
                <HStack gap="10" width="full">
                  <VStack w="full" align="flex-start">
                    <Group flex="1">
                      <Input
                        borderLeftRadius="5px"
                        borderRightRadius="0"
                        placeholder="Length"
                      />
                      <InputAddon borderLeftRadius="0" borderRightRadius="5px">
                        cm
                      </InputAddon>
                    </Group>
                  </VStack>
                  <VStack w="full" align="flex-start">
                    <Group flex="1">
                      <Input
                        borderLeftRadius="5px"
                        borderRightRadius="0"
                        placeholder="Width"
                      />
                      <InputAddon borderLeftRadius="0" borderRightRadius="5px">
                        cm
                      </InputAddon>
                    </Group>
                  </VStack>
                  <VStack w="full" align="flex-start">
                    <Group flex="1">
                      <Input
                        borderLeftRadius="5px"
                        borderRightRadius="0"
                        placeholder="Height"
                      />
                      <InputAddon borderLeftRadius="0" borderRightRadius="5px">
                        cm
                      </InputAddon>
                    </Group>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>

            <VStack
              bgColor="white"
              w={'full'}
              p="7"
              gap="10px"
              mt="30px"
              align="flex-start"
              borderRadius="10px"
            >
              <Text fontWeight="700" fontSize="17px" color="#2400FE">
                Variant List
              </Text>
              {/* {variants.map((variant, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                  <Text>Variant Name: {variant.name}</Text>
                  <Text>Variant Options:</Text>
                  <VStack spaceY={2}>
                    {variant.Variant_options.map((option, optionIndex) => (
                      <Text key={optionIndex}>{option.name}</Text>
                    ))}
                  </VStack>
                </Box>
              ))} */}
            </VStack>

            <VStack
              bgColor="white"
              w={'full'}
              p="7"
              gap="10px"
              mt="30px"
              borderRadius="10px"
              align="flex-end"
            >
              <HStack>
                <Button variant="outline">Cancel</Button>
                <Button
                  bgColor="#2400FE"
                  color="white"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending ? 'Submitting ...' : 'Save Product'}
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </Flex>
      </Box>
    </form>
  );
}

export default AddProduct;
