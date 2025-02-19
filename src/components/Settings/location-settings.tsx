import { useAuthStore } from '@/hooks/authstore';
import type { Location } from '@/types/location';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { LuNavigation2 } from 'react-icons/lu';
import { MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import DialogAddLocation from './Dialog/dialog-add-location-settings';
import DialogEditLocation from './Dialog/dialog-edit-location-settings';

export default function LocationSetting() {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  const [, setEditingLocationId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingLocationId(id); // Simpan ID lokasi yang sedang diedit
  };

  const { data: locations } = useQuery<Location[]>({
    queryKey: ['location'],
    queryFn: () => fetchLocations(token!),
    enabled: !!token,
  });

  const mutation = useMutation({
    mutationFn: (id: string) => deleteLocation(id, token!),
    onSuccess: () => {
      // Refresh data lokasi setelah berhasil delete
      queryClient.invalidateQueries({ queryKey: ['location'] });
    },
  });

  const fetchLocations = async (token: string) => {
    const response = await axios.get('http://localhost:3000/api/locations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.location;
  };

  const deleteLocation = async (id: string, token: string) => {
    return await axios.delete(`http://localhost:3000/api/locations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(id);
        Swal.fire('Deleted!', 'The location has been deleted.', 'success');
      }
    });
  };

  // const handleAddLocation = async (newLocation: any) => {
  //   try {
  //     await createLocation(newLocation);
  //     Swal.fire('Success', 'Location has been added.', 'success');
  //   } catch (error) {
  //     Swal.fire('Error', 'Failed to add location.', 'error');
  //   }
  // };

  // const { mutateAsync: createLocation, isPending: creating } = useMutation({
  //   mutationFn: async (newLocation: any) => {
  //     const response = await axios.post(
  //       'http://localhost:3000/api/locations/create',
  //       newLocation,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     return response.data;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['location'] });
  //   },
  //   onError: (error) => {
  //     console.error('Failed to create location', error);
  //   },
  // });

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
            <DialogAddLocation />
            {/* <DialogAddLocation onAddLocation={handleAddLocation} /> */}
          </VStack>
        </HStack>
      </Box>
      {locations &&
        locations?.map((location) => (
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
                Kelurahan/Kecamatan/Kota/Provinsi
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
                {location.is_main_location == true && (
                  <Box
                    bg="#008F5D"
                    p="1"
                    borderRadius="10px"
                    w="150px"
                    h="30px"
                  >
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
                {location.city_district}
              </Text>
              <Text fontWeight="500" fontSize="14px" w="full" h="24px">
                {location.postal_code}
              </Text>
              <Box w="full">
                <Link
                  to={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
                  target="_blank"
                >
                  <HStack w="full">
                    <LuNavigation2 color="#2400FE" />
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
                </Link>
              </Box>

              {/* {location.pinpoint == false && (
              <HStack w="full">
                <LuNavigation2Off color="#EA473C" />
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
            )} */}
            </VStack>
            <HStack w="10%" h="full" display="flex" justifyContent="center">
              <Box
                rounded="full"
                borderWidth="2px"
                borderColor="black"
                p="5px"
                onClick={() => handleDelete(location.id)}
              >
                <MdOutlineDelete
                  style={{ fontSize: '20px', cursor: 'pointer' }}
                />
              </Box>
              <Box
                rounded="full"
                borderWidth="2px"
                borderColor="black"
                p="5px"
                onClick={() => handleEdit(location.id)}
              >
                <DialogEditLocation locationId={location.id} />
              </Box>
            </HStack>
          </Box>
        ))}
    </Box>
  );
}
