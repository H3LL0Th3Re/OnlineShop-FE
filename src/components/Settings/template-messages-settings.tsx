import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import DialogAddMessage from './Dialog/dialog-add-message-settings';
import DialogEditMessage from './Dialog/dialog-edit-message-settings';
import DialogDeleteMessage from './Dialog/dialog-delete-message-settings';
import { useMessages } from '@/features/message_tanstack'; // Import the useMessages hook

export default function TemplateMessages() {
  // Use the useMessages hook to fetch messages
  const { data: messages, isLoading, isError } = useMessages();

  // Handle loading and error states
  if (isLoading) {
    return <Text>Loading messages...</Text>;
  }

  if (isError) {
    return <Text>Error fetching messages. Please try again later.</Text>;
  }

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
                <Box
                  rounded="full"
                  borderWidth="2px"
                  borderColor="black"
                  p="5px"
                >
                  <DialogDeleteMessage messageId={message?.id} />
                </Box>
                <Box
                  rounded="full"
                  borderWidth="2px"
                  borderColor="black"
                  p="5px"
                >
                  <DialogEditMessage messageId={message?.id} />
                </Box>
              </HStack>
            </VStack>
          </Box>
        )
      )}
    </Box>
  );
}
