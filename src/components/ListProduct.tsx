import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Stack,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from './ui/menu';
import { Switch } from './ui/switch';
import { BsArrowUp, BsSortAlphaUpAlt } from 'react-icons/bs';
import { Link } from 'react-router';
import { LuFolder, LuSquareCheck, LuUser } from 'react-icons/lu';
import { MdOutlineDelete } from 'react-icons/md';
import { Checkbox } from './ui/checkbox';
import { DialogUpdatePrice } from './dialog-update-price';

const ListProduct = () => {
  return (
    <Box>
      {/* ListProduct Content */}
      <Box bg={'white'} p={3}>
        <Flex justify="space-between" align="center">
          <Text fontSize="2xl" fontWeight="bold" color="#5F2EEA">
            Daftar Produk
          </Text>
          <Box bg="#5F2EEA" p={3} rounded={'md'}>
            <Link to={'/add-product'}>
              <Text color={'white'}> Tambah Produk </Text>
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
              <LuFolder />
              Aktif
            </Tabs.Trigger>
            <Tabs.Trigger value="nonaktif">
              <LuSquareCheck />
              Nonaktif
            </Tabs.Trigger>
          </Tabs.List>
          <Flex mb="4" gap="4" pt={3} justifyContent={'space-between'}>
            <Input placeholder="Cari Pesanan" w={'50%'} />
            <MenuRoot>
              <MenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  w={'25%'}
                  justifyContent={'space-between'}
                >
                  Kurir
                  <Icon>
                    <BsArrowUp />
                  </Icon>
                </Button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem value="rename">JNE</MenuItem>
                <MenuItem value="export">JNT</MenuItem>
              </MenuContent>
            </MenuRoot>
            <MenuRoot>
              <MenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  w={'25%'}
                  justifyContent={'space-between'}
                >
                  Urutkan
                  <Icon>
                    <BsSortAlphaUpAlt />
                  </Icon>
                </Button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem value="rename">A-Z</MenuItem>
                <MenuItem value="export">Z-A</MenuItem>
              </MenuContent>
            </MenuRoot>
          </Flex>
          <Tabs.Content value="semua">
            <Box border="1px" borderColor="gray.200" rounded="md">
              <Flex align={'center'} justify={'space-between'}>
                <Box>
                  <Text fontWeight={'medium'} fontSize={'2xl'} p={2}>
                    5 Product
                  </Text>
                </Box>
                <Flex align={'center'} gap={3}>
                  <Button w={3} bg={'white'}>
                    <Box
                      borderWidth={'1px'}
                      borderColor={'black'}
                      rounded={'full'}
                      p={'1'}
                    >
                      <Icon size={'md'} color={'black'}>
                        <MdOutlineDelete />
                      </Icon>
                    </Box>
                  </Button>
                  <Box>
                    <Button
                      borderWidth={'1px'}
                      rounded={'full'}
                      borderColor={'black'}
                      bg={'white'}
                      color={'black'}
                    >
                      Nonaktifkan Produk
                    </Button>
                  </Box>
                  <Box>
                    <Checkbox />
                  </Box>
                </Flex>
              </Flex>
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
                        w={'28'}
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
                      <Flex align="center" justify="space-between" mt={4}>
                        <Box>
                          <Flex gap={4}>
                            <Button size="xs" rounded={'full'} bg="blue.600">
                              <DialogUpdatePrice />
                            </Button>
                            {/* <Button size="xs" rounded={'full'} bg="green.600">
                              <DialogUpdateStock />
                            </Button> */}
                          </Flex>
                        </Box>
                        <Flex w={'lg'} justifyContent={'flex-end'}>
                          <Switch colorScheme="blue" defaultChecked />
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </Stack>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="aktif">Manage your projects</Tabs.Content>
          <Tabs.Content value="nonaktif">
            Manage your tasks for freelancers
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Box>
  );
};

export default ListProduct;
