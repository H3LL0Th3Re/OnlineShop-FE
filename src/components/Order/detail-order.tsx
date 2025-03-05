import { TrackingShipment } from '@/components/Order/Dialog/dialog-tracking-shipment';
import {
  Box,
  Collapsible,
  Flex,
  Icon,
  Image,
  Strong,
  Text,
} from '@chakra-ui/react';
import { FaRegCalendarAlt, FaRegCopy, FaRegUserCircle } from 'react-icons/fa';
import { HiOutlineTruck } from 'react-icons/hi';
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoLogoWhatsapp,
} from 'react-icons/io';
import { IoWalletOutline } from 'react-icons/io5';
import { PiInvoiceBold } from 'react-icons/pi';
import { RiFileList2Line } from 'react-icons/ri';
import { TbInbox } from 'react-icons/tb';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from '@/components/ui/timeline';
import { LuPackage } from 'react-icons/lu';
import { useParams } from 'react-router';
import axios from 'axios';
import { apiURL } from '@/utils/api-url';
// import { getStatusColor } from '../../pages/order';
import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';
import { detailOrder } from '@/types/detailOrder';

// const orders: Order[] = [
//   {
//     id: 1,
//     status: 'Belum Dibayar',
//     invoice: 'INV/20230809/MPL/00000289',
//     productName: 'KAOS BASIC COTTON KENARI',
//     productImage:
//       'https://ecs7.tokopedia.net/img/product-1/2015/8/30/574846/574846_bc62bae2-ce97-489d-bfcc-4c14ec8d7ec1.jpg',
//     quantity: 1,
//   },
//   {
//     id: 2,
//     status: 'Pesanan Baru',
//     invoice: 'INV/20230809/MPL/00000345',
//     productName: 'HOODIE OVERSIZE UNISEX',
//     productImage:
//       'https://patience-pno.com/cdn/shop/files/4b330d93b1504f2489eb8689d8d48457.png?v=1726327535',
//     quantity: 2,
//   },
//   {
//     id: 3,
//     status: 'Siap Dikirim',
//     invoice: 'INV/20230809/MPL/00000412',
//     productName: 'TAS SELEMPANG CASUAL',
//     productImage:
//       'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/MTA-74073081/fourtyfour_fourtyfour_airfox_2-0_-_tas_selempang_pria_wanita_casual_fourtyfour_airfox_2-0-_slingbag_casual_pria_wanita_fourtyfour_airfox_2-0_full02_pfujrz85.jpg',
//     quantity: 1,
//   },
//   {
//     id: 4,
//     status: 'Dalam Pengiriman',
//     invoice: 'INV/20230809/MPL/00000501',
//     productName: 'SEPATU SNEAKERS PRIA',
//     productImage:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1H6fQs2LSN-mg4s7FnLRPSuiukA1bVg9iTw&s',
//     quantity: 1,
//   },
//   {
//     id: 5,
//     status: 'Pesanan Selesai',
//     invoice: 'INV/20230809/MPL/00000678',
//     productName: 'JAKET PARKA PRIA',
//     productImage:
//       'https://admincerdas.s3.ap-southeast-1.amazonaws.com/20200725/w768_1595652429_414897705--1591464448-BKR107-armykombinasi-OneSize2.jpeg',
//     quantity: 1,
//   },
//   {
//     id: 6,
//     status: 'Dibatalkan',
//     invoice: 'INV/20230809/MPL/00000779',
//     productName: 'JAKET PARKA PRIA',
//     productImage:
//       'https://admincerdas.s3.ap-southeast-1.amazonaws.com/20200725/w768_1595652429_414897705--1591464448-BKR107-armykombinasi-OneSize2.jpeg',
//     quantity: 1,
//   },
// ];

// interface Order {
//   id: number;
//   status: string;
//   invoice: string;
//   productName: string;
//   productImage: string;
//   quantity: number;
// }

