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
  Strong,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { Switch } from './ui/switch';
import { Link } from 'react-router';
import { LuUser } from 'react-icons/lu';
import { MdModeEditOutline, MdOutlineDelete } from 'react-icons/md';
import { Checkbox } from './ui/checkbox';
import { DialogUpdatePrice } from './dialog-update-price';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from './ui/select';
import { useState } from 'react';
import { IoIosLink } from 'react-icons/io';
import { HiDotsHorizontal } from 'react-icons/hi';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from './ui/menu';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface Product {
  id: number;
  name: string;
  category: string;
  variant: string;
  sku: string;
  productImage: string;
  quantity: number;
  price: number;
  status: boolean;
}

const product: Product[] = [
  {
    id: 1,
    name: 'KAOS BASIC COTTON KENARI',
    category: 'Men',
    variant: 'Navy',
    sku: '01234XY1',
    productImage:
      'https://ecs7.tokopedia.net/img/product-1/2015/8/30/574846/574846_bc62bae2-ce97-489d-bfcc-4c14ec8d7ec1.jpg',
    quantity: 1,
    price: 120000,
    status: true,
  },
  {
    id: 2,
    name: 'HOODIE OVERSIZE UNISEX',
    category: 'Men',
    variant: 'Black',
    sku: '01234HSU1',
    productImage:
      'https://patience-pno.com/cdn/shop/files/4b330d93b1504f2489eb8689d8d48457.png?v=1726327535',
    quantity: 2,
    price: 165000,
    status: true,
  },
  {
    id: 3,
    name: 'TAS SELEMPANG CASUAL',
    category: 'Accessories',
    variant: 'Black',
    sku: '01234TSC1',
    productImage:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/MTA-74073081/fourtyfour_fourtyfour_airfox_2-0_-_tas_selempang_pria_wanita_casual_fourtyfour_airfox_2-0-_slingbag_casual_pria_wanita_fourtyfour_airfox_2-0_full02_pfujrz85.jpg',
    quantity: 1,
    price: 90000,
    status: false,
  },
  {
    id: 4,
    name: 'SEPATU SNEAKERS PRIA',
    variant: 'Black',
    category: 'Shoes',
    sku: '01234TSNP1',
    productImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1H6fQs2LSN-mg4s7FnLRPSuiukA1bVg9iTw&s',
    quantity: 1,
    price: 250000,
    status: true,
  },
  {
    id: 5,
    name: 'JAKET PARKA PRIA',
    variant: 'Green Armmy',
    category: 'Men',
    sku: '01234TJPP1',
    productImage:
      'https://admincerdas.s3.ap-southeast-1.amazonaws.com/20200725/w768_1595652429_414897705--1591464448-BKR107-armykombinasi-OneSize2.jpeg',
    quantity: 1,
    price: 150000,
    status: false,
  },
];

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'all',
  ]);
  const [sortBy, setSortBy] = useState<string>('terakhir-diubah');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = product.filter((p) => {
    if (selectedCategories.includes('all')) return true;
    return selectedCategories.includes(p.category);
  });

  const handleCategoryChange = (values: string[]) => {
    setSelectedCategories(values.length ? values : ['all']);
  };

  const sortProducts = (products: Product[], sortBy: string) => {
    switch (sortBy) {
      case 'harga-tertinggi':
        return [...products].sort((a, b) => b.price - a.price);
      case 'harga-terendah':
        return [...products].sort((a, b) => a.price - b.price);
      case 'stock-terbanyak':
        return [...products].sort((a, b) => b.quantity - a.quantity);
      case 'stock-sedikit':
        return [...products].sort((a, b) => a.quantity - b.quantity);
      case 'terakhir-diubah':
      default:
        return products;
    }
  };

  const filterProductsBySearch = (products: Product[], query: string) => {
    if (!query) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.sku.toLowerCase().includes(query.toLowerCase())
    );
  };

  const sortedProducts = sortProducts(filteredProducts, sortBy);
  const searchedProducts = filterProductsBySearch(sortedProducts, searchQuery);

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
                {searchedProducts.filter((s) => s.status === true).length}
              </Box>
              Aktif
            </Tabs.Trigger>
            <Tabs.Trigger value="nonaktif">
              <Box bg={'#5F2EEA'} w={5} rounded={'full'} color={'white'}>
                {searchedProducts.filter((s) => s.status === false).length}
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
              onValueChange={(details) => {
                const selectedCategories = Array.isArray(details.value)
                  ? details.value
                  : [details.value];
                handleCategoryChange(selectedCategories);
              }}
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
            <SelectRoot
              collection={sortbyOptions}
              size="sm"
              width="320px"
              onValueChange={(details) => {
                const selectedSortBy = Array.isArray(details.value)
                  ? details.value[0]
                  : details.value;
                setSortBy(selectedSortBy);
              }}
            >
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
                    {searchedProducts.length} Product
                  </Text>
                </Box>
                <Flex align={'center'} gap={2}>
                  <Button
                    w={'0'}
                    bg={'white'}
                    rounded={'full'}
                    borderWidth={'1px'}
                    borderColor={'black'}
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
                    >
                      Nonaktifkan Produk
                    </Button>
                  </Box>
                  <Flex gap={2}>
                    Pilih Semua
                    <Checkbox />
                  </Flex>
                </Flex>
              </Flex>
              <Stack gap="4">
                {searchedProducts.map((products, i) => (
                  <Flex
                    key={i}
                    p="4"
                    borderWidth="1px"
                    borderColor="gray.200"
                    rounded="md"
                  >
                    <Box bg={'black'} rounded="md">
                      <Image
                        src={products.productImage}
                        alt={products.variant}
                        w={'28'}
                      />
                    </Box>
                    <Flex direction={'column'} pl={5} w={'full'}>
                      <Box>
                        <Text fontWeight="bold">
                          {products.name} - {products.variant}
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Rp{products.price} - Stock: {products.quantity} - SKU:{' '}
                          {products.sku}
                        </Text>
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
                            <Link to={''}>
                              <Icon>
                                <IoIosLink />
                              </Icon>
                              Lihat Halaman
                            </Link>
                          </Button>
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
                                <DialogRoot placement={'center'}>
                                  <DialogTrigger asChild>
                                    <HStack>
                                      <Icon size={'sm'} color={'black'}>
                                        <MdOutlineDelete />
                                      </Icon>
                                      <Text>Delete Product</Text>
                                    </HStack>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Delete Product</DialogTitle>
                                    </DialogHeader>
                                    <DialogBody spaceY={5}>
                                      <Text>
                                        Product <Strong>{products.name}</Strong>{' '}
                                        will be removed
                                      </Text>
                                      <Text>
                                        Removed products will not be able to
                                        Cancelled. Make sure the product you
                                        Select it correctly.
                                      </Text>
                                    </DialogBody>
                                    <DialogFooter>
                                      <DialogActionTrigger asChild>
                                        <Button variant="outline">
                                          Cancel
                                        </Button>
                                      </DialogActionTrigger>
                                      <Button>Save</Button>
                                    </DialogFooter>
                                    <DialogCloseTrigger />
                                  </DialogContent>
                                </DialogRoot>
                              </MenuItem>
                            </MenuContent>
                          </MenuRoot>
                        </HStack>
                        <Switch colorScheme="blue" defaultChecked />
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
                    {searchedProducts.filter((s) => s.status === true).length}{' '}
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
                    >
                      Nonaktifkan Produk
                    </Button>
                  </Box>
                  <Flex gap={2}>
                    Pilih Semua
                    <Checkbox />
                  </Flex>
                </Flex>
              </Flex>
              <Stack gap="4">
                {searchedProducts
                  .filter((products) => products.status === true)
                  .map((products, i) => (
                    <Flex
                      key={i}
                      p="4"
                      borderWidth="1px"
                      borderColor="gray.200"
                      rounded="md"
                    >
                      <Box bg={'black'} rounded="md">
                        <Image
                          src={products.productImage}
                          alt={products.variant}
                          w={'28'}
                        />
                      </Box>
                      <Flex direction={'column'} pl={5} w={'full'}>
                        <Box>
                          <Text fontWeight="bold">
                            {products.name} - {products.variant}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {products.price} - Stock: {products.quantity} - SKU:{' '}
                            {products.sku}
                          </Text>
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
                              <Text>Lihat Halaman</Text>
                            </Button>
                          </HStack>
                          <Switch colorScheme="blue" defaultChecked />
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
                    {searchedProducts.filter((s) => s.status === false).length}{' '}
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
                    >
                      Nonaktifkan Produk
                    </Button>
                  </Box>
                  <Flex gap={2}>
                    Pilih Semua
                    <Checkbox />
                  </Flex>
                </Flex>
              </Flex>
              <Stack gap="4">
                {searchedProducts
                  .filter((products) => products.status === false)
                  .map((products, i) => (
                    <Flex
                      key={i}
                      p="4"
                      borderWidth="1px"
                      borderColor="gray.200"
                      rounded="md"
                    >
                      <Box bg={'black'} rounded="md">
                        <Image
                          src={products.productImage}
                          alt={products.variant}
                          w={'28'}
                        />
                      </Box>
                      <Flex direction={'column'} pl={5} w={'full'}>
                        <Box>
                          <Text fontWeight="bold">
                            {products.name} - {products.variant}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            {products.price} - Stock: {products.quantity} - SKU:{' '}
                            {products.sku}
                          </Text>
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
                              <Text>Lihat Halaman</Text>
                            </Button>
                          </HStack>
                          <Switch colorScheme="blue" defaultChecked />
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
