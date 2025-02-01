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
import { FileUploadProduct } from './file-upload-product';
import { useProductStore } from '../Store/product-store';
import { useAuthStore } from '@/hooks/authstore';
import { useState } from 'react';
import { createVariant } from '@/features/dashboard/services/variant';
import DialogAddVariant from './Dialog/dialog-add-variant';
import { Variant, VariantOption } from '@/types/product-type';
import { Checkbox } from '../ui/checkbox';
import { createVariantOptions } from '@/features/dashboard/services/variant-options';
import Swal from 'sweetalert2';

const generateId = () => {
  return Math.random().toString(36).substr(2, 9); // Contoh implementasi untuk menghasilkan ID unik
};

function AddProduct() {
  const { token } = useAuthStore();
  const { addProduct } = useProductStore();

  // State for form inputs
  const [productName, setProductName] = useState('');
  const [productURL, setProductURL] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [showField, setShowField] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState<VariantOption[]>([]);
  const [newInfo, setNewInfo] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImageFiles(Array.from(event.target.files));
    }
  };

  const handleAddVariant = (variant: Variant) => {
    setVariants((prevVariants) => [...prevVariants, variant]);
  };

  const handleAddAdditionalInfo = (info: VariantOption) => {
    setAdditionalInfo((prev) => [...prev, info]);
    setNewInfo('');
    setShowField(true);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Tampilkan loading alert
    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait while we upload your product.',
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('url', productURL);
    formData.append('category', category);
    formData.append('description', description);
    imageFiles.forEach((file) => {
      formData.append('attachments', file);
    });

    try {
      if (!token) {
        throw new Error('Token is null, cannot create product.');
      }

      const newProduct = await addProduct(token, formData);
      if (newProduct.id) {
        const variantData = {
          name: productName,
          is_active: true,
          productId: newProduct.id,
        };
        const createdVariant = await createVariant(
          token,
          newProduct.id,
          variantData
        );

        for (const info of additionalInfo) {
          await createVariantOptions(token, {
            name: info.name,
            variantId: createdVariant.id,
          });
        }
        console.log('variant options:', additionalInfo);
      } else {
        console.error('Token is null, cannot create variant.');
      }

      setProductName('');
      setProductURL('');
      setCategory('');
      setDescription('');
      setImageFiles([]);
      setVariants([]);
      console.log('Product creation successful:', productName);
    } catch (error) {
      console.error('Error creating product or variant:', error);
    } finally {
      // Tutup loading alert
      Swal.close();
    }
  };

  const handleRemoveInfo = (index: number) => {
    setAdditionalInfo((prev) => prev.filter((_, i) => i !== index));
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
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </VStack>
              <VStack gap="5px" w={'full'} align="flex-start">
                <Text fontWeight="600" fontSize="15px">
                  Product URL
                </Text>
                <Input
                  placeholder="Enter your URL"
                  value={productURL}
                  onChange={(e) => setProductURL(e.target.value)}
                />
              </VStack>
              <VStack gap="5px" w={'full'} align="flex-start">
                <Text fontWeight="600" fontSize="15px">
                  Category
                </Text>
                <Input
                  placeholder="Select category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                    <Input type="file" multiple onChange={handleFileChange} />
                  </Center>

                  <Center
                    bg="bg.emphasized"
                    h="200px"
                    w="200px"
                    borderWidth="3px"
                    borderRadius="10px"
                    style={{ borderStyle: 'dashed' }}
                  >
                    <FileUploadProduct />
                  </Center>
                  <Center
                    bg="bg.emphasized"
                    h="200px"
                    w="200px"
                    borderWidth="3px"
                    borderRadius="10px"
                    style={{ borderStyle: 'dashed' }}
                  >
                    <FileUploadProduct />
                  </Center>
                  <Center
                    bg="bg.emphasized"
                    h="200px"
                    w="200px"
                    borderWidth="3px"
                    borderRadius="10px"
                    style={{ borderStyle: 'dashed' }}
                  >
                    <FileUploadProduct />
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
                <DialogAddVariant onAddVariant={handleAddVariant} />
              </HStack>

              {variants.map((variant, index) => (
                <Button
                  gap="5px"
                  bg={'white'}
                  color={'black'}
                  border={'1px solid rgb(87, 87, 87)'}
                  borderRadius={'10px'}
                >
                  <HStack key={index} gap="2">
                    <Text fontWeight="500" fontSize="14px">
                      {variant.name}
                    </Text>
                    <Checkbox
                      size="sm"
                      onChange={(e) =>
                        setShowField((e.target as HTMLInputElement).checked)
                      }
                    />
                  </HStack>
                </Button>
              ))}

              {showField && (
                <VStack gap="5px" w="full" align="flex-start">
                  <Text fontWeight="600" fontSize="15px">
                    Additional Information *
                  </Text>
                  <HStack>
                    {additionalInfo.map((info, index) => (
                      <Button
                        key={info.name}
                        size="sm"
                        variant="outline"
                        onClick={() => handleRemoveInfo(index)}
                      >
                        {info.name} &times;
                      </Button>
                    ))}
                    <Input
                      placeholder="Add info..."
                      value={newInfo}
                      onChange={(e) => setNewInfo(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newInfo) {
                          handleAddAdditionalInfo({
                            name: newInfo,
                            id: generateId(),
                            Variant_option_values: [],
                          });
                        }
                      }}
                    />
                  </HStack>
                </VStack>
              )}
              {showField && additionalInfo.length > 0 && (
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
                  {variants.map((variant, index) => (
                    <Box
                      key={index}
                      w={'full'}
                      p={4}
                      borderWidth="1px"
                      borderRadius="md"
                    >
                      <HStack justify="space-between" w="100%">
                        <Text fontWeight="600" fontSize="15px">
                          {variant.Variant_options.map((option) => {
                            console.log('Variant Option Name:', option.name);
                            return <Text key={option.id}>{option.name}</Text>;
                          })}
                        </Text>
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
                  ))}
                </VStack>
              )}
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
              {variants.map((variant, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="md">
                  <Text>Variant Name: {variant.name}</Text>
                  <Text>Variant Options:</Text>
                  <VStack spaceY={2}>
                    {variant.Variant_options.map((option, optionIndex) => (
                      <Text key={optionIndex}>{option.name}</Text>
                    ))}
                  </VStack>
                </Box>
              ))}
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
                <Button bgColor="#2400FE" color="white" type="submit">
                  Save Product
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