export function DetailOrder() {
  const { orderId } = useParams();
  const orderIdNumber = orderId ? parseInt(orderId, 10) : NaN;
  const token = Cookies.get('token');

  const fetchDetailOrder = async (token: string) => {
    if (isNaN(orderIdNumber)) throw new Error('Invalid order ID');

    const response = await axios.get(`${apiURL}/order/${orderIdNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  };

  // const fetchDetailOrder = async (token:string) => {
  //   const response = await axios.get(apiURL + `/order/${orderId}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   return response.data.data;
  // }

  const { data: order } = useQuery<detailOrder>({
    queryKey: ['order'],
    queryFn: () => fetchDetailOrder(token!),
    enabled: !!token,
  });

  // const order = orders.find((order) => order.id === orderIdNumber);

  return (
    <Box>
      <Text color={'blue.600'} fontSize="2xl" fontWeight="semibold">
        Daftar Pesanan
        <Icon>
          <IoIosArrowForward />
        </Icon>
      </Text>
      <Box spaceY={4} key={order?.id}>
        <Box bg={'white'} p={3} rounded={'md'}>
          <Flex gap={2}>
            <Icon size={'xl'} color={'blue.600'}>
              <RiFileList2Line />
            </Icon>
            <Box
              // bg={getStatusColor(order?.status)}
              borderRadius={'full'}
              width={'36'}
            >
              <Text textAlign={'center'}>{order?.status}</Text>
            </Box>
            {/* <Box bg={'green.400'} borderRadius={'full'} width={'32'}>
                <Text textAlign={'center'}>Pesanan Baru</Text>
              </Box>
              <Box bg={'blue.400'} borderRadius={'full'} width={'32'}>
                <Text textAlign={'center'}>Siap Dikirim</Text>
              </Box>
              <Box bg={'orange.400'} borderRadius={'full'} width={'32'}>
                <Text textAlign={'center'}>Dalam Pengiriman</Text>
              </Box>
              <Box bg={'gray.400'} borderRadius={'full'} width={'32'}>
                <Text textAlign={'center'}>Pesanan Selesai</Text>
              </Box>
              <Box bg={'red.500'} borderRadius={'full'} width={'32'}>
                <Text textAlign={'center'}>Dibatalkan</Text>
              </Box> */}
          </Flex>
          <Text pl={10} pt={2}>
            Pesanan akan dibatalkan bila pembayaran tidak dilakukan sampai
            <Strong>30 Januari 2025 - 00:00 WIB</Strong>. Silakan tunggu sampai
            pembayaran terkonfirmasi sebelum mengirimkan barang.
          </Text>
          <Collapsible.Root>
            <Collapsible.Trigger
              cursor={'pointer'}
              paddingY="3"
              pl={10}
              pt={2}
              color={'blue.600'}
              fontWeight="semibold"
            >
              Lihat Riwayat Pesanan
              <Icon>
                <IoIosArrowDown />
              </Icon>
            </Collapsible.Trigger>
            <Collapsible.Content>
              <Box ml={10} padding="4" borderWidth="1px" rounded={'md'}>
                <TimelineRoot maxW="400px">
                  {order?.courier.history.map((history) => ( //remove "index" if not used
                    <TimelineItem>
                      <TimelineConnector>
                        <LuPackage />
                      </TimelineConnector>
                      <TimelineContent>
                        <TimelineTitle textStyle="sm">
                          {history.status}
                        </TimelineTitle>
                        <TimelineDescription>
                          {history.updated_at}
                        </TimelineDescription>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </TimelineRoot>
              </Box>
            </Collapsible.Content>
          </Collapsible.Root>
        </Box>
        <Box bg={'white'} p={3} rounded={'md'} spaceY={5}>
          <Flex justify={'space-between'}>
            <Flex gap={2}>
              <Icon size={'xl'} color={'blue.600'}>
                <FaRegCalendarAlt />
              </Icon>
              <Text fontWeight={'medium'}>Tanggal</Text>
            </Flex>
            <Box>
              <Text>{order?.delivery.datetime}</Text>
            </Box>
          </Flex>
          <Flex justify={'space-between'}>
            <Flex gap={2}>
              <Icon size={'xl'} color={'blue.600'}>
                <PiInvoiceBold />
              </Icon>
              <Text fontWeight={'medium'}>Invoice</Text>
            </Flex>
            <Flex gap={2}>
              <Icon size={'md'} color={'grey.300'}>
                <FaRegCopy />
              </Icon>
              <Text>{order?.invoice_id}</Text>
            </Flex>
          </Flex>
          <Flex justify={'space-between'}>
            <Flex gap={2}>
              <Icon size={'xl'} color={'blue.600'}>
                <FaRegUserCircle />
              </Icon>
              <Text fontWeight={'medium'}>Pembeli</Text>
            </Flex>
            <Flex align={'center'} gap={2}>
              <Icon size={'md'} color={'green.600'}>
                <IoLogoWhatsapp />
              </Icon>
              <Text>{order?.destination.contact_name}</Text>
            </Flex>
          </Flex>
        </Box>
        <Box bg={'white'} p={3} rounded={'md'}>
          <Flex gap={2}>
            <Icon size={'xl'} color={'blue.600'}>
              <TbInbox />
            </Icon>
            <Text fontWeight={'medium'}>Detail Produk</Text>
          </Flex>
          <Flex ml={10} p={2} borderWidth={'1px'} rounded={'md'}>
            <Box bg={'black'} rounded="sm">
              <Image
                src={order?.productImage}
                alt={order?.items[0].name}
                w={'14'}
              />
            </Box>
            <Flex pl={5} justify={'space-between'} w={'full'}>
              <Box>
                <Text fontWeight="bold">{order?.items[0].name}</Text>
                <Text fontSize="sm" color="gray.600">
                  {order?.items[0].value}
                </Text>
              </Box>
              <Flex direction={'column'} align={'end'}>
                <Text color="gray.600">Total Belanja</Text>
                <Text>{order?.items[0].value}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
        <Box bg={'white'} p={3} rounded={'md'}>
          <Flex justify={'space-between'}>
            <Flex gap={2}>
              <Icon size={'xl'} color={'blue.600'}>
                <HiOutlineTruck />
              </Icon>
              <Text fontWeight={'medium'}>Detail Pengiriman</Text>
            </Flex>
            <Box>
              {/* <Button bg={'blue.600'} rounded={'full'} fontWeight="semibold">
                  Lacak Pengiriman
                </Button> */}
              <TrackingShipment order={order} />
            </Box>
          </Flex>
          <Flex>
            <Text pl={9} color={'grey'} w={'56'}>
              Kurir
            </Text>
            <Text fontWeight={'medium'}>{order?.courier.company}</Text>
          </Flex>
          <Flex>
            <Text pl={9} color={'grey'} w={'56'}>
              No. Resi
            </Text>
            <Text fontWeight={'medium'}>-</Text>
          </Flex>
          <Flex>
            <Text pl={9} color={'grey'} w={'56'}>
              Alamat
            </Text>
            <Box>
              <Text>{order?.destination.address}</Text>
              <Text color={'gray.600'}>{order?.destination.contact_phone}</Text>
              <Text color={'gray.600'}>{order?.destination.contact_name}</Text>
            </Box>
          </Flex>
        </Box>
        <Box bg={'white'} p={3} rounded={'md'}>
          <Flex gap={2}>
            <Icon size={'xl'} color={'blue.600'}>
              <IoWalletOutline />
            </Icon>
            <Text fontWeight={'medium'}>Rincian Pembayaran</Text>
          </Flex>
          <Flex gap={2} justify={'space-between'}>
            <Text color={'gray.600'} pl={9}>
              Total Harga (1 Barang)
            </Text>
            <Text>{order?.items[0].value}</Text>
          </Flex>
          <Flex gap={2} justify={'space-between'}>
            <Text color={'gray.600'} pl={9}>
              Total Ongkos Kirim (10Kg)
            </Text>
            <Text>{order?.courier.shipment_fee}</Text>
          </Flex>
          <Flex gap={2} justify={'space-between'}>
            <Text color={'gray.600'} pl={9}>
              Diskon
            </Text>
            <Text>0</Text>
          </Flex>
          <Flex gap={2} justify={'space-between'}>
            <Text color={'gray.600'} pl={9}>
              Biaya Layanan
            </Text>
            <Text>{(order?.items?.[0]?.value ?? 0) / 0.01}</Text>
          </Flex>
          <Box pl={9}>
            <Flex gap={2} justify={'space-between'} borderTopWidth={'1px'}>
              <Text fontWeight={'medium'}>Total Penjualan</Text>
              <Text>
                {(order?.items?.[0]?.value ?? 0) +
                  (order?.items?.[0]?.value ?? 0) / 0.01 +
                  (order?.courier?.shipment_fee ?? 0)}
              </Text>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
