import {
  Box,
  Button,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
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
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import { LatLng } from "leaflet";

interface DropdownOption {
  label: string;
  value: string;
  postCode?: string;
}
export default function DialogAddLocation() {
  const [provinces, setProvinces] = useState<DropdownOption[]>([]);
  const [cities, setCities] = useState<DropdownOption[]>([]);
  const [districts, setDistricts] = useState<DropdownOption[]>([]);
  const [villages, setVillages] = useState<DropdownOption[]>([]);
  const [postalCodes, setPostalCodes] = useState<DropdownOption[]>([]);

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedVillage, setSelectedVillage] = useState<string | null>(null);
  const [selectedPostalCode, setselectedPostalCode] = useState<string | null>(
    null
  );
  const { token } = useAuthStore();

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

  function LocationMarker() {
    const [position, setPosition] = useState<LatLng | null>(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  return (
    <>
      <Box>
        <DialogRoot>
          <DialogTrigger asChild>
            <Button
              bgColor="white"
              color="black"
              rounded="full"
              borderWidth="1px"
              borderColor="black"
              fontWeight="700"
            >
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Location</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Text fontWeight="600" fontSize="15px" mb="7px">
                Location Name*
              </Text>
              <Input mb="7px" />

              <Text fontWeight="600" fontSize="15px" mb="7px">
                Provinsi*
              </Text>
              {/* menu input kota/kecamatan */}
              <select
                className="mt-1  w-full rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={selectedProvince || ''}
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
                value={selectedCity || ''}
                onChange={(e) => setSelectedCity(e.target.value)}
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
                value={selectedDistrict || ''}
                onChange={(e) => setSelectedDistrict(e.target.value)}
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
                value={selectedVillage || ''}
                onChange={(e) => setSelectedVillage(e.target.value)}
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
              <Textarea mb="7px" />
              <Text fontWeight="600" fontSize="15px" mb="7px">
                Pinpoint Lokasi*
              </Text>

              <Box style={{width:"100px", height:"100px"}} borderRadius="7px">
                <MapContainer
                  center={{ lat: 51.505, lng: -0.09 }}
                  zoom={15}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker />
                </MapContainer>
              </Box>

              <Text fontWeight="400" fontSize="13px" mb="7px">
                Tandai lokasi untuk mempermudah pemintaan pickup kurir{' '}
              </Text>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>
              <Button bgColor="#2400FE" color="white">
                Save
              </Button>
            </DialogFooter>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>
      </Box>
    </>
  );
}
