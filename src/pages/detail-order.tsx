import { TrackingShipment } from '@/components/dialog-tracking-shipment';
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
import { LuCheck, LuPackage, LuShip } from 'react-icons/lu';

export function DetailOrder() {
  return (
    <Box>
      <Text color={'blue.600'} fontSize="2xl" fontWeight="semibold">
        Daftar Pesanan
        <Icon>
          <IoIosArrowForward />
        </Icon>
      </Text>
      <Box spaceY={4}>
        <Box bg={'white'} p={3} rounded={'md'}>
          <Flex gap={2}>
            <Icon size={'xl'} color={'blue.600'}>
              <RiFileList2Line />
            </Icon>
            <Box bg={'yellow.400'} borderRadius={'full'} width={'32'}>
              <Text textAlign={'center'}>Belum Dibayar</Text>
            </Box>
          </Flex>
          <Text pl={10} pt={2}>
            Pesanan akan dibatalkan bila pembayaran tidak dilakukan sampai{' '}
            <Strong>30 Januari 2025 - 00:00 WIB</Strong>. Silakan tunggu sampai
            pembayaran terkonfirmasi sebelum mengirimkan barang.{' '}
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
                  <TimelineItem>
                    <TimelineConnector>
                      <LuShip />
                    </TimelineConnector>
                    <TimelineContent>
                      <TimelineTitle>Product Shipped</TimelineTitle>
                      <TimelineDescription>13th May 2021</TimelineDescription>
                    </TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineConnector>
                      <LuCheck />
                    </TimelineConnector>
                    <TimelineContent>
                      <TimelineTitle textStyle="sm">
                        Order Confirmed
                      </TimelineTitle>
                      <TimelineDescription>18th May 2021</TimelineDescription>
                    </TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineConnector>
                      <LuPackage />
                    </TimelineConnector>
                    <TimelineContent>
                      <TimelineTitle textStyle="sm">
                        Order Delivered
                      </TimelineTitle>
                      <TimelineDescription>
                        20th May 2021, 10:30am
                      </TimelineDescription>
                    </TimelineContent>
                  </TimelineItem>
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
              <Text>29 Januari 2025-19:43WIB</Text>
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
              <Text>INV/202308009/MPL/00000289</Text>
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
              <Text>Bambang Pamungkas</Text>
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
                src="https://ecs7.tokopedia.net/img/product-1/2015/8/30/574846/574846_bc62bae2-ce97-489d-bfcc-4c14ec8d7ec1.jpg"
                alt="Navy"
                w={'14'}
              />
            </Box>
            <Flex pl={5} justify={'space-between'} w={'full'}>
              <Box>
                <Text fontWeight="bold">KAOS BASIC COTTON KENARI</Text>
                <Text fontSize="sm" color="gray.600">
                  1 x Rp180.000
                </Text>
              </Box>
              <Flex direction={'column'} align={'end'}>
                <Text color="gray.600">Total Belanja</Text>
                <Text>Rp180.000</Text>
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
              <TrackingShipment />
            </Box>
          </Flex>
          <Flex>
            <Text pl={9} color={'grey'} w={'56'}>
              Kurir
            </Text>
            <Text fontWeight={'medium'}>J&T-Regular</Text>
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
              <Text>
                Jl. Ki Hajar Dewantoro, Kec. Ciputat, Kota Tangerang Selatan
              </Text>
              <Text color={'gray.600'}>082288291120</Text>
              <Text color={'gray.600'}>Bambang Pamungkas</Text>
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
            <Text>Rp180.000</Text>
          </Flex>
          <Flex gap={2} justify={'space-between'}>
            <Text color={'gray.600'} pl={9}>
              Total Ongkos Kirim (10Kg)
            </Text>
            <Text>Rp10.000</Text>
          </Flex>
          <Flex gap={2} justify={'space-between'}>
            <Text color={'gray.600'} pl={9}>
              Diskon
            </Text>
            <Text>Rp0</Text>
          </Flex>
          <Flex gap={2} justify={'space-between'}>
            <Text color={'gray.600'} pl={9}>
              Biaya Layanan
            </Text>
            <Text>Rp0</Text>
          </Flex>
          <Box pl={9}>
            <Flex gap={2} justify={'space-between'} borderTopWidth={'1px'}>
              <Text fontWeight={'medium'}>Total Penjualan</Text>
              <Text>Rp190.000</Text>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
