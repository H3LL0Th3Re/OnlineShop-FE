import { Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { Button } from './ui/button';
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
} from './ui/dialog';
import { formatPrice } from '@/utils/format-price';
import { useState } from 'react';

const couriers = [
  {
    name: 'IDexpress',
    type: 'reguler',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 57000,
  },
  {
    name: 'JnE',
    type: 'eksekutive',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 25000,
  },
  {
    name: 'Tiki',
    type: 'reguler',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 30000,
  },
  {
    name: 'Sicepat',
    type: 'eksekutive',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 40000,
  },
];

export default function DialogShipmentCheckout() {

     const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>Select Shipment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Your Shipment</DialogTitle>
        </DialogHeader>
       
          <DialogBody >
          {couriers.map((courier) => (
            <Box  gap="1" mb="8px" p="1"
            onClick={() => setSelectedShipment(courier.name)}
            cursor="pointer"
            bg={selectedShipment === courier.name ? 'blue.100' : 'white'} 
            borderWidth="1px"
            borderColor={selectedShipment === courier.name ? 'blue.500' : 'gray.200'} 
            borderRadius="8px"
            >
              <HStack  w="full">
                <Image src={courier.image} h="100px" w="100px" borderRadius="8px"/>
                <VStack w="full">
                  <Text w="full" fontSize="17px"> {courier.name}</Text>
                  <Text w="full" color="grey"> {courier.type}</Text>
                </VStack>
                <Text w="full" textAlign="right" fontSize="17px" fontWeight="600"> Rp {formatPrice(courier.price)}</Text>
              </HStack>
            </Box>
            ))}
          </DialogBody>
        

        
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
