import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';
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
import { BsArrowUp, BsSortAlphaUpAlt } from 'react-icons/bs';
import { LuFolder, LuSquareCheck, LuUser } from 'react-icons/lu';
import { useNavigate } from 'react-router';

interface Order {
  id: number;
  status: string;
  invoice: string;
  productName: string;
  productImage: string;
  quantity: number;
}

const orders: Order[] = [
  {
    id: 1,
    status: 'Belum Dibayar',
    invoice: 'INV/20230809/MPL/00000289',
    productName: 'KAOS BASIC COTTON KENARI',
    productImage:
      'https://ecs7.tokopedia.net/img/product-1/2015/8/30/574846/574846_bc62bae2-ce97-489d-bfcc-4c14ec8d7ec1.jpg',
    quantity: 1,
  },
  {
    id: 2,
    status: 'Pesanan Baru',
    invoice: 'INV/20230809/MPL/00000345',
    productName: 'HOODIE OVERSIZE UNISEX',
    productImage:
      'https://patience-pno.com/cdn/shop/files/4b330d93b1504f2489eb8689d8d48457.png?v=1726327535',
    quantity: 2,
  },
  {
    id: 3,
    status: 'Siap Dikirim',
    invoice: 'INV/20230809/MPL/00000412',
    productName: 'TAS SELEMPANG CASUAL',
    productImage:
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/MTA-74073081/fourtyfour_fourtyfour_airfox_2-0_-_tas_selempang_pria_wanita_casual_fourtyfour_airfox_2-0-_slingbag_casual_pria_wanita_fourtyfour_airfox_2-0_full02_pfujrz85.jpg',
    quantity: 1,
  },
  {
    id: 4,
    status: 'Dalam Pengiriman',
    invoice: 'INV/20230809/MPL/00000501',
    productName: 'SEPATU SNEAKERS PRIA',
    productImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1H6fQs2LSN-mg4s7FnLRPSuiukA1bVg9iTw&s',
    quantity: 1,
  },
  {
    id: 5,
    status: 'Pesanan Selesai',
    invoice: 'INV/20230809/MPL/00000678',
    productName: 'JAKET PARKA PRIA',
    productImage:
      'https://admincerdas.s3.ap-southeast-1.amazonaws.com/20200725/w768_1595652429_414897705--1591464448-BKR107-armykombinasi-OneSize2.jpeg',
    quantity: 1,
  },
  {
    id: 6,
    status: 'Dibatalkan',
    invoice: 'INV/20230809/MPL/00000779',
    productName: 'JAKET PARKA PRIA',
    productImage:
      'https://admincerdas.s3.ap-southeast-1.amazonaws.com/20200725/w768_1595652429_414897705--1591464448-BKR107-armykombinasi-OneSize2.jpeg',
    quantity: 1,
  },
];

export const getStatusColor = (status: string | undefined) => {
  switch (status) {
    case 'Belum Dibayar':
      return 'yellow.400';
    case 'Pesanan Baru':
      return 'green.500';
    case 'Siap Dikirim':
      return 'blue.600';
    case 'Dalam Pengiriman':
      return 'orange.400';
    case 'Pesanan Selesai':
      return 'gray.400';
    case 'Dibatalkan':
      return 'red.600';
    default:
      return 'gray.400';
  }
};

const getButtonStatus = (status: string) => {
  switch (status) {
    case 'Belum Dibayar':
      return 'Hubungi Pembeli';
    case 'Pesanan Baru':
      return 'Proses Pesanan';
    case 'Siap Dikirim':
      return 'Kabari Pembeli';
    case 'Dalam Pengiriman':
      return ' Lihat Rincian Pengiriman';
    case 'Pesanan Selesai':
      return 'Hubungi Pembeli';
    case 'Dibatalkan':
      return 'Hubungi Pembeli';
  }
};

