import { Box, Button, Input, Text, Textarea } from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/hooks/authstore';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { MdEditLocationAlt } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { apiURL } from '@/utils/api-url';
interface DropdownOption {
  label: string;
  value: string;
  postCode?: string;
}

type DialogEditLocationProps = {
  locationId: string; // Location ID diterima dari parent
};

const DialogEditLocation: React.FC<DialogEditLocationProps> = ({
  locationId,
}) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [provinces, setProvinces] = useState<DropdownOption[]>([]);
  const [cities, setCities] = useState<DropdownOption[]>([]);
  const [districts, setDistricts] = useState<DropdownOption[]>([]);
  const [villages, setVillages] = useState<DropdownOption[]>([]);
  const [, setPostalCodes] = useState<DropdownOption[]>([]);
  const [locationName, setLocationName] = useState<string>('');
  const [locationAddress, setLocationAddress] = useState<string>('');
  const queryClient = useQueryClient();

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedVillage, setSelectedVillage] = useState<string | null>(null);
  const [selectedPostalCode, setselectedPostalCode] = useState<string | null>(
    null
  );
  const { token } = useAuthStore();

  // const getProvinceLabel = (value: string | null) => {
  //   const province = provinces.find((prov) => prov.value === value);
  //   return province ? province.label : null;
  // };

  const getLabelByValue = (options: DropdownOption[], value: string | null) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : null;
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      if (token) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/locations/api/provinces`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`, // Menambahkan token ke header
              },
            }
          );
          if (!response.ok) {
            throw new Error('Failed to fetch provinces');
          }
          const data = await response.json();
          setProvinces(
            data.data.map((prov: any) => ({
              label: prov.name,
              value: prov.code,
            }))
          );
        } catch (error) {
          console.error('Error fetching provinces:', error);
        }
      }
    };
    fetchProvinces();
  }, [token]);

  // Effect untuk mengambil data kota berdasarkan provinsi yang dipilih
  useEffect(() => {
    const fetchCities = async (provinceCode: string) => {
      if (provinceCode && token) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/locations/api/cities/${provinceCode}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();

          // Memastikan data dikirim sesuai dengan format yang diinginkan
          if (data?.data) {
            setCities(
              data.data.map((city: any) => ({
                label: city.name, // Menampilkan nama kota
                value: city.code, // Menyimpan kode kota
              }))
            );
          } else {
            console.error('Invalid data structure received from API:', data);
          }
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      }
    };

    if (selectedProvince) {
      fetchCities(selectedProvince);
    }
  }, [selectedProvince, token]);

  useEffect(() => {
    const fetchDistricts = async (cityCode: string) => {
      if (cityCode && token) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/locations/api/districts/${cityCode}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();

          // Memastikan data dikirim sesuai dengan format yang diinginkan
          if (data?.data) {
            setDistricts(
              // Mengubah setCities menjadi setDistricts
              data.data.map((district: any) => ({
                label: district.name, // Menampilkan nama kecamatan
                value: district.code, // Menyimpan kode kecamatan
              }))
            );
          } else {
            console.error('Invalid data structure received from API:', data);
          }
        } catch (error) {
          console.error('Error fetching districts:', error);
        }
      }
    };

    if (selectedCity) {
      fetchDistricts(selectedCity);
    }
  }, [selectedCity, token]);

  useEffect(() => {
    const fetchVillages = async (districtCode: string) => {
      if (districtCode && token) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/locations/api/villages/${districtCode}`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();

          // Memastikan data dikirim sesuai dengan format yang diinginkan
          if (data?.data) {
            setVillages(
              // Mengubah setCities menjadi setVillages
              data.data.map((village: any) => ({
                label: village.name, // Menampilkan nama kecamatan
                value: village.code, // Menyimpan kode kecamatan
                postCode: village.postal_code,
              }))
            );
          } else {
            console.error('Invalid data structure received from API:', data);
          }
        } catch (error) {
          console.error('Error fetching Villages:', error);
        }
      }
    };

    if (selectedDistrict) {
      fetchVillages(selectedDistrict);
    }
  }, [selectedDistrict, token]);

  const handleGetLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  // function LocationMarker() {
  //   const map = useMapEvents({
  //     click() {
  //       map.locate();
  //     },
  //     locationfound(e) {
  //       setPosition(e.latlng); // Simpan posisi
  //       console.log('Latitude:', e.latlng.lat, 'Longitude:', e.latlng.lng); // Log koordinat
  //       map.flyTo(e.latlng, map.getZoom());
  //     },
  //   });

  //   return position === null ? null : (
  //     <Marker position={position}>
  //       <Popup>
  //         Latitude: {position.lat} <br />
  //         Longitude: {position.lng}
  //       </Popup>
  //     </Marker>
  //   );
  // }

  interface LocationData {
    name: string;
    province: string | null;
    city: string | null;
    district: string | null;
    village: string | null;
    postal_code: string;
    address: string;
    latitude: number | undefined;
    longitude: number | undefined;
  }

  const updateLocation = async (data: LocationData) => {
    const response = await axios.put(
      `http://localhost:3000/api/locations/${locationId}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data) {
      throw new Error('Failed to add location');
    }
    return response.data; // Langsung mengembalikan response
  };

  const mutation: UseMutationResult<any, Error, LocationData> = useMutation({
    mutationFn: updateLocation, // Gunakan `mutationFn` untuk menentukan fungsi
    onSuccess: (data: any) => {
      console.log('Location ad successfully:', data);
      queryClient.invalidateQueries({ queryKey: ['location'] });
      // onAddLocation(data);
    },
    onError: (error: Error) => {
      console.error('Failed to update location:', error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !selectedProvince ||
      !selectedCity ||
      !selectedDistrict ||
      !selectedVillage ||
      !selectedPostalCode ||
      !locationName ||
      !locationAddress ||
      !position
    ) {
      console.log('Please fill all required fields');
      return;
    }

    const data = {
      name: locationName, // Sesuai dengan `req.body.name`
      postal_code: selectedPostalCode, // Sesuai dengan `req.body.postal_code`
      address: locationAddress, // Sesuai dengan `req.body.address`
      village: getLabelByValue(villages, selectedVillage), // Sesuai dengan `req.body.village`
      district: getLabelByValue(districts, selectedDistrict), // Sesuai dengan `req.body.district`
      city: getLabelByValue(cities, selectedCity), // Sesuai dengan `req.body.city`
      province: getLabelByValue(provinces, selectedProvince), // Sesuai dengan `req.body.province`
      latitude: position.lat, // Sesuai dengan `req.body.latitude`
      longitude: position.lng, // Sesuai dengan `req.body.longitude`
    };

    console.log(data);

    mutation.mutate(data);
  };

  return (
    <>
      <Box>
        <DialogRoot>
          <DialogTrigger asChild>
            <MdEditLocationAlt style={{ fontSize: '20px' }} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Text fontWeight="600" fontSize="15px" mb="7px">
                Location Name*
              </Text>
              <Input
                mb="7px"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
              />

              <Text fontWeight="600" fontSize="15px" mb="7px">
                Provinsi*
              </Text>
              {/* menu input kota/kecamatan */}
              <select
                className="mt-1  w-full rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                style={{ height: '40px', padding: '3px' }}
                onChange={(e) => {
                  setSelectedProvince(e.target.value);

                  // Reset nilai terkait
                  setSelectedCity(null);
                  setSelectedDistrict(null);
                  setSelectedVillage(null);
                  setselectedPostalCode(null);

                  // Kosongkan opsi kota, kecamatan, dan kelurahan
                  setCities([]);
                  setDistricts([]);
                  setVillages([]);
                  setPostalCodes([]);
                }}
              >
                <option value="">Pilih Provinsi</option>
                {provinces.length === 0 ? (
                  <p>Loading provinces...</p>
                ) : (
                  provinces.map((province) => (
                    <option key={province.value} value={province.value}>
                      {province.label}
                    </option>
                  ))
                )}
              </select>

              <Text fontWeight="600" fontSize="15px" mb="7px">
                Kota/Kabupaten*
              </Text>
              {/* menu input kota/kecamatan */}
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                style={{ height: '40px', padding: '3px' }}
                value={selectedCity || ''}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  // Reset nilai terkait
                  setSelectedDistrict(null);
                  setSelectedVillage(null);
                  setselectedPostalCode(null);

                  // Kosongkan opsi kota, kecamatan, dan kelurahan
                  setDistricts([]);
                  setVillages([]);
                  setPostalCodes([]);
                }}
                disabled={!selectedProvince}
              >
                <option value="">Pilih Kota/Kabupaten</option>
                {cities.length > 0 ? (
                  cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading cities...</option>
                )}
              </select>

              <Text fontWeight="600" fontSize="15px" mb="7px">
                Kecamatan*
              </Text>
              {/* menu input kota/kecamatan */}
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                style={{ height: '40px', padding: '3px' }}
                value={selectedDistrict || ''}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedVillage(null);
                  setselectedPostalCode(null);

                  setVillages([]);
                  setPostalCodes([]);
                }}
                disabled={!selectedCity}
              >
                <option value="">Pilih Kecamatan</option>
                {districts.length > 0 ? (
                  districts.map((district) => (
                    <option key={district.value} value={district.value}>
                      {district.label}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading districts...</option>
                )}
              </select>

              <Text fontWeight="600" fontSize="15px" mb="7px">
                Kelurahan*
              </Text>
              {/* menu input kota/kecamatan */}
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                style={{ height: '40px', padding: '3px' }}
                value={selectedVillage || ''}
                onChange={(e) => {
                  setSelectedVillage(e.target.value);
                  setselectedPostalCode(null);
                  setPostalCodes([]);
                }}
                disabled={!selectedDistrict}
              >
                <option value="">Pilih Kelurahan</option>
                {villages.length > 0 ? (
                  villages.map((village) => (
                    <option key={village.value} value={village.value}>
                      {village.label}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading villages...</option>
                )}
              </select>

              <Text fontWeight="600" fontSize="15px" mb="7px">
                Kode Pos*
              </Text>
              {/* menu input Kode pos */}
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                style={{ height: '40px', padding: '3px' }}
                value={selectedPostalCode || ''}
                onChange={(e) => setselectedPostalCode(e.target.value)}
                disabled={!selectedVillage}
              >
                <option value="">Pilih Kode Pos</option>
                {villages.length > 0 ? (
                  villages.map((village) => (
                    <option key={village.value} value={village.postCode}>
                      {village.postCode}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading villages...</option>
                )}
              </select>

              <Text fontWeight="600" fontSize="15px" mb="7px">
                Alamat Lengkap*
              </Text>
              <Textarea
                mb="7px"
                value={locationAddress}
                onChange={(e) => setLocationAddress(e.target.value)}
              />
              <Text fontWeight="600" fontSize="15px" mb="7px">
                Pinpoint Lokasi*
              </Text>

              <Button colorScheme="blue" onClick={handleGetLocation}>
                <FaLocationDot size="15px" /> Get My Location
              </Button>

              <Text fontWeight="400" fontSize="13px" mb="7px">
                Tandai lokasi untuk mempermudah pemintaan pickup kurir{' '}
              </Text>
              {position && (
                <div>
                  <Text fontWeight="400" fontSize="13px" mb="7px">
                    Latitude: {position.lat} | Longitude: {position.lng}
                  </Text>
                </div>
              )}
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>
              <Button bgColor="#2400FE" color="white" onClick={handleSubmit}>
                Save
              </Button>
            </DialogFooter>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>
      </Box>
    </>
  );
};

export default DialogEditLocation;
