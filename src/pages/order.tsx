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
import { Link } from 'react-router';

export function Order() {
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
              {Array.from({ length: 5 }).map((_, i) => (
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
                      <Box bg={'yellow.400'} borderRadius={'full'} width={'32'}>
                        <Text textAlign={'center'}>Belum Dibayar</Text>
                      </Box>
                      <Box>
                        <Text color={'grey'}>INV/20230809/MPL/00000289</Text>
                      </Box>
                    </Box>
                    <Box
                      borderWidth="1px"
                      borderColor="gray.400"
                      rounded="full"
                      width={'32'}
                      height={'7'}
                      textAlign={'center'}
                    >
                      <Link to={'/call-center'}>Hubungi Admin</Link>
                    </Box>
                  </Flex>
                  <Flex>
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
                          {i + 1} Barang
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="belum-dibayar">Pesanan Belum Dibayar</Tabs.Content>
        <Tabs.Content value="pesanan-baru">Pesanan Baru</Tabs.Content>
        <Tabs.Content value="siap-dikirim">Pesanan Siap Dikirim</Tabs.Content>
        <Tabs.Content value="dalam-pengiriman">
          Pesanan Dalam Pengiriman
        </Tabs.Content>
        <Tabs.Content value="pesanan-selesai">Pesanan Selesai</Tabs.Content>
        <Tabs.Content value="dibatalkan">Pesanan Dibatalkan</Tabs.Content>
      </Tabs.Root>
    </Box>
  );
}
