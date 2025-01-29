import React from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Button,
  Flex,
  VStack,
  HStack,
  Table,
  Icon,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import {
  Users,
  Package,
  CreditCard,
  PlusCircle,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { FaRegBell } from 'react-icons/fa6';
import { Link } from 'react-router';

interface StatWidgetProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  value: string;
}

// Mock data for the charts and tables
const items = [
  { id: 1, date: '2023-10-04', amount: 100, status: 'Selesai' },
  { id: 2, date: '2023-10-03', amount: 200, status: 'Pending' },
  { id: 3, date: '2023-10-02', amount: 150, status: 'Selesai' },
  { id: 4, date: '2023-10-01', amount: 300, status: 'Pending' },
];

const product = [
  {
    id: 1,
    nama_produk: 'Blouse Wanita',
    kategori: 'Pakaian',
    sub_kategori: 'Pakaian Wanita',
    jumlah_dibeli: 120,
  },
  {
    id: 2,
    nama_produk: 'Kemeja Pria',
    kategori: 'Pakaian',
    sub_kategori: 'Pakaian Pria',
    jumlah_dibeli: 90,
  },
  {
    id: 3,
    nama_produk: 'Baju Anak',
    kategori: 'Pakaian',
    sub_kategori: 'Pakaian Anak',
    jumlah_dibeli: 70,
  },
  {
    id: 4,
    nama_produk: 'Blender Listrik',
    kategori: 'Elektronik',
    sub_kategori: 'Kitchen Electronics',
    jumlah_dibeli: 50,
  },
  {
    id: 5,
    nama_produk: 'Toaster',
    kategori: 'Elektronik',
    sub_kategori: 'Kitchen Electronics',
    jumlah_dibeli: 30,
  },
  {
    id: 6,
    nama_produk: 'Smartphone X',
    kategori: 'Elektronik',
    sub_kategori: 'Smartphones and Accessories',
    jumlah_dibeli: 200,
  },
  {
    id: 7,
    nama_produk: 'Earbuds Wireless',
    kategori: 'Elektronik',
    sub_kategori: 'Smartphones and Accessories',
    jumlah_dibeli: 150,
  },
  {
    id: 8,
    nama_produk: 'Rok Wanita',
    kategori: 'Pakaian',
    sub_kategori: 'Pakaian Wanita',
    jumlah_dibeli: 80,
  },
  {
    id: 9,
    nama_produk: 'Celana Jeans Pria',
    kategori: 'Pakaian',
    sub_kategori: 'Pakaian Pria',
    jumlah_dibeli: 110,
  },
  {
    id: 10,
    nama_produk: 'Setelan Anak',
    kategori: 'Pakaian',
    sub_kategori: 'Pakaian Anak',
    jumlah_dibeli: 60,
  },
  {
    id: 11,
    nama_produk: 'Microwave',
    kategori: 'Elektronik',
    sub_kategori: 'Kitchen Electronics',
    jumlah_dibeli: 40,
  },
  {
    id: 12,
    nama_produk: 'Charger Portable',
    kategori: 'Elektronik',
    sub_kategori: 'Smartphones and Accessories',
    jumlah_dibeli: 180,
  },
];

const top6Data = product.slice(0, 6);

const generateSalesData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    sales: Math.floor(Math.random() * 1000) + 500,
  }));
};

const salesData = generateSalesData();

function StatWidget({ icon: Icon, title, value }: StatWidgetProps) {
  return (
    <Box bg={'white'} p={6} borderRadius="lg" boxShadow="md">
      <HStack spaceY={4}>
        <Box color="blue.500">
          <Icon size={32} />
        </Box>
        <Box>
          <Text color="gray.600" fontSize="sm">
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            {value}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}

export function Dashboard() {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box minH="100vh">
      {/* Header */}
      <Box bg={'white'} borderRadius="lg" p={6} mb={6} boxShadow="md">
        <Heading as="h1" size="lg" mb={2}>
          DASHBOARD
        </Heading>
        <Text color="gray.600">Tanggal: {currentDate}</Text>
      </Box>

      {/* Widgets */}
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
        gap={6}
        mb={6}
      >
        <StatWidget icon={Users} title="Total Sales" value="Rp.168.570.000" />
        <StatWidget icon={Package} title="Total Product" value="567" />
        <StatWidget icon={CreditCard} title="Today's Transactions" value="89" />
      </Grid>

      {/* Charts */}
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        gap={6}
        mb={6}
      >
        <Box bg={'white'} borderRadius="lg" boxShadow="md">
          <Text pt={6} pl={6} mb={3} fontWeight={'medium'}>
            30-Day Sales Trend
          </Text>
          <Box pr={5}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
        <Box bg={'white'} p={6} borderRadius="lg" boxShadow="md">
          <Text mb={3} fontWeight={'medium'}>
            Product Category Distribution
          </Text>
          <Box>
            <Table.Root size="sm" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Product</Table.ColumnHeader>
                  <Table.ColumnHeader>Category</Table.ColumnHeader>
                  <Table.ColumnHeader>Sub-Category</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign={'end'}>
                    Value
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {top6Data.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.nama_produk}</Table.Cell>
                    <Table.Cell>{item.kategori}</Table.Cell>
                    <Table.Cell>{item.sub_kategori}</Table.Cell>
                    <Table.Cell textAlign="end">
                      {item.jumlah_dibeli}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>
      </Grid>

      {/* Transactions Table */}
      <Box
        bg={'white'}
        borderRadius="lg"
        boxShadow="md"
        mb={6}
        overflow="hidden"
      >
        <Box p={6}>
          <Text mb={3} fontWeight={'medium'}>
            Recent Transactions
          </Text>
          <Box overflowX="auto">
            <Table.Root size="sm" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Date</Table.ColumnHeader>
                  <Table.ColumnHeader>Amount</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">
                    Status
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {items.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.date}</Table.Cell>
                    <Table.Cell>{item.amount}</Table.Cell>
                    <Table.Cell textAlign="end">{item.status}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>
      </Box>

      {/* Notifications & Quick Actions */}
      <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
        <Box bg={'white'} p={6} borderRadius="lg" boxShadow="md">
          <Flex gap={2} mb={2} alignItems={'center'}>
            <Icon size={'md'} color={'blue.600'}>
              <FaRegBell />
            </Icon>
            <Text fontWeight={'medium'}>Notifications</Text>
          </Flex>
          <Flex
            alignItems={'center'}
            bg="yellow.50"
            color="yellow.600"
            p={4}
            borderRadius="md"
            gap={2}
          >
            <AlertTriangle size={20} />
            <Text>Stok Produk X hampir habis</Text>
          </Flex>
        </Box>
        <Box bg={'white'} p={6} borderRadius="lg" boxShadow="md">
          <VStack align="stretch" spaceY={4}>
            <Heading size="md">Quick Actions</Heading>
            <Flex gap={2} alignItems={'center'}>
              <Button>
                <Link to={'/add-product'}>
                  <Icon>
                    <PlusCircle size={20} />
                  </Icon>
                  Tambah Produk
                </Link>
              </Button>
              <Button>
                <Icon>
                  <FileText size={20} />
                </Icon>
                <Text>Laporan</Text>
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
}
