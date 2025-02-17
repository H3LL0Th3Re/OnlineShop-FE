import DialogShipmentCheckout from '@/components/dialog-shipment-checkout';
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
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
// import { useState } from 'react';
import { RiShoppingBag4Line } from 'react-icons/ri';
import Cookies from 'js-cookie';
import { useState } from 'react';
import 'midtrans-snap';

export default function CheckoutProduct() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [sub_district, setSub_district] = useState('');
  const [postal_code, setPostal_code] = useState('');
  const [detail_address, setDetail_address] = useState('');
  const [paymentLink, setPaymentLink] = useState('');
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
  //   script.setAttribute('data-client-key', 'SB-Mid-client-4omBGFxKlAqOqhRu'); // Replace with actual client key
  //   document.body.appendChild(script);
  // }, []);
  const token = Cookies.get('token');

  async function onSubmit(
    productName: string,
    price: number,
    quantity: number
  ) {
    try {
      const order_response = await axios.post(apiURL + '/order/add-order', {
        origin_contact_name: 'jack',
        origin_contact_phone: '029319321',
        origin_contact_email: 'jack@mail.com',
        origin_address: 'pajeet street',
        origin_postal_code: '12240',
        destination_contact_name: name,
        destination_contact_phone: phone_number,
        destination_contact_email: email,
        destination_address: `${detail_address}, ${province}, ${district}, ${sub_district}, ${city}`,
        destination_postal_code: postal_code,
        courier_company: 'jne',
        courier_type: 'reg',
        delivery_type: 'now',
        order_note: 'please be Careful',
        items: [
          {
            name: 'pajeet food',
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

      // const service_charge = (price * quantity * 1) / 100;

      // const invoice_response = await axios.post(
      //   apiURL + '/invoice/create-invoice',
      //   {
      //     status: 'pending',
      //     prices: price * quantity,
      //     service_charge: service_charge,
      //     receiver_city: city,
      //     receiver_province: province,
      //     receiver_subDistrict: sub_district,
      //     receiver_district: district,
      //     receiver_phone: phone_number,
      //     receiver_name: name,
      //     receiver_postalCode: postal_code,
      //     receiver_detailAddress: detail_address,
      //     receiver_email: email,
      //     // cartsId: 'cdqdwir39232',
      //     userId: 'cm71m960c0007tarc0pnj62eb',
      //     order_id: order_response.data.orderId,
      //     // paymentsId: 'joewjfiewjfiwf',
      //     // courierId: 'wqeijeiqejei',
      //   },
      //   {
      //     headers: {
      //       Authorization: `bearer ${token}`,
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // );

      // const invoice_history_response = await axios.post(
      //   apiURL + '/invoice-history/create-invoice-history',
      //   {
      //     invoice_id: invoice_response.data.invoice_created.id,
      //   }
      // );
      // console.log('invoice_history created: ', invoice_history_response.data);

      const response = await axios.post(
        apiURL + '/transaction/create-transaction',
        {
          id: order_response.data.orderId,
          productName,
          price,
          quantity,
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
      // if (window.snap) {
      //   window.snap.pay(snapToken, {
      //     onSuccess: async function (result) {
      //       try {
      //         console.log('Payment Success:', result);
      //         alert('Payment successful!');
      //       } catch (error) {
      //         console.error('Error processing payment:', error);
      //         // Handle error appropriately
      //       }
      //     },
      //     onPending: function (result) {
      //       console.log('Payment Pending:', result);
      //       alert('Payment pending. Complete the payment to continue.');
      //     },
      //     onError: function (result) {
      //       console.log('Payment Error:', result);
      //       alert('Payment failed. Try again.');
      //     },
      //     onClose: function () {
      //       alert('Payment window closed.');
      //     },
      //   });
      // } else {
      //   alert('Midtrans SDK not loaded.');
      // }
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
  return (
    <Box p="0" m="0">
      <Box p="2" m="5px" bg="white">
        <Text fontSize="20px" fontWeight="600">
          Checkout Product
        </Text>
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
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Field>
                </VStack>
                <VStack w="50%">
                  <Field textAlign="left" w="full" required label="Email">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Field>
                </VStack>
              </HStack>
              <VStack w="full">
                <Field textAlign="left" w="full" required label="Phone Number">
                  <Input
                    type="number"
                    value={phone_number}
                    onChange={(e) => setPhone_number(e.target.value)}
                  />
                </Field>
              </VStack>
              <Field textAlign="left" w="full" required label="Province">
                <Input
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </Field>

              <Field textAlign="left" w="full" required label="City">
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              </Field>

              <Field textAlign="left" w="full" required label="District">
                <Input
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </Field>
              <Field textAlign="left" w="full" required label="Subdistrict">
                <Input
                  value={sub_district}
                  onChange={(e) => setSub_district(e.target.value)}
                />
              </Field>
              <Field textAlign="left" w="full" required label="Postal Code">
                <Input
                  type="number"
                  value={postal_code}
                  onChange={(e) => setPostal_code(e.target.value)}
                />
              </Field>
              <Field textAlign="left" w="full" required label="Detail Address">
                <Textarea
                  h="150px"
                  value={detail_address}
                  onChange={(e) => setDetail_address(e.target.value)}
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
                    <Box w="full" h="full" p="2">
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
                  onSubmit(
                    // Replace with dynamic order ID
                    'hp murah', // Replace with dynamic product name
                    800000, // Replace with dynamic price
                    2 // Replace with dynamic quantity
                  )
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
