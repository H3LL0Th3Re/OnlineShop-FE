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
import { useAuthStore } from '@/hooks/authstore';
import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { useCreateProduct } from '../tanstack/useProduct';
import { useCreateVariant } from '../tanstack/useVariant';
import DialogAddVariant from './Dialog/dialog-add-variant';
import { Variant } from '@/types/product-type';
import Swal from 'sweetalert2';
import DropdownCategory from './dropdown-category';

function AddProduct() {
  const { token } = useAuthStore();
  const createProductMutation = useCreateProduct(token || '');
  const createVariantMutation = useCreateVariant(token || '');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryIds: [] as string[],
    subcategoryIds: [] as string[],
  });

  const [attachments, setAttachments] = useState<File | null>(null);
  const [variants, setVariants] = useState<Variant[]>([]);

  const handleCategorySelect = (categoryId: string, subcategoryId: string) => {
    setFormData({
      ...formData,
      categoryIds: [categoryId],
      subcategoryIds: [subcategoryId],
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (file: File | null) => {
    setAttachments(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Silakan login terlebih dahulu!',
        });
        return;
      }

      if (!attachments) {
        Swal.fire({
          icon: 'warning',
          title: 'Perhatian',
          text: 'Gambar produk wajib diisi!',
        });
        return;
      }

      // Loading state
      Swal.fire({
        title: 'Sedang memproses...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Buat produk
      const productResponse = await createProductMutation.mutateAsync({
        ...formData,
        attachments,
      });

      console.log('Response lengkap dari server setelah membuat produk:', {
        status: 'success',
        productResponse,
        productId: productResponse?.id,
      });

      // Pastikan productResponse valid
      if (!productResponse || !productResponse.id) {
        throw new Error('Gagal mendapatkan ID produk');
      }

      // Buat varian jika ada
      if (variants.length > 0) {
        for (const variant of variants) {
          try {
            await createVariantMutation.mutateAsync({
              productId: productResponse.id,
              data: variant,
            });
          } catch (variantError) {
            console.error('Error creating variant:', variantError);
            Swal.fire({
              icon: 'warning',
              title: 'Perhatian',
              text: 'Beberapa varian gagal dibuat',
            });
          }
        }
      }

      // Sukses
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Produk berhasil dibuat',
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        categoryIds: [],
        subcategoryIds: [],
      });
      setAttachments(null);
      setVariants([]);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: error instanceof Error ? error.message : 'Gagal membuat produk',
      });
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
                <DropdownCategory onSelectCategory={handleCategorySelect} />
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
                <DialogAddVariant
                  onAddVariant={(newVariant) =>
                    setVariants([...variants, newVariant])
                  }
                />
              </HStack>

              {variants.map((variant, index) => (
                <Button
                  key={index}
                  gap="5px"
                  bg={'white'}
                  color={'black'}
                  border={'1px solid rgb(87, 87, 87)'}
                  borderRadius={'10px'}
                >
                  <HStack gap="2">
                    <Text fontWeight="500" fontSize="14px">
                      {variant.name}
                    </Text>
                    <Checkbox size="sm" />
                  </HStack>
                </Button>
              ))}

              <VStack gap="5px" w="full" align="flex-start">
                <Text fontWeight="600" fontSize="15px">
                  Additional Information *
                </Text>
                <HStack>
                  <Button size="sm" variant="outline"></Button>
                  <Input placeholder="Add info..." />
                </HStack>
              </VStack>

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
                <Box w={'full'} p={4} borderWidth="1px" borderRadius="md">
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
