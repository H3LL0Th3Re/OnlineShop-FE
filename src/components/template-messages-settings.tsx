import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import DialogAddMessage from './dialog-add-message-settings';
import DialogEditMessage from './dialog-edit-message-settings';
import DialogDeleteMessage from './dialog-delete-message-settings';

const messages = [
  {
    name: 'Pesan Pembelian Produk',
    content: 'Terima kasih telah membeli produk',
  },
  {
    name: 'Pesan Pembelian Produk',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget convallis arcu. Phasellus quis egestas lorem. Aliquam finibus porttitor justo ac feugiat. Donec eget justo purus. Pellentesque ut viverra nunc. Donec finibus feugiat ipsum eget dictum. Pellentesque ornare, lacus non commodo consequat, arcu eros pellentesque eros, eget luctus libero sem sit amet quam. Morbi id vestibulum ligula, eget interdum urna.',
  },
  {
    name: 'Pesan Pembelian Produk',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget convallis arcu. Phasellus quis egestas lorem. Aliquam finibus porttitor justo ac feugiat. Donec eget justo purus. Pellentesque ut viverra nunc. Donec finibus feugiat ipsum eget dictum. Pellentesque ornare, lacus non commodo consequat, arcu eros pellentesque eros, eget luctus libero sem sit amet quam. Morbi id vestibulum ligula, eget interdum urna.',
  },
  {
    name: 'Pesan Pembelian Produk',
    content: 'Terima kasih telah membeli produk',
  },
];

export default function TemplateMessages() {
  return (
    <Box>
      <Box>
        <HStack display="flex" justifyContent="space-between">
          <VStack>
            <Text fontWeight="700" fontSize="17px" color="black" w="full">
              Daftar Template Pesan
            </Text>
          </VStack>
          <VStack>
            <DialogAddMessage />
          </VStack>
        </HStack>
      </Box>
      {messages.map((message) => (
        <Box
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
          <VStack w="90%"  align="flex-start">
            <Text fontWeight="600" fontSize="16px" w="full">
              {message.name}
            </Text>
            <Text fontWeight="400" fontSize="14px" w="full" textAlign="justify">
              {message.content}
            </Text>
          </VStack>
          <VStack w="10%">
            <HStack display="flex" justifyContent="center">
            <Box rounded="full" borderWidth="2px" borderColor="black" p="5px">
            <DialogDeleteMessage/>
            </Box>
            <Box rounded="full" borderWidth="2px" borderColor="black" p="5px">
            <DialogEditMessage/>
            </Box>
            </HStack>
          </VStack>
        </Box>
      ))}
    </Box>
  );
}
