import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { Button } from './ui/button';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogRoot,
  DialogTrigger,
} from './ui/dialog';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import { formatPrice } from '@/utils/format-price';
import { Checkout_Product } from '@/types/product-type';

export interface Courier {
  courier_code: string;
  courier_service_name: string;
  courier_service_code: string;
  shipment_duration_range: string;
  shipment_duration_unit: string;
  price: number;
}

interface DialogShipmentCheckoutProps {
  selectedShipment: Courier | null;
  onSelectShipment: (shipmentData: Courier | null) => void; // Pastikan menerima Courier | null
}

export default function DialogShipmentCheckout({
  selectedShipment,
  onSelectShipment,
}: DialogShipmentCheckoutProps) {
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [responseOrder, setResponseOrder] = useState<any>('');
  const [product, setProduct] = useState<Checkout_Product | null>(null);

  useEffect(() => {
    const productData = localStorage.getItem('selectedProduct');
    if (productData) {
      setProduct(JSON.parse(productData));
    }
  }, []);

  const productName = product?.name || '';
  const price = product?.price || 0;
  const quantity = product?.quantity || 1;
  const weight = product?.weight || 0;

  const courierImages: { [key: string]: string } = {
    gojek:
      'https://cdn.antaranews.com/cache/1200x800/2020/10/03/Gojek-simbol.jpg',
    grab: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/74/e0/4a/74e04a86-94bd-fc99-d853-836fcbfa00bf/GrabIcon-0-0-1x_U007emarketing-0-5-0-0-85-220.png/1200x630wa.png',
    jne: 'https://asset.kompas.com/crops/b69bSXp1n7COYJrBlDdB5nFZDZ0=/87x58:785x523/1200x800/data/photo/2019/06/01/431914915.jpg',
    jnt: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_J%26T_Merah_Square.jpg',
    tiki: 'https://www.julo.co.id/sites/default/files/2024-10/franchise%20TIKI.webp',
  };

  useEffect(() => {
    const IwillHaveOrder = async () => {
      const orderId = localStorage.getItem('order_id_response');
      if (!orderId) {
        console.error('Order ID is missing in localStorage.');
        return;
      }
      try {
        const getOrderResponse = await axios.get(apiURL + `/order/${orderId}`);
        setResponseOrder(getOrderResponse.data.order);
      } catch (error) {
        console.error('Error retrieving the order:', error);
      }
    };

    IwillHaveOrder();
  }, []);

  useEffect(() => {
    if (!responseOrder) return;

    const fetchCouriers = async () => {
      try {
        console.log('this is my response order', responseOrder);
        const originAreaId = responseOrder.origin?.area_id;
        const destinationAreaId = responseOrder.destination?.area_id;

        const response = await axios.post(apiURL + '/courier/rates', {
          origin_area_id: originAreaId,
          destination_area_id: destinationAreaId,
          couriers: 'gojek,grab,jne,jnt,tiki',
          items: [
            {
              name: productName,
              description: 'Product Description',
              value: price,
              length: 0,
              width: 0,
              height: 0,
              weight: weight,
              quantity: quantity,
            },
          ],
        });

        if (Array.isArray(response.data.biteShip.pricing)) {
          setCouriers(response.data.biteShip.pricing);
        } else {
          console.error(
            'Received data is not an array:',
            response.data.biteShip.pricing
          );
          setCouriers([]);
        }
      } catch (error) {
        console.error('Error fetching couriers:', error);
        setCouriers([]);
      }
    };

    fetchCouriers();
  }, [responseOrder]);

  const createCourierUniqueKey = (courier: Courier) => {
    return `${courier.courier_code}-${courier.courier_service_name}`;
  };

  const handleSelectShipment = (courier: Courier | null) => {
    // Jika sudah ada yang dipilih, set ke null (untuk membatalkan pemilihan pengiriman)
    if (
      selectedShipment &&
      createCourierUniqueKey(selectedShipment) ===
        createCourierUniqueKey(courier!)
    ) {
      onSelectShipment(null);
    } else {
      onSelectShipment(courier); // Jika belum dipilih, pilih courier
    }
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline" bgColor="#2400FE" color="white">
          Select Shipment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Your Shipment</DialogTitle>
        </DialogHeader>

        <DialogBody>
          {couriers.length === 0 ? (
            <Text>No couriers available.</Text>
          ) : (
            couriers.map((courier: Courier) => {
              const logoUrl = courierImages[courier.courier_code];
              const isSelected =
                selectedShipment &&
                createCourierUniqueKey(selectedShipment) ===
                  createCourierUniqueKey(courier);

              return (
                <Box
                  key={courier.courier_code}
                  gap="1"
                  mb="8px"
                  p="1"
                  onClick={() => handleSelectShipment(courier)} // Memilih pengiriman atau membatalkan pilihan
                  cursor="pointer"
                  bg={isSelected ? 'blue.100' : 'white'}
                  borderWidth="1px"
                  borderColor={isSelected ? 'blue.500' : 'gray.200'}
                  borderRadius="8px"
                >
                  <HStack w="full">
                    <Image
                      src={logoUrl}
                      boxSize={'50px'}
                      alt={`${courier.courier_code} logo`}
                    />
                    <VStack w="full">
                      <Text w="full" fontSize="20px" fontWeight={'500'}>
                        {courier.courier_service_name}
                      </Text>
                      <Text w="full" color="grey" fontSize="15px">
                        {courier.courier_code} (
                        {courier.shipment_duration_range}{' '}
                        {courier.shipment_duration_unit})
                      </Text>
                    </VStack>
                    <Text
                      w="full"
                      textAlign="right"
                      fontSize="17px"
                      fontWeight="600"
                    >
                      Rp {formatPrice(courier.price)}
                    </Text>
                  </HStack>
                </Box>
              );
            })
          )}
        </DialogBody>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