export function Order() {
  const navigate = useNavigate();

  const handleClickOrder = (orderId: number) => {
    navigate(`/detail-order/${orderId}`);
  };
  return (
    <Box>
      <Tabs.Root defaultValue="semua" bg={'white'} p={3} pt={4}>
        <Text fontSize="2xl" fontWeight="bold" color="#5F2EEA">
          Daftar Pesanan
        </Text>
        <Tabs.List
          pt={2}
          style={{
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            scrollbarWidth: 'thin',
          }}
        >
          <Tabs.Trigger value="semua">
            <LuUser />
            Semua
          </Tabs.Trigger>
          <Tabs.Trigger value="belum-dibayar">
            <LuFolder />
            Belum Dibayar
          </Tabs.Trigger>
          <Tabs.Trigger value="pesanan-baru">
            <LuSquareCheck />
            Pesanan Baru
          </Tabs.Trigger>
          <Tabs.Trigger value="siap-dikirim">
            <LuSquareCheck />
            Siap Dikirim
          </Tabs.Trigger>
          <Tabs.Trigger value="dalam-pengiriman">
            <LuSquareCheck />
            Dalam Pengiriman
          </Tabs.Trigger>
          <Tabs.Trigger value="pesanan-selesai">
            <LuSquareCheck />
            Pesanan Selesai
          </Tabs.Trigger>
          <Tabs.Trigger value="dibatalkan">
            <LuSquareCheck />
            Dibatalkan
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
            <Stack gap="4">
              {orders.map((order: Order) => (
                <Box
                  key={order.id}
                  p="4"
                  borderWidth="1px"
                  borderColor="gray.200"
                  rounded="md"
                >
                  <Flex
                    justifyContent={'space-between'}
                    mb={2}
                    borderBottomWidth={'1px'}
                  >
                    <Box>
                      <Box
                        bg={getStatusColor(order.status)}
                        rounded={'md'}
                        width={'36'}
                      >
                        <Text textAlign={'center'} color={'white'}>
                          {order.status}
                        </Text>
                      </Box>
                      <Box>
                        <Text color={'grey'}>{order.invoice}</Text>
                      </Box>
                    </Box>
                    <Box maxWidth={'60'} textAlign={'center'}>
                      <Button rounded="full" bg={'blue.600'}>
                        {getButtonStatus(order.status)}
                      </Button>
                    </Box>
                  </Flex>
                  <Flex onClick={() => handleClickOrder(order.id)}>
                    <Box bg={'black'} rounded="md">
                      <Image
                        src={order.productImage}
                        alt={order.productName}
                        w={20}
                      />
                    </Box>
                    <Flex direction={'column'} pl={5}>
                      <Box>
                        <Text fontWeight="bold">{order.productName}</Text>
                        <Text fontSize="sm" color="gray.600">
                          {order.quantity} Barang
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="belum-dibayar">
          <Box border="1px" borderColor="gray.200" rounded="md">
            <Stack gap="4">
              {orders
                .filter((order) => order.status === 'Belum Dibayar')
                .map((order, i) => (
                  <Box
                    key={i}
                    p="4"
                    borderWidth="1px"
                    borderColor="gray.200"
                    rounded="md"
                  >
                    <Flex
                      justifyContent={'space-between'}
                      mb={2}
                      borderBottomWidth={'1px'}
                    >
                      <Box>
                        <Box
                          bg={getStatusColor(order.status)}
                          rounded={'md'}
                          width={'36'}
                        >
                          <Text textAlign={'center'} color={'white'}>
                            {order.status}
                          </Text>
                        </Box>
                        <Box>
                          <Text color={'grey'}>{order.invoice}</Text>
                        </Box>
                      </Box>
                      <Box maxWidth={'60'} textAlign={'center'}>
                        <Button rounded="full" bg={'blue.600'}>
                          {getButtonStatus(order.status)}
                        </Button>
                      </Box>
                    </Flex>
                    <Flex onClick={() => handleClickOrder(order.id)}>
                      <Box bg={'black'} rounded="md">
                        <Image
                          src={order.productImage}
                          alt={order.productName}
                          w={20}
                        />
                      </Box>
                      <Flex direction={'column'} pl={5}>
                        <Box>
                          <Text fontWeight="bold">{order.productName}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {order.quantity} Barang
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                ))}
            </Stack>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="pesanan-baru">
          <Box border="1px" borderColor="gray.200" rounded="md">
            <Stack gap="4">
              {orders
                .filter((order) => order.status === 'Pesanan Baru')
                .map((order, i) => (
                  <Box
                    key={i}
                    p="4"
                    borderWidth="1px"
                    borderColor="gray.200"
                    rounded="md"
                  >
                    <Flex
                      justifyContent={'space-between'}
                      mb={2}
                      borderBottomWidth={'1px'}
                    >
                      <Box>
                        <Box
                          bg={getStatusColor(order.status)}
                          rounded={'md'}
                          width={'36'}
                        >
                          <Text textAlign={'center'} color={'white'}>
                            {order.status}
                          </Text>
                        </Box>
                        <Box>
                          <Text color={'grey'}>{order.invoice}</Text>
                        </Box>
                      </Box>
                      <Box maxWidth={'60'} textAlign={'center'}>
                        <Button rounded="full" bg={'blue.600'}>
                          {getButtonStatus(order.status)}
                        </Button>
                      </Box>
                    </Flex>
                    <Flex onClick={() => handleClickOrder(order.id)}>
                      <Box bg={'black'} rounded="md">
                        <Image
                          src={order.productImage}
                          alt={order.productName}
                          w={20}
                        />
                      </Box>
                      <Flex direction={'column'} pl={5}>
                        <Box>
                          <Text fontWeight="bold">{order.productName}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {order.quantity} Barang
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                ))}
            </Stack>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="siap-dikirim">
          <Box border="1px" borderColor="gray.200" rounded="md">
            <Stack gap="4">
              {orders
                .filter((order) => order.status === 'Siap Dikirim')
                .map((order, i) => (
                  <Box
                    key={i}
                    p="4"
                    borderWidth="1px"
                    borderColor="gray.200"
                    rounded="md"
                  >
                    <Flex
                      justifyContent={'space-between'}
                      mb={2}
                      borderBottomWidth={'1px'}
                    >
                      <Box>
                        <Box
                          bg={getStatusColor(order.status)}
                          rounded={'md'}
                          width={'36'}
                        >
                          <Text textAlign={'center'} color={'white'}>
                            {order.status}
                          </Text>
                        </Box>
                        <Box>
                          <Text color={'grey'}>{order.invoice}</Text>
                        </Box>
                      </Box>
                      <Box maxWidth={'60'} textAlign={'center'}>
                        <Button rounded="full" bg={'blue.600'}>
                          {getButtonStatus(order.status)}
                        </Button>
                      </Box>
                    </Flex>
                    <Flex onClick={() => handleClickOrder(order.id)}>
                      <Box bg={'black'} rounded="md">
                        <Image
                          src={order.productImage}
                          alt={order.productName}
                          w={20}
                        />
                      </Box>
                      <Flex direction={'column'} pl={5}>
                        <Box>
                          <Text fontWeight="bold">{order.productName}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {order.quantity} Barang
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                ))}
            </Stack>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="dalam-pengiriman">
          <Box border="1px" borderColor="gray.200" rounded="md">
            <Stack gap="4">
              {orders
                .filter((order) => order.status === 'Dalam Pengiriman')
                .map((order, i) => (
                  <Box
                    key={i}
                    p="4"
                    borderWidth="1px"
                    borderColor="gray.200"
                    rounded="md"
                  >
                    <Flex
                      justifyContent={'space-between'}
                      mb={2}
                      borderBottomWidth={'1px'}
                    >
                      <Box>
                        <Box
                          bg={getStatusColor(order.status)}
                          rounded={'md'}
                          width={'36'}
                        >
                          <Text textAlign={'center'} color={'white'}>
                            {order.status}
                          </Text>
                        </Box>
                        <Box>
                          <Text color={'grey'}>{order.invoice}</Text>
                        </Box>
                      </Box>
                      <Box maxWidth={'60'} textAlign={'center'}>
                        <Button rounded="full" bg={'blue.600'}>
                          {getButtonStatus(order.status)}
                        </Button>
                      </Box>
                    </Flex>
                    <Flex onClick={() => handleClickOrder(order.id)}>
                      <Box bg={'black'} rounded="md">
                        <Image
                          src={order.productImage}
                          alt={order.productName}
                          w={20}
                        />
                      </Box>
                      <Flex direction={'column'} pl={5}>
                        <Box>
                          <Text fontWeight="bold">{order.productName}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {order.quantity} Barang
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                ))}
            </Stack>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="pesanan-selesai">
          <Box border="1px" borderColor="gray.200" rounded="md">
            <Stack gap="4">
              {orders
                .filter((order) => order.status === 'Pesanan Selesai')
                .map((order, i) => (
                  <Box
                    key={i}
                    p="4"
                    borderWidth="1px"
                    borderColor="gray.200"
                    rounded="md"
                  >
                    <Flex
                      justifyContent={'space-between'}
                      mb={2}
                      borderBottomWidth={'1px'}
                    >
                      <Box>
                        <Box
                          bg={getStatusColor(order.status)}
                          rounded={'md'}
                          width={'36'}
                        >
                          <Text textAlign={'center'} color={'white'}>
                            {order.status}
                          </Text>
                        </Box>
                        <Box>
                          <Text color={'grey'}>{order.invoice}</Text>
                        </Box>
                      </Box>
                      <Box maxWidth={'60'} textAlign={'center'}>
                        <Button rounded="full" bg={'blue.600'}>
                          {getButtonStatus(order.status)}
                        </Button>
                      </Box>
                    </Flex>
                    <Flex onClick={() => handleClickOrder(order.id)}>
                      <Box bg={'black'} rounded="md">
                        <Image
                          src={order.productImage}
                          alt={order.productName}
                          w={20}
                        />
                      </Box>
                      <Flex direction={'column'} pl={5}>
                        <Box>
                          <Text fontWeight="bold">{order.productName}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {order.quantity} Barang
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                ))}
            </Stack>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="dibatalkan">
          <Box border="1px" borderColor="gray.200" rounded="md">
            <Stack gap="4">
              {orders
                .filter((order) => order.status === 'Dibatalkan')
                .map((order, i) => (
                  <Box
                    key={i}
                    p="4"
                    borderWidth="1px"
                    borderColor="gray.200"
                    rounded="md"
                  >
                    <Flex
                      justifyContent={'space-between'}
                      mb={2}
                      borderBottomWidth={'1px'}
                    >
                      <Box>
                        <Box
                          bg={getStatusColor(order.status)}
                          rounded={'md'}
                          width={'36'}
                        >
                          <Text textAlign={'center'} color={'white'}>
                            {order.status}
                          </Text>
                        </Box>
                        <Box>
                          <Text color={'grey'}>{order.invoice}</Text>
                        </Box>
                      </Box>
                      <Box maxWidth={'60'} textAlign={'center'}>
                        <Button rounded="full" bg={'blue.600'}>
                          {getButtonStatus(order.status)}
                        </Button>
                      </Box>
                    </Flex>
                    <Flex onClick={() => handleClickOrder(order.id)}>
                      <Box bg={'black'} rounded="md">
                        <Image
                          src={order.productImage}
                          alt={order.productName}
                          w={20}
                        />
                      </Box>
                      <Flex direction={'column'} pl={5}>
                        <Box>
                          <Text fontWeight="bold">{order.productName}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {order.quantity} Barang
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                ))}
            </Stack>
          </Box>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
