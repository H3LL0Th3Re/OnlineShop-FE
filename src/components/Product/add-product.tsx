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
import { Variant, Variant_option_values } from '@/types/product-type';
import cuid from 'cuid';
import { IoClose } from 'react-icons/io5';

interface VariantOption {
  id: string;
  name: string;
}

function AddProduct() {
  const { token } = useAuthStore();
  const createProductMutation = useCreateProduct(token || '');
  const createVariantMutation = useCreateVariant(token || '');
  const createVariantOptionMutation = useCreateVariantOptions();
  const createVariantOptionValueMutation = useCreateVariantOptionValue();

  const [formData, setFormData] = useState({
    name: '',
    url: '',
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
    {
      id: string;
      name: string;
      variantId: string;
    }[][]
  >([]);
  const [variantOptionValues, setVariantOptionValues] = useState<
    { price: number; sku: string; stock: number; weight: number }[]
  >([]);
  const [variantOptionInputs, setVariantOptionInputs] = useState<string[]>([]);
  const [variantCombinations, setVariantCombinations] = useState<
    VariantOption[][]
  >([]);

  useEffect(() => {
    // Pastikan variantOptionValues memiliki panjang sesuai jumlah kombinasi
    if (variantOptionValues.length !== variantCombinations.length) {
      setVariantOptionValues(
        variantCombinations.map(() => ({
          price: 0,
          sku: '',
          stock: 0,
          weight: 0,
        }))
      );
    }
  }, [variantCombinations]);

  const handleCategorySelect = (categoryId: string) => {
    setFormData({
      ...formData,
      categoryIds: [categoryId],
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Jika field yang diubah adalah nama produk, update URL secara otomatis
    if (name === 'name') {
      const formattedUrl = value
        .toLowerCase()
        .replace(/\s+/g, '-') // Ganti spasi dengan dash
        .replace(/[^a-z0-9-]/g, ''); // Hapus karakter yang tidak valid
      setFormData({ ...formData, [name]: value, url: formattedUrl });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileSelect = (files: File[]) => {
    setAttachments((prev) => [...prev, ...files]);
  };

  function generateCombinations<T>(arrays: T[][]): T[][] {
    return arrays.reduce<T[][]>(
      (acc, curr) => acc.flatMap((a) => curr.map((b) => [...a, b] as T[])),
      [[]] as T[][]
    );
  }

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

      Swal.fire({
        title: 'Sedang memproses...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Buat produk terlebih dahulu
      const productResponse = await createProductMutation.mutateAsync({
        ...formData,
        attachments,
      });

      if (!productResponse || !productResponse.id) {
        throw new Error('Gagal mendapatkan ID produk');
      }

      // Jika tidak ada varian, langsung selesai
      if (variants.length === 0) {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Produk berhasil dibuat',
          showConfirmButton: false,
          timer: 1500,
        });
        // Reset form
        resetForm();
        return;
      }

      // Proses untuk varian dan opsi varian
      const createdVariantOptions: Record<string, VariantOption[]> = {};

      for (
        let variantIndex = 0;
        variantIndex < variants.length;
        variantIndex++
      ) {
        const variant = variants[variantIndex];

        const variantResponse = await createVariantMutation.mutateAsync({
          productId: productResponse.id,
          data: { ...variant },
        });

        if (!variantResponse || !variantResponse.variant.id) {
          throw new Error('Gagal mendapatkan ID varian');
        }

        const variantId = variantResponse.variant.id;

        if (
          variantOptions[variantIndex] &&
          variantOptions[variantIndex].length > 0
        ) {
          const createdOptions = await Promise.all(
            variantOptions[variantIndex].map(async (option) => {
              const variantOptionResponse =
                await createVariantOptionMutation.mutateAsync({
                  token,
                  variantOptionsData: {
                    name: option.name,
                    variantId: variantId,
                    values: [],
                  },
                });

              if (!variantOptionResponse || !variantOptionResponse.id) {
                throw new Error('Gagal mendapatkan ID opsi varian');
              }

              return {
                id: variantOptionResponse.id,
                name: option.name,
                variantId: variantId,
              };
            })
          );

          createdVariantOptions[variantId] = createdOptions;
        }
      }

      // Proses untuk variantOptionValues
      const allVariantOptions = Object.values(createdVariantOptions);
      const allCombinations = generateCombinations(
        allVariantOptions.map((options) => options.map((opt) => opt.id))
      );

      const variantOptionValuesToSend: Variant_option_values[] =
        allCombinations.map((variantOptionIds, index) => {
          const value = variantOptionValues[index];

          if (
            !value ||
            !value.sku ||
            !value.weight ||
            !value.stock ||
            !value.price
          ) {
            throw new Error(
              `Semua field opsi varian untuk kombinasi ke-${index + 1} harus diisi`
            );
          }

          return {
            sku: value.sku,
            weight: value.weight,
            stock: value.stock,
            price: value.price,
            is_active: true,
            variant_optionsId: variantOptionIds,
          };
        });

      await createVariantOptionValueMutation.mutateAsync({
        token,
        data: variantOptionValuesToSend,
      });

      // Sukses
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Produk berhasil dibuat',
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form
      resetForm();
    } catch (error) {
      console.error('Error creating product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: error instanceof Error ? error.message : 'Gagal membuat produk',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      url: '',
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
    setVariantOptions([]);
    setVariantOptionValues([]);
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

        const variantId = variants[variantIndex]?.id || '';

        if (
          !updatedOptions[variantIndex].some(
            (option) => option.name === optionName
          )
        ) {
          updatedOptions[variantIndex].push({
            id: cuid(),
            name: optionName,
            variantId: variantId,
          });
        }
        return updatedOptions;
      });

      // Reset input setelah menambahkan opsi
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
      const updatedOptions = [...prev];
      updatedOptions[variantIndex] = updatedOptions[variantIndex].filter(
        (option) => option.variantId !== variantId
      );
      return updatedOptions;
    });

    // Hapus kombinasi varian yang terkait dengan opsi yang dihapus
    setVariantCombinations((prev) => {
      const updatedCombinations = prev.filter((combination) => {
        return !combination.some((option) => option.id === variantId);
      });
      return updatedCombinations;
    });
  };

  useEffect(() => {
    if (variantOptions.length > 0) {
      generateVariantCombinations();
    } else {
      setVariantCombinations([]); // Reset kombinasi jika tidak ada opsi
    }
  }, [variantOptions]);

  const handleRemoveVariant = (index: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
    setVariantOptions((prev) => {
      const newOptions = [...prev];
      newOptions.splice(index, 1); // Remove options for the variant being deleted
      return newOptions;
    });
  };

  const generateVariantCombinations = () => {
    if (variantOptions.length === 0) {
      setVariantCombinations([]);
      return;
    }

    const combinations: VariantOption[][] = [];
    const generate = (currentCombination: VariantOption[], index: number) => {
      if (index === variantOptions.length) {
        combinations.push([...currentCombination]);
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
    } else {
      setVariantCombinations([]); // Reset kombinasi jika tidak ada opsi
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
              <Text fontWeight="700" fontSize="17px" color="#5F2EEA">
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
                <Input
                  placeholder="Enter your URL"
                  onChange={handleChange}
                  value={formData.url}
                />
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
              <Text fontWeight="700" fontSize="17px" color="#5F2EEA">
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
              <Text fontWeight="700" fontSize="17px" color="#5F2EEA">
                Product Variant
              </Text>
              <HStack
                gap="5px"
                w="full"
                align="flex-start"
                display={'flex'}
                justifyContent={'space-between'}
              >
                <Text fontWeight="600" fontSize="15px">
                  Add variants so buyers can choose the right product, come
                  on!{' '}
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
                      bgColor="#5F2EEA"
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
                      bgColor="#5F2EEA"
                    >
                      Add Option
                    </Button>
                  </HStack>
                  <HStack
                    align="flex-start"
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    {variantOptions[variantIndex]?.map((option) => (
                      <HStack key={option.variantId}>
                        <Text fontSize="14px">{option.name}</Text>
                        <Button
                          bg={'red'}
                          borderRadius={'full'}
                          size={'2xs'}
                          onClick={() =>
                            handleRemoveVariantOption(
                              variantIndex,
                              option.variantId
                            )
                          }
                        >
                          <IoClose />
                        </Button>
                      </HStack>
                    ))}
                  </HStack>
                </VStack>
              ))}

              <VStack spaceY={2} align="flex-start" mt={4}>
                <Text fontWeight="700" fontSize="17px" color="#5F2EEA">
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
                    <Text fontWeight="700" fontSize="17px" color="#5F2EEA">
                      Variant Option Values
                    </Text>
                    {variantCombinations.length > 0 &&
                      variantCombinations.map((combination, index) => (
                        <Box
                          key={index}
                          borderWidth="1px"
                          borderRadius="md"
                          width={'full'}
                          p={4}
                        >
                          <VStack align="flex-start">
                            <Text fontWeight={'bold'}>
                              Variant:{' '}
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
                                  value={
                                    variantOptionValues[index]?.price || ''
                                  }
                                  onChange={(e) => {
                                    setVariantOptionValues((prev) => {
                                      const newValues = [...prev];
                                      newValues[index] = {
                                        ...newValues[index],
                                        price: Number(e.target.value),
                                      };
                                      return [...newValues];
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
                                  value={variantOptionValues[index]?.sku || ''}
                                  onChange={(e) => {
                                    setVariantOptionValues((prev) => {
                                      const newValues = [...prev];
                                      newValues[index] = {
                                        ...newValues[index],
                                        sku: e.target.value,
                                      };
                                      return [...newValues];
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
                                  value={
                                    variantOptionValues[index]?.stock || ''
                                  }
                                  onChange={(e) => {
                                    setVariantOptionValues((prev) => {
                                      const newValues = [...prev];
                                      newValues[index] = {
                                        ...newValues[index],
                                        stock: Number(e.target.value),
                                      };
                                      return [...newValues];
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
                                  value={
                                    variantOptionValues[index]?.weight || ''
                                  }
                                  onChange={(e) => {
                                    setVariantOptionValues((prev) => {
                                      const newValues = [...prev];
                                      newValues[index] = {
                                        ...newValues[index],
                                        weight: Number(e.target.value),
                                      };
                                      return [...newValues];
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
                  <Text fontWeight="700" fontSize="17px" color="#5F2EEA">
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
                  <Text fontWeight="700" fontSize="17px" color="#5F2EEA">
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
                  <Text fontWeight="700" fontSize="17px" color="#5F2EEA">
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
                      Product Dimensions
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
                <Button bgColor="#5F2EEA" color="white" type="submit">
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
