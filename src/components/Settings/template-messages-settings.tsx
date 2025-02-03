import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import DialogAddMessage from './Dialog/dialog-add-message-settings';
import DialogEditMessage from './Dialog/dialog-edit-message-settings';
import DialogDeleteMessage from './Dialog/dialog-delete-message-settings';

import { useEffect } from 'react';
// import axios from 'axios';
// import { apiURL } from '@/utils/api-url';
// import { getMessage } from '@/features/message';
import { useMessageStore } from '@/features/message_store';
// interface messages{
//   name: string,
//   content: string
// }

// interface Message {
//   id: string;
//   name: string;
//   content: string;
// }

export default function TemplateMessages() {
  // const [messages, setMessages] = useState<Message[]>([]); // State to store fetched messages
  const { fetchMessages, messages } = useMessageStore();
  // Fetch messages on component mount
  useEffect(() => {
    // const fetchMessages = async () => {
    //   try {
    //     const data = await getMessage(); // Await the Promise
    //     console.log("API Response:", data); // Log full response

    //     if (Array.isArray(data)) {
    //       setMessages(data); // Only set if it's an array
    //     } else if (data && Array.isArray(data.messages)) {
    //       setMessages(data.messages); // If messages are nested inside an object
    //     } else {
    //       console.error("Unexpected data format:", data);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching messages:", error);
    //   }
    // };

    fetchMessages();
    // console.log(messages);
  });

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
          <VStack w="90%" align="flex-start">
            <Text fontWeight="600" fontSize="16px" w="full">
              {message?.name}
            </Text>
            <Text fontWeight="400" fontSize="14px" w="full" textAlign="justify">
              {message?.content}
            </Text>
          </VStack>
          <VStack w="10%">
            <HStack display="flex" justifyContent="center">
              <Box rounded="full" borderWidth="2px" borderColor="black" p="5px">
                <DialogDeleteMessage messageId={message?.id} />
              </Box>
              <Box rounded="full" borderWidth="2px" borderColor="black" p="5px">
                <DialogEditMessage messageId={message?.id} />
              </Box>
            </HStack>
          </VStack>
        </Box>
      ))}
    </Box>
  );
}
