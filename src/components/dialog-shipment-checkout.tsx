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

interface Courier {
  courier_code: string;
  courier_service_name: string;
  courier_service_code: string;
  shipping_type?: string; // optional field if shipping type exists
}

export default function DialogShipmentCheckout() {
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  const [couriers, setCouriers] = useState<Courier[]>([]);

  // Image URLs for couriers
  const courierImages: { [key: string]: string } = {
    gojek:
      'https://cdn.antaranews.com/cache/1200x800/2020/10/03/Gojek-simbol.jpg',
    grab: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/74/e0/4a/74e04a86-94bd-fc99-d853-836fcbfa00bf/GrabIcon-0-0-1x_U007emarketing-0-5-0-0-85-220.png/1200x630wa.png',
    jne: 'https://asset.kompas.com/crops/b69bSXp1n7COYJrBlDdB5nFZDZ0=/87x58:785x523/1200x800/data/photo/2019/06/01/431914915.jpg',
    jnt: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_J%26T_Merah_Square.jpg',
    tiki: 'https://www.julo.co.id/sites/default/files/2024-10/franchise%20TIKI.webp',
  };

  useEffect(() => {
    const fetchCouriers = async () => {
      try {
        const response = await axios.get(apiURL + '/courier/seeder');

        if (Array.isArray(response.data.data)) {
          setCouriers(response.data.data);
        } else {
          console.error('Received data is not an array:', response.data.data);
          setCouriers([]);
        }
      } catch (error) {
        console.error('Error fetching couriers:', error);
        setCouriers([]);
      }
    };

    fetchCouriers();
  }, []);

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
            <Text>No couriers available.</Text> // Display a message if no couriers are loaded
          ) : (
            couriers.map((courier: Courier) => {
              // Get the logo URL from the courierImages object
              const logoUrl = courierImages[courier.courier_code];

              return (
                <Box
                  key={courier.courier_code} // Using courier_code as a unique key
                  gap="1"
                  mb="8px"
                  p="1"
                  onClick={() =>
                    setSelectedShipment(courier.courier_service_name)
                  }
                  cursor="pointer"
                  bg={
                    selectedShipment === courier.courier_service_name
                      ? 'blue.100'
                      : 'white'
                  }
                  borderWidth="1px"
                  borderColor={
                    selectedShipment === courier.courier_service_name
                      ? 'blue.500'
                      : 'gray.200'
                  }
                  borderRadius="8px"
                >
                  <HStack w="full">
                    {/* Image component with the URL from courierImages */}
                    <Image
                      src={logoUrl}
                      boxSize={'50px'}
                      alt={`${courier.courier_code} logo`}
                    />
                    <VStack w="full">
                      <Text w="full" fontSize="20px" fontWeight={'500'}>
                        {courier.courier_service_name}
                      </Text>
                      <Text w="full" color="grey">
                        {courier.courier_code}
                      </Text>
                    </VStack>
                    <Text
                      w="full"
                      textAlign="right"
                      fontSize="17px"
                      fontWeight="600"
                    >
                      {courier.shipping_type
                        ? `Shipping Type: ${courier.shipping_type}`
                        : 'No price available'}
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
