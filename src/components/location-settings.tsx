import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { LuNavigation2, LuNavigation2Off } from 'react-icons/lu';
import DialogAddLocation from './dialog-add-location-settings';
import DialogEditLocation from './dialog-edit-location-settings';
import DialogDeleteLocation from './dialog-delete-location-settings';

const locations = [
  {
    name: 'Fesyen Store',
    address: 'Jl. Elang, No. 4, Sawah lama, Ciputat, Tangerang Selatan',
    city: 'Kota Tangerang Selatan',
    subdistrict: 'Kec. Ciputat',
    postCode: '15113',
    isMain: true,
    pin: <LuNavigation2 color="#2400FE" />,
    pinpoint: true,
  },
  {
    name: 'Fesyen Store 2',
    address: 'Jl. Elang, No. 4, Sawah lama, Ciputat, Tangerang Selatan',
    city: 'Kota Tangerang Selatan',
    subdistrict: 'Kec. Ciputat',
    postCode: '15113',
    isMain: false,
    pin: <LuNavigation2Off color="#EA473C"/>,
    pinpoint: false,
  },
  {
    name: 'Fesyen Store 3',
    address: 'Jl. Elang, No. 4, Sawah lama, Ciputat, Tangerang Selatan',
    city: 'Kota Tangerang Selatan',
    subdistrict: 'Kec. Ciputat',
    postCode: '15113',
    isMain: false,
    pin: <LuNavigation2Off color="#EA473C"/>,
    pinpoint: false,
  },
];

export default function Location() {
  return (
    <Box>
      <Box>
        <HStack display="flex" justifyContent="space-between">
          <VStack>
            <Text fontWeight="700" fontSize="17px" color="black" w="full">
              Store Location
            </Text>
            <Text fontWeight="400" fontSize="14px" color="black">
              Alamat ini akan digunakan sebagai alamat pengirimanmu
            </Text>
          </VStack>
          <VStack>
            <DialogAddLocation/>
          </VStack>
        </HStack>
      </Box>
      {locations.map((location) => (
        <Box
          w="full"
          borderColor="#F8F8F8"
          borderWidth="2px"
          mt="10px"
          p="3"
          borderRadius="10px"
          display="flex"
          alignItems="flex-start"
          h="full"
        >
          <VStack gap="7px" w="30%">
            <Text fontWeight="500" fontSize="14px" w="full" h="30px">
              Nama Lokasi
            </Text>
            <Text fontWeight="500" fontSize="14px" w="full" h="24px">
              Alamat
            </Text>
            <Text fontWeight="500" fontSize="14px" w="full" h="24px">
              Kota/Kecamatan
            </Text>
            <Text fontWeight="500" fontSize="14px" w="full" h="24px">
              Kode Pos
            </Text>
            <Text fontWeight="500" fontSize="14px" w="full" h="24px">
              Pin Point
            </Text>
          </VStack>
          <VStack gap="7px" w="60%">
            <HStack w="full" align="flex-start">
              <Text fontWeight="700" fontSize="16px" w="full" h="30px">
                {location.name}
              </Text>
              {location.isMain == true && (
                <Box bg="#008F5D" p="1" borderRadius="10px" w="150px" h="30px">
                  <Text
                    color="white"
                    fontWeight="600"
                    fontSize="15px"
                    textAlign="center"
                  >
                    Main Address
                  </Text>
                </Box>
              )}
            </HStack>
            <Text fontWeight="500" fontSize="14px" w="full" h="24px">
              {location.address}
            </Text>
            <Text fontWeight="500" fontSize="14px" w="full" h="24px">
              {location.city}/{location.subdistrict}
            </Text>
            <Text fontWeight="500" fontSize="14px" w="full" h="24px">
              {location.postCode}
            </Text>
            {location.pinpoint == true && (
              <HStack w="full">
                {location.pin}
                <Text
                  fontWeight="500"
                  fontSize="14px"
                  w="full"
                  h="24px"
                  color="#2400FE"
                >
                  Sudah Pinpoint
                </Text>
              </HStack>
            )}
            {location.pinpoint == false && (
              <HStack w="full">
                {location.pin}
                <Text
                  fontWeight="500"
                  fontSize="14px"
                  w="full"
                  h="24px"
                  color="#EA473C"
                >
                  Belum Pinpoint
                </Text>
              </HStack>
            )}
          </VStack>
          <HStack w="10%" h="full" display="flex" justifyContent="center">
            <Box rounded="full" borderWidth="2px" borderColor="black" p="5px">
            <DialogDeleteLocation/>
            </Box>
            <Box rounded="full" borderWidth="2px" borderColor="black" p="5px">
            <DialogEditLocation/>
            </Box>
          </HStack>
        </Box>
      ))}
    </Box>
  );
}
