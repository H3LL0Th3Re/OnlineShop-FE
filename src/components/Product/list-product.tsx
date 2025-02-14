import {
  Box,
  Button,
  createListCollection,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Stack,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { Switch } from '../ui/switch';
import { Link } from 'react-router';
import { LuUser } from 'react-icons/lu';
import { MdModeEditOutline, MdOutlineDelete } from 'react-icons/md';
import { Checkbox } from '../ui/checkbox';
import { DialogUpdatePrice } from './Dialog/dialog-update-price';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '../ui/select';
import { IoIosLink } from 'react-icons/io';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../ui/menu';

import { useAuthStore } from '@/hooks/authstore';
import { useFetchProductStore } from '../tanstack/useProduct';
import { DialogDeleteProduct } from './Dialog/dialog-delete-product';
import { useToggleActiveProduct } from '../tanstack/useToggleActiveProduct';
import { useDeleteProduct } from '../tanstack/useProduct';
import { useState } from 'react';
import { DialogVariants } from './Dialog/dialog-variants';
const categories = createListCollection({
  items: [
    { label: 'All', value: 'all' },
    { label: 'Men', value: 'Men' },
    { label: 'Accessories', value: 'Accessories' },
    { label: 'Shoes', value: 'Shoes' },
  ],
});

const sortbyOptions = createListCollection({
  items: [
    { label: 'Terakhir Diubah', value: 'terakhir-diubah' },
    { label: 'Harga Tertinggi', value: 'harga-tertinggi' },
    { label: 'Harga Terendah', value: 'harga-terendah' },
    { label: 'Stock Terbanyak', value: 'stock-terbanyak' },
    { label: 'Stock Sedikit', value: 'stock-sedikit' },
  ],
});

const ListProduct = () => {
  const token = useAuthStore((state) => state.token);
  const {
    data: products,
    isLoading,
    error,
  } = useFetchProductStore(token || '');
  const { mutate: toggleActive } = useToggleActiveProduct();
  const { mutate: deleteProducts } = useDeleteProduct(token || '');
  const [checkedProducts, setCheckedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log('Product Data:', products);

  const handleToggleActive = (productId: string) => {
    if (token) {
      toggleActive({ id: productId, token });
    }
  };

  const handleToggleAll = (isChecked: boolean) => {
    if (isChecked) {
      setCheckedProducts(
        products?.map((product) => product.id!).filter(Boolean) || []
      ); // Check all products
    } else {
      setCheckedProducts([]); // Uncheck all products
    }
  };

  const handleToggleProduct = (productId: string) => {
    setCheckedProducts(
      (prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId) // Uncheck the product
          : [...prev, productId] // Check the product
    );
  };

  const handleDeleteCheckedProducts = () => {
    checkedProducts.forEach((productId) => {
      deleteProducts(productId, {
        onSuccess: () => {
          setCheckedProducts([]);
        },
      });
    });
  };

  const handleToggleActiveCheckedProducts = () => {
    checkedProducts.forEach((productId) => {
      if (products && products.find((p) => p.id === productId)) {
        toggleActive({ id: productId, token: token || '' });
      }
    });
    setCheckedProducts([]); // Clear checked products after toggling
  };

  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.variants?.[0]?.Variant_options?.[0]?.Variant_option_values?.[0]?.sku
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* ListProduct Content */}
      <Box bg={'white'} p={3}>
        <Flex justify="space-between" align="center">
          <Text fontSize="2xl" fontWeight="bold" color="#5F2EEA">
            List Product
          </Text>
          <Box bg="#5F2EEA" p={1} rounded={'full'} w={32}>
            <Link to={'/add-product'}>
              <Text color={'white'} textAlign={'center'}>
                {' '}
                Add Product{' '}
              </Text>
            </Link>
          </Box>
        </Flex>

        <Tabs.Root defaultValue="semua">
          <Tabs.List>
            <Tabs.Trigger value="semua">
              <LuUser />
              Semua
            </Tabs.Trigger>
            <Tabs.Trigger value="aktif">
              <Box bg={'#5F2EEA'} w={5} rounded={'full'} color={'white'}>
                {products?.filter((s) => s.is_active === true).length}
              </Box>
              Aktif
            </Tabs.Trigger>
            <Tabs.Trigger value="nonaktif">
              <Box bg={'#5F2EEA'} w={5} rounded={'full'} color={'white'}>
                {products?.filter((s) => s.is_active === false).length}
              </Box>
              Nonaktif
            </Tabs.Trigger>
          </Tabs.List>
          <Flex mb="4" gap="4" pt={3} justifyContent={'space-between'}>
            <Input
              placeholder="Cari Pesanan"
              w={'50%'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SelectRoot
              multiple
              collection={categories}
              size="sm"
              width="320px"
            >
              <SelectTrigger>
                <SelectValueText placeholder="All Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.items.map((category) => (
                  <SelectItem item={category} key={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
            <SelectRoot collection={sortbyOptions} size="sm" width="320px">
              <SelectTrigger>
                <SelectValueText placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                {sortbyOptions.items.map((sort) => (
                  <SelectItem item={sort} key={sort.value}>
                    {sort.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Flex>
          <Tabs.Content value="semua">
            <Box border="1px" borderColor="gray.200" rounded="md">
              <Flex align={'center'} justify={'space-between'}>
                <Box>
                  <Text fontWeight={'medium'} fontSize={'2xl'} p={2}>
                    {products?.length} Product
                  </Text>
                </Box>
                <Flex align={'center'} gap={2}>
                  <Button
                    w={'0'}
                    bg={'white'}
                    rounded={'full'}
                    borderWidth={'1px'}
                    borderColor={'black'}
                    onClick={handleDeleteCheckedProducts}
                    colorScheme="red"
                    disabled={checkedProducts.length === 0}
                  >
                    <Icon size={'lg'} color={'black'}>
                      <MdOutlineDelete />
                    </Icon>
                  </Button>
                  <Box>
                    <Button
                      borderWidth={'1px'}
                      rounded={'full'}
                      borderColor={'black'}
                      bg={'white'}
                      color={'black'}
                      h={9}
                      onClick={handleToggleActiveCheckedProducts}
                      disabled={
                        checkedProducts.length === 0 ||
                        (checkedProducts.length > 1 &&
                          checkedProducts.some(
                            (id) =>
                              products?.find((p) => p.id === id)?.is_active
                          ) &&
                          checkedProducts.some(
                            (id) =>
                              !products?.find((p) => p.id === id)?.is_active
                          ))
                      }
                    >
                      {checkedProducts.length === 0
                        ? 'Nonaktifkan Produk'
                        : checkedProducts.every(
                              (id) =>
                                products?.find((p) => p.id === id)?.is_active
                            )
                          ? 'Nonaktifkan Produk'
                          : checkedProducts.every(
                                (id) =>
                                  !products?.find((p) => p.id === id)?.is_active
                              )
                            ? 'Aktifkan Produk'
                            : 'Nonaktifkan Produk'}
                    </Button>
                  </Box>
                  <Flex gap={2}>
                    <Checkbox
                      checked={checkedProducts.length === products?.length} // Check if all products are checked
                      onChange={(e) =>
                        handleToggleAll((e.target as HTMLInputElement).checked)
                      } // Handle master checkbox
                    >
                      Pilih Semua
                    </Checkbox>
                  </Flex>
                </Flex>
              </Flex>
              <Stack gap="4">
                {filteredProducts?.map((product) => (
                  <Flex
                    key={product.id}
                    p="4"
                    borderWidth="1px"
                    borderColor="gray.200"
                    rounded="md"
                  >
                    <Box bg={'black'} rounded="md">
                      <Image
                        src={
                          Array.isArray(product.attachments) &&
                          product.attachments.length > 0
                            ? typeof product.attachments[0] === 'string'
                              ? product.attachments[0]
                              : URL.createObjectURL(product.attachments[0])
                            : ''
                        }
                        alt={product.name}
                        w={'28'}
                      />
                    </Box>
                    <Flex direction={'column'} pl={5} w={'full'}>
                      <Box>
                        <Flex justify={'space-between'}>
                          <Text fontWeight="bold">
                            {product.name}
                            {/* {product.variants?.[0]?.Variant_options?.[0]
                              ?.name || 'No Variant'} */}
                          </Text>
                          <Checkbox
                            checked={checkedProducts.includes(product.id || '')}
                            onChange={() =>
                              handleToggleProduct(product.id || '')
                            }
                          />
                        </Flex>
                        {product.variants?.length === 0 && (
                          <Text fontSize="sm" color="gray.600">
                            Rp{' '}
                            {product.variants?.[0]?.Variant_options?.[0]
                              ?.Variant_option_values?.[0]?.price ||
                              product.price}{' '}
                            - Stock:{' '}
                            {product.variants?.[0]?.Variant_options?.[0]
                              ?.Variant_option_values?.[0]?.stock ||
                              product.stock}{' '}
                            - SKU:{' '}
                            {product.variants?.[0]?.Variant_options?.[0]
                              ?.Variant_option_values?.[0]?.sku || product.sku}
                          </Text>
                        )}
                      </Box>
                      <Flex
                        align="center"
                        justify="space-between"
                        w={'full'}
                        mt={3}
                      >
                        <HStack>
                          <Button
                            size="xs"
                            rounded={'full'}
                            bg="white"
                            color={'black'}
                            borderWidth={'1px'}
                            borderColor={'black'}
                            h={7}
                          >
                            <Text>
                              <DialogUpdatePrice />
                            </Text>
                          </Button>
                          <Button
                            size="xs"
                            rounded={'full'}
                            bg="white"
                            color={'black'}
                            borderWidth={'1px'}
                            borderColor={'black'}
                            p={1}
                            h={7}
                          >
                            <Link to={'/checkout-product'}>
                              <Icon>
                                <IoIosLink />
                              </Icon>
                              Lihat Halaman
                            </Link>
                          </Button>
                          {product.variants &&
                            product.variants.length > 0 &&
                            product.id && (
                              <DialogVariants productId={product.id} />
                            )}
                          <MenuRoot>
                            <MenuTrigger asChild>
                              <Button
                                size="xs"
                                rounded={'full'}
                                bg="white"
                                color={'black'}
                                borderWidth={'1px'}
                                borderColor={'black'}
                                p={1}
                                h={7}
                              >
                                <Icon>
                                  <HiDotsHorizontal />
                                </Icon>
                              </Button>
                            </MenuTrigger>
                            <MenuContent>
                              <MenuItem value="new-txt">
                                <HStack>
                                  <Icon size={'sm'} color={'black'}>
                                    <MdModeEditOutline />
                                  </Icon>
                                  <Text>Edit Product</Text>
                                </HStack>
                              </MenuItem>
                              <MenuItem value="new-file">
                                <HStack>
                                  <DialogDeleteProduct
                                    productId={product.id || ''}
                                    productName={product.name || ''}
                                  />
                                </HStack>
                              </MenuItem>
                            </MenuContent>
                          </MenuRoot>
                        </HStack>
                        <Switch
                          colorScheme="blue"
                          checked={product.is_active || false} // Assuming is_active is a boolean in your product
                          onChange={() => handleToggleActive(product.id!)}
                        />
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </Stack>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="aktif">
            <Box border="1px" borderColor="gray.200" rounded="md">
              <Flex align={'center'} justify={'space-between'}>
                <Box>
                  <Text fontWeight={'medium'} fontSize={'2xl'} p={2}>
                    {
                      filteredProducts?.filter((s) => s.is_active === true)
                        .length
                    }{' '}
                    Product
                  </Text>
                </Box>
                <Flex align={'center'} gap={2}>
                  <Button
                    w={'0'}
                    bg={'white'}
                    rounded={'full'}
                    borderWidth={'1px'}
                    borderColor={'black'}
                    onClick={handleDeleteCheckedProducts}
                    colorScheme="red"
                    disabled={checkedProducts.length === 0}
                  >
                    <Icon size={'lg'} color={'black'}>
                      <MdOutlineDelete />
                    </Icon>
                  </Button>
                  <Box>
                    <Button
                      borderWidth={'1px'}
                      rounded={'full'}
                      borderColor={'black'}
                      bg={'white'}
                      color={'black'}
                      h={9}
                      onClick={handleToggleActiveCheckedProducts}
                      disabled={
                        checkedProducts.length === 0 ||
                        (checkedProducts.length > 1 &&
                          checkedProducts.some(
                            (id) =>
                              products?.find((p) => p.id === id)?.is_active
                          ) &&
                          checkedProducts.some(
                            (id) =>
                              !products?.find((p) => p.id === id)?.is_active
                          ))
                      }
                    >
                      {checkedProducts.length === 0
                        ? 'Nonaktifkan Produk'
                        : checkedProducts.every(
                              (id) =>
                                products?.find((p) => p.id === id)?.is_active
                            )
                          ? 'Nonaktifkan Produk'
                          : checkedProducts.every(
                                (id) =>
                                  !products?.find((p) => p.id === id)?.is_active
                              )
                            ? 'Aktifkan Produk'
                            : 'Nonaktifkan Produk'}
                    </Button>
                  </Box>
                  <Flex gap={2}>
                    <Checkbox
                      checked={checkedProducts.length === products?.length} // Check if all products are checked
                      onChange={(e) =>
                        handleToggleAll((e.target as HTMLInputElement).checked)
                      } // Handle master checkbox
                    >
                      Pilih Semua
                    </Checkbox>
                  </Flex>
                </Flex>
              </Flex>
              <Stack gap="4">
                {filteredProducts
                  ?.filter((product) => product.is_active === true)
                  .map((product) => (
                    <Flex
                      key={product.id}
                      p="4"
                      borderWidth="1px"
                      borderColor="gray.200"
                      rounded="md"
                    >
                      <Box bg={'black'} rounded="md">
                        <Image
                          src={
                            Array.isArray(product.attachments) &&
                            product.attachments.length > 0
                              ? typeof product.attachments[0] === 'string'
                                ? product.attachments[0]
                                : URL.createObjectURL(product.attachments[0])
                              : ''
                          }
                          alt={product.name}
                          w={'28'}
                        />
                      </Box>
                      <Flex direction={'column'} pl={5} w={'full'}>
                        <Box>
                          <Flex justify={'space-between'}>
                            <Text fontWeight="bold">
                              {product.name} -{' '}
                              {product.variants?.[0]?.Variant_options?.[0]
                                ?.name || 'No Variant'}
                            </Text>
                            <Checkbox
                              checked={checkedProducts.includes(
                                product.id || ''
                              )} // Check if this product is checked
                              onChange={() =>
                                handleToggleProduct(product.id || '')
                              } // Handle individual checkbox
                            />
                          </Flex>
                          {product.variants?.length === 0 && (
                            <Text fontSize="sm" color="gray.600">
                              Rp{' '}
                              {product.variants?.[0]?.Variant_options?.[0]
                                ?.Variant_option_values?.[0]?.price ||
                                product.price}{' '}
                              - Stock:{' '}
                              {product.variants?.[0]?.Variant_options?.[0]
                                ?.Variant_option_values?.[0]?.stock ||
                                product.stock}{' '}
                              - SKU:{' '}
                              {product.variants?.[0]?.Variant_options?.[0]
                                ?.Variant_option_values?.[0]?.sku ||
                                product.sku}
                            </Text>
                          )}
                        </Box>
                        <Flex
                          align="center"
                          justify="space-between"
                          w={'full'}
                          mt={3}
                        >
                          <HStack>
                            <Button
                              size="xs"
                              rounded={'full'}
                              bg="white"
                              color={'black'}
                              borderWidth={'1px'}
                              borderColor={'black'}
                              h={7}
                            >
                              <Text>
                                <DialogUpdatePrice />
                              </Text>
                            </Button>
                            <Button
                              size="xs"
                              rounded={'full'}
                              bg="white"
                              color={'black'}
                              borderWidth={'1px'}
                              borderColor={'black'}
                              p={1}
                              h={7}
                            >
                              <Link to={'/checkout-product'}>
                                <Icon>
                                  <IoIosLink />
                                </Icon>
                                Lihat Halaman
                              </Link>
                            </Button>
                            {product.variants &&
                              product.variants.length > 0 &&
                              product.id && (
                                <DialogVariants productId={product.id} />
                              )}
                            <MenuRoot>
                              <MenuTrigger asChild>
                                <Button
                                  size="xs"
                                  rounded={'full'}
                                  bg="white"
                                  color={'black'}
                                  borderWidth={'1px'}
                                  borderColor={'black'}
                                  p={1}
                                  h={7}
                                >
                                  <Icon>
                                    <HiDotsHorizontal />
                                  </Icon>
                                </Button>
                              </MenuTrigger>
                              <MenuContent>
                                <MenuItem value="new-txt">
                                  <HStack>
                                    <Icon size={'sm'} color={'black'}>
                                      <MdModeEditOutline />
                                    </Icon>
                                    <Text>Edit Product</Text>
                                  </HStack>
                                </MenuItem>
                                <MenuItem value="new-file">
                                  <HStack>
                                    <DialogDeleteProduct
                                      productId={product.id || ''}
                                      productName={product.name || ''}
                                    />
                                  </HStack>
                                </MenuItem>
                              </MenuContent>
                            </MenuRoot>
                          </HStack>
                          <Switch
                            colorScheme="blue"
                            checked={product.is_active || false} // Assuming is_active is a boolean in your product
                            onChange={() => handleToggleActive(product.id!)}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  ))}
              </Stack>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="nonaktif">
            <Box border="1px" borderColor="gray.200" rounded="md">
              <Flex align={'center'} justify={'space-between'}>
                <Box>
                  <Text fontWeight={'medium'} fontSize={'2xl'} p={2}>
                    {
                      filteredProducts?.filter((s) => s.is_active === false)
                        .length
                    }{' '}
                    Product
                  </Text>
                </Box>
                <Flex align={'center'} gap={2}>
                  <Button
                    w={'0'}
                    bg={'white'}
                    rounded={'full'}
                    borderWidth={'1px'}
                    borderColor={'black'}
                    onClick={handleDeleteCheckedProducts}
                    colorScheme="red"
                    disabled={checkedProducts.length === 0}
                  >
                    <Icon size={'lg'} color={'black'}>
                      <MdOutlineDelete />
                    </Icon>
                  </Button>
                  <Box>
                    <Button
                      borderWidth={'1px'}
                      rounded={'full'}
                      borderColor={'black'}
                      bg={'white'}
                      color={'black'}
                      h={9}
                      onClick={handleToggleActiveCheckedProducts}
                      disabled={
                        checkedProducts.length === 0 ||
                        (checkedProducts.length > 1 &&
                          checkedProducts.some(
                            (id) =>
                              products?.find((p) => p.id === id)?.is_active
                          ) &&
                          checkedProducts.some(
                            (id) =>
                              !products?.find((p) => p.id === id)?.is_active
                          ))
                      }
                    >
                      {checkedProducts.length === 0
                        ? 'Nonaktifkan Produk'
                        : checkedProducts.every(
                              (id) =>
                                products?.find((p) => p.id === id)?.is_active
                            )
                          ? 'Nonaktifkan Produk'
                          : checkedProducts.every(
                                (id) =>
                                  !products?.find((p) => p.id === id)?.is_active
                              )
                            ? 'Aktifkan Produk'
                            : 'Nonaktifkan Produk'}
                    </Button>
                  </Box>
                  <Flex gap={2}>
                    <Checkbox
                      checked={checkedProducts.length === products?.length} // Check if all products are checked
                      onChange={(e) =>
                        handleToggleAll((e.target as HTMLInputElement).checked)
                      } // Handle master checkbox
                    >
                      Pilih Semua
                    </Checkbox>
                  </Flex>
                </Flex>
              </Flex>
              <Stack gap="4">
                {filteredProducts
                  ?.filter((product) => product.is_active === false)
                  .map((product) => (
                    <Flex
                      key={product.id}
                      p="4"
                      borderWidth="1px"
                      borderColor="gray.200"
                      rounded="md"
                    >
                      <Box bg={'black'} rounded="md">
                        <Image
                          src={
                            Array.isArray(product.attachments) &&
                            product.attachments.length > 0
                              ? typeof product.attachments[0] === 'string'
                                ? product.attachments[0]
                                : URL.createObjectURL(product.attachments[0])
                              : ''
                          }
                          alt={product.name}
                          w={'28'}
                        />
                      </Box>
                      <Flex direction={'column'} pl={5} w={'full'}>
                        <Box>
                          <Flex justify={'space-between'}>
                            <Text fontWeight="bold">
                              {product.name} -{' '}
                              {product.variants?.[0]?.Variant_options?.[0]
                                ?.name || 'No Variant'}
                            </Text>
                            <Checkbox
                              checked={checkedProducts.includes(
                                product.id || ''
                              )} // Check if this product is checked
                              onChange={() =>
                                handleToggleProduct(product.id || '')
                              } // Handle individual checkbox
                            />
                          </Flex>
                          {product.variants?.length === 0 && (
                            <Text fontSize="sm" color="gray.600">
                              Rp{' '}
                              {product.variants?.[0]?.Variant_options?.[0]
                                ?.Variant_option_values?.[0]?.price ||
                                product.price}{' '}
                              - Stock:{' '}
                              {product.variants?.[0]?.Variant_options?.[0]
                                ?.Variant_option_values?.[0]?.stock ||
                                product.stock}{' '}
                              - SKU:{' '}
                              {product.variants?.[0]?.Variant_options?.[0]
                                ?.Variant_option_values?.[0]?.sku ||
                                product.sku}
                            </Text>
                          )}
                        </Box>
                        <Flex
                          align="center"
                          justify="space-between"
                          w={'full'}
                          mt={3}
                        >
                          <HStack>
                            <Button
                              size="xs"
                              rounded={'full'}
                              bg="white"
                              color={'black'}
                              borderWidth={'1px'}
                              borderColor={'black'}
                              h={7}
                            >
                              <Text>
                                <DialogUpdatePrice />
                              </Text>
                            </Button>
                            <Button
                              size="xs"
                              rounded={'full'}
                              bg="white"
                              color={'black'}
                              borderWidth={'1px'}
                              borderColor={'black'}
                              p={1}
                              h={7}
                            >
                              <Link to={'/checkout-product'}>
                                <Icon>
                                  <IoIosLink />
                                </Icon>
                                Lihat Halaman
                              </Link>
                            </Button>
                            {product.variants &&
                              product.variants.length > 0 &&
                              product.id && (
                                <DialogVariants productId={product.id} />
                              )}
                            <MenuRoot>
                              <MenuTrigger asChild>
                                <Button
                                  size="xs"
                                  rounded={'full'}
                                  bg="white"
                                  color={'black'}
                                  borderWidth={'1px'}
                                  borderColor={'black'}
                                  p={1}
                                  h={7}
                                >
                                  <Icon>
                                    <HiDotsHorizontal />
                                  </Icon>
                                </Button>
                              </MenuTrigger>
                              <MenuContent>
                                <MenuItem value="new-txt">
                                  <HStack>
                                    <Icon size={'sm'} color={'black'}>
                                      <MdModeEditOutline />
                                    </Icon>
                                    <Text>Edit Product</Text>
                                  </HStack>
                                </MenuItem>
                                <MenuItem value="new-file">
                                  <HStack>
                                    <DialogDeleteProduct
                                      productId={product.id || ''}
                                      productName={product.name || ''}
                                    />
                                  </HStack>
                                </MenuItem>
                              </MenuContent>
                            </MenuRoot>
                          </HStack>
                          <Switch
                            colorScheme="blue"
                            checked={product.is_active || false} // Assuming is_active is a boolean in your product
                            onChange={() => handleToggleActive(product.id!)}
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  ))}
              </Stack>
            </Box>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Box>
  );
};

export default ListProduct;
