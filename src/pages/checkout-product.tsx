import DialogShipmentCheckout, {
  Courier,
} from '@/components/dialog-shipment-checkout';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { apiURL } from '@/utils/api-url';
import {
  Box,
  Flex,
  HStack,
  Image,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
// import { useState } from 'react';
import { DialogDataBuyer } from '@/components/dialog-data-buyer';
import { currentStore } from '@/features/get-store';
import { Checkout_Product } from '@/types/product-type';
import { formatPrice } from '@/utils/format-price';
import Cookies from 'js-cookie';
import 'midtrans-snap';
import { useEffect, useState } from 'react';
import { RiShoppingBag4Line } from 'react-icons/ri';
// import { NumberDomain } from 'recharts/types/util/types';

export default function CheckoutProduct() {
  const [responseOrder, setResponseOrder] = useState<any>('');
  const [selectedShipment, setSelectedShipment] = useState<Courier | null>(
    null
  );
  const [product, setProduct] = useState<Checkout_Product | null>(null);

  useEffect(() => {
    const productData = localStorage.getItem('selectedProduct');
    if (productData) {
      setProduct(JSON.parse(productData)); // Set the product from localStorage
    }
  }, []);

  const image = product?.attachments;
  const productName = product?.name || '';
  const price = product?.price || 0;
  const quantity = product?.quantity || 1;
  const weight = product?.weight || 0;
  const variants = product?.selectedOptions;
  const totalPrice = price * quantity;
  const shipping = selectedShipment?.price || 0;
  const serviceFee = (1 / 100) * totalPrice;
  const subTotalPrice = totalPrice + shipping + serviceFee;

  useEffect(() => {}, [product]);

  const [paymentLink, setPaymentLink] = useState('');

  const token = Cookies.get('token');
  const store_response = currentStore(token || '');
  console.log('my response store', store_response);

  const handleShipmentSelection = (shipmentData: Courier | null) => {
    setSelectedShipment(shipmentData);
  };

  async function onSubmit(
    productName: string,
    price: number,
    quantity: number,
    shipping: number,
    serviceFee: number
  ) {
    try {
      // console.log("draft order id", localStorage.getItem("order_id_response"))

      const order_response = await axios.put(apiURL + '/order/update-order', {
        orderid: localStorage.getItem('order_id_response'),
        courier_company: 'jne',
        courier_type: 'reg',
        delivery_type: 'now',
        order_note: 'please be Careful',
        items: [
          {
            name: productName,
            description: 'cow is sacred saar',
            value: price,
            quantity: quantity,
            height: 0,
            length: 0,
            weight: weight,
            width: 0,
          },
        ],
      });

      // if (formData) {
      //   axios.post("http://localhost:3000/api/save-data", JSON.stringify(formData))
      //     .then(response => console.log("Data sent successfully:", response.data))
      //     .catch(error => console.error("Error sending data:", error));
      // }

      const response = await axios.post(
        apiURL + '/transaction/create-transaction',
        {
          id: order_response.data.orderId,
          productName,
          price,
          quantity,
          shipment: shipping,
          service_charge: serviceFee,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const snapToken = response.data.token.token; // Expect snapToken from backend
      const redirect_pay = response.data.token.redirect_url;
      console.log(snapToken);
      console.log(redirect_pay);

      if (redirect_pay) {
        setPaymentLink(redirect_pay); // Store the link in state
        alert('payment link created');
      } else {
        alert('Failed to generate payment link.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          message: error.response?.data.message || 'Error updating message',
        };
      } else {
        return { message: 'An error occurred while updating message.' };
      }
    }
  }
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
        return getOrderResponse.data.order;
      } catch (error) {
        console.error('Error retrieving the order:', error);
      }
    };

    IwillHaveOrder();
  }, []);
  console.log('response order:', responseOrder);

  const courierImages: { [key: string]: string } = {
    gojek:
      'https://cdn.antaranews.com/cache/1200x800/2020/10/03/Gojek-simbol.jpg',
    grab: 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/74/e0/4a/74e04a86-94bd-fc99-d853-836fcbfa00bf/GrabIcon-0-0-1x_U007emarketing-0-5-0-0-85-220.png/1200x630wa.png',
    jne: 'https://asset.kompas.com/crops/b69bSXp1n7COYJrBlDdB5nFZDZ0=/87x58:785x523/1200x800/data/photo/2019/06/01/431914915.jpg',
    jnt: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Logo_J%26T_Merah_Square.jpg',
    tiki: 'https://www.julo.co.id/sites/default/files/2024-10/franchise%20TIKI.webp',
  };

  return (
    <Box p="0" m="0">
      <Box p="2" m="5px" bg="white">
        <Text fontSize="20px" fontWeight="600">
          Checkout Product
        </Text>
        <HStack mt="3" gap="10" display={'flex'} alignItems={'flex-start'}>
          <Box w="60%" h="full" spaceY={5}>
            <Box p={3} borderWidth="1px" borderColor="grey" borderRadius="10px">
              <HStack
                w={'full'}
                display={'flex'}
                justifyContent={'space-between'}
              >
                <Text fontSize={'20px'} fontWeight="600">
                  Buyer Informations
                </Text>
                <DialogDataBuyer />
              </HStack>
              <HStack>
                <Text fontWeight={'500'}>
                  {responseOrder.destination?.contact_name}
                </Text>{' '}
                |<Text>{responseOrder.destination?.contact_phone}</Text>
              </HStack>
              <Text>{responseOrder.destination?.contact_email}</Text>
              <Text>{responseOrder.destination?.address}</Text>
              <Text>{responseOrder.destination?.postal_code}</Text>
            </Box>
            <Box p={3} borderWidth="1px" borderColor="grey" borderRadius="10px">
              <Text fontSize={'20px'} fontWeight="600">
                Detail Shipment
              </Text>
              <HStack>
                {selectedShipment && (
                  <Image
                    src={courierImages[selectedShipment.courier_code]}
                    boxSize="50px"
                    alt={`${selectedShipment.courier_service_name} logo`}
                  />
                )}
                {selectedShipment && (
                  <HStack
                    mt="4"
                    display={'flex'}
                    w={'full'}
                    justifyContent={'space-between'}
                  >
                    <Box>
                      <Text fontSize={'xl'}>
                        {selectedShipment.courier_service_name}
                      </Text>
                      <Text>
                        {selectedShipment.courier_code} (
                        {selectedShipment.shipment_duration_range}{' '}
                        {selectedShipment.shipment_duration_unit})
                      </Text>
                    </Box>
                    <Text fontWeight={'500'} fontSize={'3xl'}>
                      Rp {formatPrice(selectedShipment.price)}
                    </Text>
                  </HStack>
                )}
              </HStack>
            </Box>
            <Box p={3} borderWidth="1px" borderColor="grey" borderRadius="10px">
              <Field label="Notes">
                <Textarea
                  placeholder="Enter your request to product"
                  h="80px"
                />
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
                  src={image}
                  borderRadius="5px"
                />
                <VStack gap="1" align="flex-start">
                  <Text fontSize="14px" fontWeight="500">
                    {productName}
                  </Text>
                  <HStack w="full">
                    <Text color={'blue.700'}>
                      {variants?.length} Variants Selected
                    </Text>
                  </HStack>
                  <Text fontSize="15px" fontWeight="700" w="full">
                    Rp {formatPrice(price)}
                  </Text>
                  <Text>Quantity: {quantity}</Text>
                  <DialogShipmentCheckout
                    selectedShipment={selectedShipment}
                    onSelectShipment={handleShipmentSelection}
                  />
                  {/* <Button>Select Shipment</Button> */}
                </VStack>
              </HStack>
            </Box>

            <Box m="2">
              <AccordionRoot
                collapsible
                defaultValue={['subtotal']}
                borderBottomColor="gray"
                borderBottomWidth="1px"
              >
                <AccordionItem value="subtotal">
                  <AccordionItemTrigger p="2">
                    <Flex w="full" h="full" justify="space-between">
                      <Text>Subtotal</Text>
                      <Text>Rp {formatPrice(subTotalPrice)}</Text>
                    </Flex>
                  </AccordionItemTrigger>
                  <AccordionItemContent>
                    <Box w="full" h="full" p="2">
                      <Flex w="full" h="full" justify="space-between">
                        <Text>Item Price</Text>
                        <Text>Rp {formatPrice(totalPrice)}</Text>
                      </Flex>
                    </Box>
                    <Box w="full" h="full" p="2">
                      <Flex w="full" h="full" justify="space-between">
                        <Text>Shipping subtotal</Text>
                        <Text>Rp {formatPrice(shipping)}</Text>
                      </Flex>
                    </Box>
                    <Box w="full" h="full" p="2">
                      <Flex w="full" h="full" justify="space-between">
                        <Text>Buyer Service Fee(1%)</Text>
                        <Text>Rp {formatPrice(serviceFee)}</Text>
                      </Flex>
                    </Box>
                  </AccordionItemContent>
                </AccordionItem>
              </AccordionRoot>
            </Box>
            <Box m="2px" p="2">
              <Field label="Notes">
                <Textarea
                  placeholder="Enter your request to product"
                  h="80px"
                />
              </Field>
            </Box>
            <Box p="2" w="full" display="flex" justifyContent="flex-end">
              <Button
                bgColor="#2400FE"
                color="white"
                onClick={() =>
                  onSubmit(productName, price, quantity, shipping, serviceFee)
                }
              >
                Checkout Now
              </Button>

              {paymentLink && (
                <Box mt="4" p="2" bg="gray.100" borderRadius="md">
                  <Text fontWeight="bold">Payment Link:</Text>
                  <a
                    href={paymentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'blue', textDecoration: 'underline' }}
                  >
                    Click Here to Pay
                  </a>
                </Box>
              )}
            </Box>
          </Box>
        </HStack>
      </Box>
    </Box>
  );
}
