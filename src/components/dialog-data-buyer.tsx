'use client';

import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
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
import { Field } from '@/components/ui/field';
import { currentStore } from '@/features/get-store';
import axios from 'axios';
import Cookies from 'js-cookie';
import { apiURL } from '@/utils/api-url';
import { Checkout_Product } from '@/types/product-type';

export const DialogDataBuyer = () => {
  const token = Cookies.get('token');
  const [product, setProduct] = useState<Checkout_Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    province: '',
    city: '',
    district: '',
    sub_district: '',
    postal_code: '',
    detail_address: '',
  });
  interface DropdownOption {
    label: string;
    value: string;
    postCode?: string;
  }

  const [provinces, setProvinces] = useState<DropdownOption[]>([]);
  const [cities, setCities] = useState<DropdownOption[]>([]);
  const [districts, setDistricts] = useState<DropdownOption[]>([]);
  const [villages, setVillages] = useState<DropdownOption[]>([]);
  const [, setPostalCodes] = useState<DropdownOption[]>([]);

  const getLabelByValue = (options: DropdownOption[], value: string | null) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : null;
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      if (token) {
        try {
          const response = await fetch(
            `${apiURL}/api/locations/api/provinces`,
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
            `${apiURL}/locations/api/cities/${provinceCode}`,
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

    if (formData.province) {
      fetchCities(formData.province);
    }
  }, [formData.province, token]);

  useEffect(() => {
    const fetchDistricts = async (cityCode: string) => {
      if (cityCode && token) {
        try {
          const response = await fetch(
            `${apiURL}/locations/api/districts/${cityCode}`,
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

    if (formData.city) {
      fetchDistricts(formData.city);
    }
  }, [formData.city, token]);

  useEffect(() => {
    const fetchVillages = async (districtCode: string) => {
      if (districtCode && token) {
        try {
          const response = await fetch(
            `${apiURL}/locations/api/villages/${districtCode}`,
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

    if (formData.district) {
      fetchVillages(formData.district);
    }
  }, [formData.district, token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const productData = localStorage.getItem('selectedProduct');
    if (productData) {
      setProduct(JSON.parse(productData)); // Set the product from localStorage
    }
  }, []);

  const productName = product?.name || ''; // Default to empty string if no product
  const price = product?.price || 0;
  const quantity = product?.quantity || 1;

  const store_response = currentStore(token || '');
  console.log('my response store', store_response);
  async function location_fetch() {
    const location_response = await axios.get(apiURL + '/locations', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('lokasi store', location_response.data.location[0]);
    return location_response.data.location[0];
  }
  const response_location = location_fetch();

  async function user_fetch() {
    const user_response = await axios.get(apiURL + '/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return user_response.data.user[0];
  }
  const response_user = user_fetch();

  async function onSubmit(
    productName: string,
    price: number,
    quantity: number
  ) {
    console.log('Form Data Before Sending:', formData);
    console.log('Destination Email:', formData.email);

    const order_response = await axios.post(apiURL + '/order/add-order', {
      origin_contact_name: (await store_response).name,
      origin_contact_phone: (await response_user).phone_number,
      origin_contact_email: (await response_user).email,
      origin_address: `${(await response_location).city_district}, ${(await response_location).address}`,
      origin_postal_code: (await response_location).postal_code,
      destination_contact_email: formData.email,
      destination_contact_name: formData.name,
      destination_contact_phone: formData.phone_number,
      destination_address: `${formData.detail_address}, ${getLabelByValue(provinces, formData.province)}, ${getLabelByValue(districts, formData.district)}, ${getLabelByValue(villages, formData.sub_district)}, ${getLabelByValue(cities, formData.city)}`,
      destination_postal_code: formData.postal_code,
      delivery_type: 'now',
      items: [
        {
          name: productName,
          description: 'cow is sacred saar',
          value: price,
          quantity: quantity,
          height: 200,
          length: 200,
          weight: 200,
          width: 200,
        },
      ],
    });

    localStorage.setItem('order_id_response', order_response.data.orderId);
    console.log(JSON.stringify(order_response.data));
  }

  const [open, setOpen] = useState(false);
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box p="3">
            <Text>Shipping Information</Text>
            <HStack w="full">
              <VStack w="50%">
                <Field textAlign="left" w="full" required label="Nama">
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </Field>
              </VStack>
              <VStack w="50%">
                <Field textAlign="left" w="full" required label="Email">
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Field>
              </VStack>
            </HStack>
            <VStack w="full">
              <Field textAlign="left" w="full" required label="Phone Number">
                <Input
                  name="phone_number"
                  type="number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                />
              </Field>
            </VStack>
            <Field textAlign="left" w="full" required label="Province">
              {/* menu input kota/kecamatan */}
              <select
                className="mt-1 w-full rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                style={{ height: '40px', padding: '3px' }}
                value={formData.province}
                onChange={(e) => {
                  const selectedProvince = e.target.value;

                  // Update formData with selected province
                  setFormData((prevData) => ({
                    ...prevData,
                    province: selectedProvince,
                    city: '', // Reset city when province changes
                    district: '', // Reset district
                    sub_district: '', // Reset sub_district
                    postal_code: '', // Reset postal_code
                    detail_address: '', // Optionally reset the address field
                  }));

                  // Reset cities, districts, villages, and postalCodes
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
            </Field>

            <Field textAlign="left" w="full" required label="City">
              {/* menu input kota/kecamatan */}
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                style={{ height: '40px', padding: '3px' }}
                value={formData.city || ''}
                onChange={(e) => {
                  const selectedCity = e.target.value;

                  // Update formData with selected city
                  setFormData((prevData) => ({
                    ...prevData,
                    city: selectedCity,
                    district: '', // Reset district when city changes
                    sub_district: '', // Reset sub_district
                    postal_code: '', // Reset postal_code
                    detail_address: '', // Optionally reset the address field
                  }));

                  // Reset districts, villages, and postalCodes
                  setDistricts([]);
                  setVillages([]);
                  setPostalCodes([]);
                }}
                disabled={!formData.province} // Disable city selection until a province is selected
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
            </Field>

            <Field textAlign="left" w="full" required label="District">
              {/* menu input kecamatan */}
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                style={{ height: '40px', padding: '3px' }}
                value={formData.district || ''}
                onChange={(e) => {
                  const selectedDistrict = e.target.value;
                  setFormData((prevData) => ({
                    ...prevData,
                    district: selectedDistrict,
                    sub_district: '', // Reset sub_district when district changes
                    postal_code: '', // Reset postal_code
                    detail_address: '', // Optionally reset the address field
                  }));

                  setVillages([]); // Clear villages
                  setPostalCodes([]); // Clear postal codes
                }}
                disabled={!formData.city}
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
            </Field>
            <Field textAlign="left" w="full" required label="Subdistrict">
              {/* menu input kelurahan */}
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                style={{ height: '40px', padding: '3px' }}
                value={formData.sub_district || ''}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    sub_district: e.target.value,
                    postal_code: '', // Reset postal_code when sub_district changes
                  }));

                  setPostalCodes([]); // Clear postal codes
                }}
                disabled={!formData.district}
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
            </Field>
            <Field textAlign="left" w="full" required label="Postal Code">
              {/* menu input Kode Pos */}
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                style={{ height: '40px', padding: '3px' }}
                value={formData.postal_code || ''}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    postal_code: e.target.value,
                  }));
                }}
                disabled={!formData.sub_district}
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
            </Field>
            <Field textAlign="left" w="full" required label="Detail Address">
              <Textarea
                mb="7px"
                value={formData.detail_address || ''}
                onChange={(e) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    detail_address: e.target.value,
                  }));
                }}
              />
            </Field>
          </Box>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button
            bgColor="#2400FE"
            color="white"
            onClick={() => onSubmit(productName, price, quantity)}
          >
            Checkout Now
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
