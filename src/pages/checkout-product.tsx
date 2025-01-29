import DialogShipmentCheckout from '@/components/dialog-shipment-checkout';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import {
  Box,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { RiShoppingBag4Line } from 'react-icons/ri';

const products = [
  {
    id: 1,
    name: 'Hp iphone 13',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: '10000000',
    variant: [{ color: 'blue' }, { memory: '126 GB' }],
  },
  {
    id: 2,
    name: 'Hp iphone 11',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: '20000000',
    variant: [{ color: 'white' }, { memory: '256 GB' }],
  },
  {
    id: 3,
    name: 'Hp iphone 13',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: '30000000',
    variant: [{ color: 'grey' }, { memory: '512 GB' }],
  },
];

export default function CheckoutProduct() {
  return (
    <Box p="0" m="0">
      <Box p="2" m="5px" bg="white" >
        <Text fontSize="20px" fontWeight="600">Checkout Product</Text>
        <HStack mt="3" gap="10">
          <Box
            w="60%"
            h="full"
            borderWidth="1px"
            borderColor="grey"
            borderRadius="10px"
          >
            <Box p="3">
              <Text>Shipping Information</Text>
              <HStack w="full">
                <VStack w="50%">
                  <Field textAlign="left" w="full" required label="Nama">
                    <Input />
                  </Field>
                </VStack>
                <VStack w="50%">
                  <Field textAlign="left" w="full" required label="Email">
                    <Input type="email" />
                  </Field>
                </VStack>
              </HStack>
              <VStack w="full">
                <Field textAlign="left" w="full" required label="Phone Number">
                  <Input type="number" />
                </Field>
              </VStack>
              <Field textAlign="left" w="full" required label="Province">
                <Input />
              </Field>

              <Field textAlign="left" w="full" required label="City">
                <Input />
              </Field>

              <Field textAlign="left" w="full" required label="District">
                <Input />
              </Field>
              <Field textAlign="left" w="full" required label="Subdistrict">
                <Input />
              </Field>
              <Field textAlign="left" w="full" required label="Postal Code">
                <Input type="number" />
              </Field>
              <Field textAlign="left" w="full" required label="Subdistrict">
                <Input />
              </Field>
              <Field textAlign="left" w="full" required label="Detail Address">
                <Textarea h="150px" />
              </Field>
            </Box>
          </Box>

          <Box
            w="40%"
            h="fit"
            borderWidth="1px"
            borderColor="black"
            borderRadius="10px"
          >
            <Box bg="grey" borderRadius="10px" borderBottomRadius="0px">
              <HStack p="3">
                <RiShoppingBag4Line />
                <Text>Order</Text>
              </HStack>
            </Box>
            <Box
              p="2"
              h="fit"
              m="5px"
              borderBottomWidth="1px"
              borderColor="gray"
            >
              <HStack>
                <Image
                  height="130px"
                  width="100px"
                  src="https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
                  borderRadius="5px"
                />
                <VStack gap="1" align="flex-start">
                  <Text fontSize="14px" fontWeight="500">
                    HAPE BAGUS BAGUS NIH SILAHKAN DIPILIH
                  </Text>
                  <HStack w="full">
                    <Text>Variant 1</Text>
                    <Text>|</Text>
                    <Text>Variant 2</Text>
                    <Text>|</Text>
                    <Text>Variant 3</Text>
                  </HStack>
                  <Text fontSize="15px" fontWeight="700" w="full">
                    Rp 7.500.000
                  </Text>
                  <DialogShipmentCheckout />
                  {/* <Button>Select Shipment</Button> */}
                </VStack>
              </HStack>
            </Box>

            <Box m="2">
              <AccordionRoot collapsible defaultValue={['subtotal']} borderBottomColor="gray" borderBottomWidth="1px">
                <AccordionItem value="subtotal">
                  <AccordionItemTrigger p="2">
                    <Flex w="full" h="full" justify="space-between">
                      <Text>Subtotal</Text>
                      <Text>Rp 7.500.000</Text>
                    </Flex>
                  </AccordionItemTrigger>
                  <AccordionItemContent>
                    <Box w="full" h="full" p="2">
                      <Flex w="full" h="full" justify="space-between">
                        <Text>Item Price</Text>
                        <Text>Rp 7.500.000</Text>
                      </Flex>
                    </Box>
                    <Box w="full" h="full" p="2">
                      <Flex w="full" h="full" justify="space-between">
                        <Text>Shipping subtotal</Text>
                        <Text>Rp 7.500.000</Text>
                      </Flex>
                    </Box>
                    <Box  w="full" h="full" p="2">
                      <Flex w="full" h="full" justify="space-between">
                        <Text>Buyer Service Fee(1%)</Text>
                        <Text>Rp 7.500.000</Text>
                      </Flex>
                    </Box>
                  </AccordionItemContent>
                </AccordionItem>
              </AccordionRoot>
            </Box>
            <Box m="2px" p="2">
            <Field label="Notes"> 
              <Textarea placeholder="Enter your request to product" h="80px"/>
            </Field>
            </Box>
            <Box p="2" w="full" display="flex" justifyContent="flex-end" >
              <Button bgColor="#2400FE" color="white" >Checkout Now</Button>
            </Box>
            
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}
