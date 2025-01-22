import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from './ui/menu';
import { Switch } from './ui/switch';
import { BsArrowUp } from 'react-icons/bs';
import { Link } from 'react-router';

const ListProduct = () => {
  return (
    <Box>
      {/* ListProduct Content */}
      <Box bg={'white'} p={3}>
        <Flex justify="space-between" align="center" mb="6">
          <Text fontSize="2xl" fontWeight="bold">
            Daftar Produk
          </Text>
          <Box bg={'blue.400'} p={3} rounded={'md'}>
            <Link to={'/add-product'}>Tambah Produk</Link>
          </Box>
        </Flex>

        <Flex mb="4" gap="4">
          <Input placeholder="Cari produk" />
          <MenuRoot>
            <MenuTrigger asChild>
              <Button variant="outline" size="sm">
                Semua Kategori{' '}
                <Icon>
                  <BsArrowUp />
                </Icon>
              </Button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="rename">Kategori 1</MenuItem>
              <MenuItem value="export">Kategori 2</MenuItem>
            </MenuContent>
          </MenuRoot>
          {/* <Select placeholder="Urutkan">
            <option value="harga">Harga</option>
            <option value="stok">Stok</option>
          </Select> */}
        </Flex>

        <Box border="1px" borderColor="gray.200" rounded="md" p="4">
          <Stack gap="4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Flex
                key={i}
                p="4"
                borderWidth="1px"
                borderColor="gray.200"
                rounded="md"
              >
                <Box bg={'black'} rounded="md">
                  <Image
                    src="https://ecs7.tokopedia.net/img/product-1/2015/8/30/574846/574846_bc62bae2-ce97-489d-bfcc-4c14ec8d7ec1.jpg"
                    alt="Navy"
                    w={20}
                  />
                </Box>
                <Flex direction={'column'} pl={5}>
                  <Box>
                    <Text fontWeight="bold">
                      KAOS BASIC COTTON KENARI - {`Produk ${i + 1}`}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Rp55.000 - Stok: 2{i + 1} - SKU: 01234XY{i + 1}
                    </Text>
                  </Box>
                  <Flex align="center" justify="space-between">
                    <Flex gap={4}>
                      <Button size="sm" bg="blue">
                        Ubah Harga
                      </Button>
                      <Button size="sm" bg="green">
                        Ubah Stok
                      </Button>
                      <Button size="sm" bg="gray">
                        Lihat Halaman
                      </Button>
                    </Flex>
                    <Box>
                      <Switch colorScheme="blue" defaultChecked />
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default ListProduct;
