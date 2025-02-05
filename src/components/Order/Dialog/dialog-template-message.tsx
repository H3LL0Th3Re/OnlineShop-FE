import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import Cookies from 'js-cookie';
import { useMessages } from '@/features/message_tanstack';
import { useState } from 'react';

const token = Cookies.get('token');

const getButtonStatus = (status: string) => {
  switch (status) {
    case 'Belum Dibayar':
      return 'Hubungi Pembeli';
    case 'Pesanan Baru':
      return 'Proses Pesanan';
    case 'Siap Dikirim':
      return 'Kabari Pembeli';
    case 'Dalam Pengiriman':
      return ' Lihat Rincian Pengiriman';
    case 'Pesanan Selesai':
      return 'Hubungi Pembeli';
    case 'Dibatalkan':
      return 'Hubungi Pembeli';
  }
};
interface DialogEditMessageProps {
  productid: string;
  status: string;
}
export default function DialogTemplateMessage({
  status,
  productid,
}: DialogEditMessageProps) {
  const [id, setId] = useState('');
  const { data: messages, isLoading, isError } = useMessages();
  const queryClient = useQueryClient();

  const sendViaWhatsApp = (message: string, phoneNumber: string) => {
    const formattedMessage = encodeURIComponent(message); // Encode message for URL
    console.log(formattedMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${formattedMessage}`;
    window.open(whatsappURL, '_blank'); // Open WhatsApp chat in a new tab
  };
  const mutation = useMutation({
    mutationFn: async ({
      id,
      productId,
    }: {
      id: string;
      productId: string;
    }) => {
      const response = await axios.post(
        `${apiURL}/message/detail-message`,
        { id, productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      //   console.log(sendViaWhatsApp(response.data.message_content.content, "628113440628"));
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      sendViaWhatsApp(data.message_data.content, '628113440628');
    },
  });
  // Handle loading and error states
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error fetching messages. Please try again later.</Text>;
  }
  const onSubmit = async (e: React.FormEvent) => {
    console.log('hello called');
    e.preventDefault();
    // if (!validateForm()) return;
    mutation.mutate({ id: id, productId: productid });
  };

  return (
    <Box>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button rounded="full" bg={'blue.600'}>
            {getButtonStatus(status)}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              These are the message templates displayed.
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <form onSubmit={onSubmit}>
              {messages?.map(
                (message: {
                  id: string;
                  content: string;
                  name: string;
                  storesId: string;
                }) => (
                  <Box
                    key={message.id} // Add a key for list rendering
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
                    <VStack w="90%" align="flex-start">
                      <Text fontWeight="600" fontSize="16px" w="full">
                        {message?.name}
                      </Text>
                      <Text
                        fontWeight="400"
                        fontSize="14px"
                        w="full"
                        textAlign="justify"
                      >
                        {message?.content}
                      </Text>
                    </VStack>
                    <VStack w="10%">
                      <HStack display="flex" justifyContent="center">
                        <Button
                          rounded="full"
                          bg={'blue.600'}
                          type="submit"
                          onClick={() => setId(message.id)}
                        >
                          Send
                        </Button>
                      </HStack>
                    </VStack>
                  </Box>
                )
              )}
            </form>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Close</Button>
            </DialogActionTrigger>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
