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
import { useState, useEffect } from 'react';
import { useCreateProduct } from '../tanstack/useProduct';
import { useCreateVariant } from '../tanstack/useVariant';
import DialogAddVariant from './Dialog/dialog-add-variant';
import Swal from 'sweetalert2';
import DropdownCategory from './dropdown-category';
import { useCreateVariantOptions } from '../tanstack/useVariantOptions';
import { useCreateVariantOptionValue } from '../tanstack/useVariantOptionValues';
import { Variant } from '@/types/product-type';

// Define the type for variant options
interface VariantOption {
  id: string; // or the appropriate type for your ID
  name: string;
  // Add other properties if needed
}

function AddProduct() {
  const { token } = useAuthStore();
  const createProductMutation = useCreateProduct(token || '');
  const createVariantMutation = useCreateVariant(token || '');
  const createVariantOptionMutation = useCreateVariantOptions();
  const createVariantOptionValueMutation = useCreateVariantOptionValue();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryIds: [] as string[],
    subcategoryIds: [] as string[],
    minimum_order: 0,
    price: 0,
    stock: 0,
    sku: '',
    length: 0,
    height: 0,
    width: 0,
    weight: 0,
  });

  const [attachments, setAttachments] = useState<File[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [variantOptions, setVariantOptions] = useState<
    { name: string; variantId: string }[][]
  >([]);
  const [variantOptionValues, setVariantOptionValues] = useState<
    { price: number; sku: string; stock: number; weight: number }[]
  >([]);
  const [variantOptionInputs, setVariantOptionInputs] = useState<string[]>([]);
  const [variantCombinations, setVariantCombinations] = useState<
    VariantOption[][]
  >([]);

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

  const handleFileSelect = (files: File[]) => {
    setAttachments((prev) => [...prev, ...files]);
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

      if (attachments.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Perhatian',
          text: 'Gambar produk wajib diisi!',
        });
        return;
      }

      if (!formData.name || !formData.description) {
        Swal.fire({
          icon: 'warning',
          title: 'Perhatian',
          text: 'Semua field wajib diisi!',
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

      // Pastikan productResponse valid
      if (!productResponse || !productResponse.id) {
        throw new Error('Gagal mendapatkan ID produk');
      }

      // Buat varian dan variant options
      if (variants.length > 0) {
        for (
          let variantIndex = 0;
          variantIndex < variants.length;
          variantIndex++
        ) {
          const variant = variants[variantIndex]; // Get the current variant
          try {
            const variantResponse = await createVariantMutation.mutateAsync({
              productId: productResponse.id,
              data: {
                ...variant,
              },
            });

            console.log('variant response:', variantResponse);

            // Pastikan variantResponse valid
            if (!variantResponse || !variantResponse.variant.id) {
              throw new Error('Gagal mendapatkan ID varian');
            }

            // Buat variant options jika ada
            if (
              variantOptions[variantIndex] &&
              variantOptions[variantIndex].length > 0
            ) {
              for (const option of variantOptions[variantIndex]) {
                const variantOptionResponse =
                  await createVariantOptionMutation.mutateAsync({
                    token,
                    variantOptionsData: {
                      name: option.name,
                      variantId: variantResponse.variant.id, // Use the current variant's ID
                      values: [],
                    },
                  });

                console.log('Variant option response:', variantOptionResponse); // Log the response
                if (!variantOptionResponse || !variantOptionResponse.id) {
                  throw new Error('Gagal mendapatkan ID opsi varian');
                }

                // Create variant option values
                for (const value of variantOptionValues) {
                  const variantOptionIds = variantOptions[variantIndex].map(
                    (opt) => opt.variantId
                  ); // Collect IDs of variant options

                  // Log the data being sent
                  console.log('Sending variant option value:', {
                    sku: value.sku,
                    price: value.price,
                    stock: value.stock,
                    weight: value.weight,
                    variant_options: variantOptionIds,
                  });

                  // Validasi data sebelum mengirim
                  if (
                    !value.sku ||
                    !value.weight ||
                    !value.stock ||
                    !value.price ||
                    variantOptionIds.length === 0
                  ) {
                    throw new Error('All fields required');
                  }

                  await createVariantOptionValueMutation.mutateAsync({
                    token,
                    data: {
                      sku: value.sku,
                      price: value.price,
                      stock: value.stock,
                      weight: value.weight,
                      is_active: false,
                      variant_optionsId: variantOptionIds.join(','), // Convert array of variant option IDs to a string
                    },
                  });
                }
              }
            }
          } catch (error) {
            console.error('Error creating variant or options:', error);
            throw error;
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
        minimum_order: 0,
        price: 0,
        stock: 0,
        sku: '',
        length: 0,
        height: 0,
        width: 0,
        weight: 0,
      });
      setAttachments([]);
      setVariants([]);
      setVariantOptionValues([]);
    } catch (error) {
      console.error('Error creating product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: error instanceof Error ? error.message : 'Gagal membuat produk',
      });
    }
  };

  const handleVariantOptionInputChange = (index: number, value: string) => {
    setVariantOptionInputs((prev) => {
      const updatedInputs = [...prev];
      updatedInputs[index] = value;
      return updatedInputs;
    });
  };

  const handleAddVariantOption = (variantIndex: number) => {
    const optionName = variantOptionInputs[variantIndex];
    if (optionName) {
      setVariantOptions((prev) => {
        const updatedOptions = [...prev];
        if (!updatedOptions[variantIndex]) {
          updatedOptions[variantIndex] = [];
        }
        if (
          !updatedOptions[variantIndex].some(
            (option) => option.name === optionName
          )
        ) {
          updatedOptions[variantIndex].push({
            name: optionName,
            variantId: `${Date.now()}`,
          });
        }
        return updatedOptions;
      });
      setVariantOptionInputs((prev) => {
        const updatedInputs = [...prev];
        updatedInputs[variantIndex] = '';
        return updatedInputs;
      });
    }
  };

  const handleRemoveVariantOption = (
    variantIndex: number,
    variantId: string
  ) => {
    setVariantOptions((prev) => {
      const updatedOptions = { ...prev };
      updatedOptions[variantIndex] = updatedOptions[variantIndex].filter(
        (option) => option.variantId !== variantId
      );
      return updatedOptions;
    });
  };

  const handleRemoveVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
    setVariantOptions((prev) => {
      const newOptions = [...prev];
      newOptions.splice(index, 1); // Remove options for the variant being deleted
      return newOptions;
    });
  };

  // Function to generate combinations of selected variants
  // const generateCombinations = (
  //   options: { name: string; variantId: string }[][]
  // ) => {
  //   const combinations = options.reduce(
  //     (acc, curr) => {
  //       return acc.flatMap((accItem) =>
  //         curr.map((option) => [...accItem, option])
  //       );
  //     },
  //     [[]] as { name: string; variantId: string }[][]
  //   );

  //   return combinations;
  // };

  const generateVariantCombinations = () => {
    const combinations: VariantOption[][] = [];
    const variantOptionsLength = variantOptions.length;

    const generate = (currentCombination: VariantOption[], index: number) => {
      if (index === variantOptionsLength) {
        combinations.push(currentCombination);
        return;
      }
      for (const option of variantOptions[index]) {
        generate(
          [...currentCombination, { ...option, id: option.variantId }],
          index + 1
        );
      }
    };

    generate([], 0);
    setVariantCombinations(combinations);
  };

  useEffect(() => {
    if (variantOptions.length > 0) {
      generateVariantCombinations();
    }
  }, [variantOptions]);

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
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Center
                      key={index}
                      bg="bg.emphasized"
                      h="200px"
                      w="200px"
                      borderWidth="3px"
                      borderRadius="10px"
                      style={{ borderStyle: 'dashed' }}
                    >
                      <FileUploadProduct onFileSelect={handleFileSelect} />
                    </Center>
                  ))}
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
                    setVariants((prevVariants) => [...prevVariants, newVariant])
                  }
                />
              </HStack>

              {variants.map((variant, variantIndex) => (
                <VStack
                  key={variantIndex}
                  gap="5px"
                  w="full"
                  align="flex-start"
                >
                  <HStack>
                    <Text fontWeight="600" fontSize="15px">
                      Variant: {variant.name}
                    </Text>
                    <Button
                      onClick={() => handleRemoveVariant(variantIndex)}
                      colorScheme="red"
                      size="xs"
                    >
                      Remove
                    </Button>
                  </HStack>
                  <HStack>
                    <Input
                      placeholder="Enter option..."
                      value={variantOptionInputs[variantIndex] || ''}
                      onChange={(e) =>
                        handleVariantOptionInputChange(
                          variantIndex,
                          e.target.value
                        )
                      }
                    />
                    <Button
                      onClick={() => handleAddVariantOption(variantIndex)}
                      colorScheme="blue"
                    >
                      Add Option
                    </Button>
                  </HStack>
                  <HStack align="flex-start">
                    {variantOptions[variantIndex]?.map((option) => (
                      <HStack key={option.variantId} spaceY={2}>
                        <Text fontSize="14px">{option.name}</Text>
                        <Button
                          onClick={() =>
                            handleRemoveVariantOption(
                              variantIndex,
                              option.variantId
                            )
                          }
                          colorScheme="red"
                          size="xs"
                        >
                          X
                        </Button>
                      </HStack>
                    ))}
                  </HStack>
                </VStack>
              ))}

              <VStack spaceY={2} align="flex-start" mt={4}>
                <Text fontWeight="700" fontSize="17px" color="#2400FE">
                  All Variant Options
                </Text>
                <Flex
                  bgColor="white"
                  w={'full'}
                  gap="10px"
                  borderRadius="10px"
                  align="flex-start"
                >
                  {Object.values(variantOptions)
                    .flat()
                    .map((option, index) => (
                      <Box
                        key={index}
                        borderWidth="1px"
                        borderRadius="md"
                        p={2}
                      >
                        <Text fontWeight={'bold'}>{option.name}</Text>
                      </Box>
                    ))}
                </Flex>
              </VStack>

              <VStack spaceY={2} align="flex-start" mt={4} w={'100%'}>
                {variants.length > 0 && (
                  <>
                    <Text fontWeight="700" fontSize="17px" color="#2400FE">
                      Variant Option Values
                    </Text>
                    {variantCombinations.length > 0 &&
                      variantCombinations.map((combination, index) => (
                        <Box
                          key={index}
                          bg={'green.100'}
                          borderWidth="1px"
                          borderRadius="md"
                          p={4}
                        >
                          <VStack align="flex-start">
                            <Text fontWeight={'bold'}>
                              Combination {index + 1}:{' '}
                              {combination
                                .map((opt: VariantOption) => opt.name)
                                .join(', ')}
                            </Text>
                            <HStack w={'full'} gap={5}>
                              <Flex w={'40%'} direction={'column'}>
                                <Text fontWeight="600" fontSize="15px">
                                  Price *
                                </Text>
                                <Input
                                  placeholder="Price"
                                  type="number"
                                  onChange={(e) => {
                                    const updatedValue = {
                                      price: Number(e.target.value),
                                      sku: '',
                                      stock: 0,
                                      weight: 0,
                                    };
                                    setVariantOptionValues((prev) => {
                                      const newValues = [...prev];
                                      newValues[index] = updatedValue;
                                      return newValues;
                                    });
                                  }}
                                />
                              </Flex>
                              <Flex w={'40%'} direction={'column'}>
                                <Text fontWeight="600" fontSize="15px">
                                  SKU *
                                </Text>
                                <Input
                                  placeholder="SKU"
                                  onChange={(e) => {
                                    const updatedValue = {
                                      ...variantOptionValues[index],
                                      sku: e.target.value,
                                    };
                                    setVariantOptionValues((prev) => {
                                      const newValues = [...prev];
                                      newValues[index] = updatedValue;
                                      return newValues;
                                    });
                                  }}
                                />
                              </Flex>
                            </HStack>
                            <HStack w={'full'} gap={5}>
                              <Flex w={'40%'} direction={'column'}>
                                <Text fontWeight="600" fontSize="15px">
                                  Product Stock *
                                </Text>
                                <Input
                                  placeholder="Stock"
                                  type="number"
                                  onChange={(e) => {
                                    const updatedValue = {
                                      ...variantOptionValues[index],
                                      stock: Number(e.target.value),
                                    };
                                    setVariantOptionValues((prev) => {
                                      const newValues = [...prev];
                                      newValues[index] = updatedValue;
                                      return newValues;
                                    });
                                  }}
                                />
                              </Flex>
                              <Flex w={'40%'} direction={'column'}>
                                <Text fontWeight="600" fontSize="15px">
                                  Product Weight *
                                </Text>
                                <Input
                                  placeholder="Weight"
                                  type="number"
                                  onChange={(e) => {
                                    const updatedValue = {
                                      ...variantOptionValues[index],
                                      weight: Number(e.target.value),
                                    };
                                    setVariantOptionValues((prev) => {
                                      const newValues = [...prev];
                                      newValues[index] = updatedValue;
                                      return newValues;
                                    });
                                  }}
                                />
                              </Flex>
                            </HStack>
                          </VStack>
                        </Box>
                      ))}
                  </>
                )}
              </VStack>
            </VStack>

            {variants.length === 0 && (
              <>
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
                      <Input
                        name="price"
                        borderLeftRadius="0"
                        placeholder="Harga produk ..."
                        onChange={handleChange}
                        value={formData.price}
                        type="number"
                      />
                    </Group>
                  </VStack>
                  <VStack gap="5px" w="full" align="flex-start">
                    <Text fontWeight="600" fontSize="15px">
                      Minimum Order
                    </Text>
                    <Group>
                      <Input
                        name="minimum_order"
                        placeholder="Jumlah produk ..."
                        borderRightRadius="0"
                        onChange={handleChange}
                        value={formData.minimum_order}
                        type="number"
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
                        <Input
                          name="stock"
                          placeholder="Stock"
                          onChange={handleChange}
                          value={formData.stock}
                          type="number"
                        />
                      </Group>
                    </VStack>
                    <VStack w="full" align="flex-start">
                      <Text fontWeight="600" fontSize="15px">
                        SKU (Stock Keeping Unit)
                      </Text>
                      <Group flex="1">
                        <Input
                          name="sku"
                          placeholder="Sku"
                          onChange={handleChange}
                          value={formData.sku}
                        />
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
                      <Input
                        name="weight"
                        borderLeftRadius="5px"
                        borderRightRadius="0"
                        onChange={handleChange}
                        value={formData.weight}
                        type="number"
                      />
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
                            name="length"
                            borderLeftRadius="5px"
                            borderRightRadius="0"
                            placeholder="Length"
                            onChange={handleChange}
                            value={formData.length}
                            type="number"
                          />
                          <InputAddon
                            borderLeftRadius="0"
                            borderRightRadius="5px"
                          >
                            cm
                          </InputAddon>
                        </Group>
                      </VStack>
                      <VStack w="full" align="flex-start">
                        <Group flex="1">
                          <Input
                            name="width"
                            borderLeftRadius="5px"
                            borderRightRadius="0"
                            placeholder="Width"
                            onChange={handleChange}
                            value={formData.width}
                            type="number"
                          />
                          <InputAddon
                            borderLeftRadius="0"
                            borderRightRadius="5px"
                          >
                            cm
                          </InputAddon>
                        </Group>
                      </VStack>
                      <VStack w="full" align="flex-start">
                        <Group flex="1">
                          <Input
                            name="height"
                            borderLeftRadius="5px"
                            borderRightRadius="0"
                            placeholder="Height"
                            onChange={handleChange}
                            value={formData.height}
                            type="number"
                          />
                          <InputAddon
                            borderLeftRadius="0"
                            borderRightRadius="5px"
                          >
                            cm
                          </InputAddon>
                        </Group>
                      </VStack>
                    </HStack>
                  </VStack>
                </VStack>
              </>
            )}

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
