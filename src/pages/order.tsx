import { Box, Flex, Image, Stack, Tabs, Text } from '@chakra-ui/react';

import { LuUser } from 'react-icons/lu';
import { useNavigate } from 'react-router';
// import dialogTemplateMessage from '../components/Order/Dialog/dialog-template-message'
import { useAuthStore } from '@/hooks/authstore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import DialogTemplateMessage from '../components/Order/Dialog/dialog-template-message';

interface Order {
  id: string;
  status: string;
  invoice: string;
  productName: string;
  productImage: string;
  quantity: number;
  Courier: string;
}

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

export function Order() {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  // Fungsi untuk mengambil data Order
  const fetchOrders = async () => {
    const response = await axios.get('http://localhost:3000/api/order', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.orders;
  };

  // Menggunakan useQuery dengan refetchInterval
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    refetchInterval: 2000, // Refetch data setiap 2 detik
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error fetching orders</Text>;

  const handleClickOrder = (orderId: string) => {
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
            <Box bg={'#5F2EEA'} w={5} rounded={'full'} color={'white'}>
              {
                orders.filter((notif) => notif.status === 'Belum Dibayar')
                  .length
              }
            </Box>
            Belum Dibayar
          </Tabs.Trigger>
          <Tabs.Trigger value="pesanan-baru">
            <Box bg={'#5F2EEA'} w={5} rounded={'full'} color={'white'}>
              {orders.filter((notif) => notif.status === 'Pesanan Baru').length}
            </Box>
            Pesanan Baru
          </Tabs.Trigger>
          <Tabs.Trigger value="siap-dikirim">
            <Box bg={'#5F2EEA'} w={5} rounded={'full'} color={'white'}>
              {orders.filter((notif) => notif.status === 'Siap Dikirim').length}
            </Box>
            Siap Dikirim
          </Tabs.Trigger>
          <Tabs.Trigger value="dalam-pengiriman">
            <Box bg={'#5F2EEA'} w={5} rounded={'full'} color={'white'}>
              {
                orders.filter((notif) => notif.status === 'Dalam Pengiriman')
                  .length
              }
            </Box>
            Dalam Pengiriman
          </Tabs.Trigger>
          <Tabs.Trigger value="pesanan-selesai">
            <Box bg={'#5F2EEA'} w={5} rounded={'full'} color={'white'}>
              {
                orders.filter((notif) => notif.status === 'Pesanan Selesai')
                  .length
              }
            </Box>
            Pesanan Selesai
          </Tabs.Trigger>
          <Tabs.Trigger value="dibatalkan">
            <Box bg={'#5F2EEA'} w={5} rounded={'full'} color={'white'}>
              {orders.filter((notif) => notif.status === 'Dibatalkan').length}
            </Box>
            Dibatalkan
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="semua">
          <Box border="1px" borderColor="gray.200" rounded="md">
            <Stack gap="4">
              {orders.map((order, i) => (
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
                      {/* <Button rounded="full" bg={'blue.600'}>
                        {getButtonStatus(order.status)}
                      </Button> */}
                      <DialogTemplateMessage
                        status={order.status}
                        productid={'cm78j2zii0000tagcf9zftzki'}
                      />
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
                        {/* <Button rounded="full" bg={'blue.600'}>
                          {getButtonStatus(order.status)}
                        </Button> */}
                        <DialogTemplateMessage
                          status={order.status}
                          productid={'cm78j2zii0000tagcf9zftzki'}
                        />
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
                        {/* <Button rounded="full" bg={'blue.600'}>
                          {getButtonStatus(order.status)}
                        </Button> */}
                        <DialogTemplateMessage
                          status={order.status}
                          productid={'cm78j2zii0000tagcf9zftzki'}
                        />
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
                        {/* <Button rounded="full" bg={'blue.600'}>
                          {getButtonStatus(order.status)}
                        </Button> */}
                        <DialogTemplateMessage
                          status={order.status}
                          productid={'cm78j2zii0000tagcf9zftzki'}
                        />
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
                        <DialogTemplateMessage
                          status={order.status}
                          productid={'cm78j2zii0000tagcf9zftzki'}
                        />
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
                        <DialogTemplateMessage
                          status={order.status}
                          productid={'cm78j2zii0000tagcf9zftzki'}
                        />
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
                        <DialogTemplateMessage
                          status={order.status}
                          productid={'cm78j2zii0000tagcf9zftzki'}
                        />
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
