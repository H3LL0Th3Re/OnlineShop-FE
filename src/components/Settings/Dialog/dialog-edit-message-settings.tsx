import { Box, Button, Input, Text, Textarea } from '@chakra-ui/react';
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
import { BiMessageAltEdit } from 'react-icons/bi';
import { useState } from 'react';
// import { useMessageStore } from '@/features/message_store'; // Update the import path
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import Cookies from 'js-cookie';
const token = Cookies.get('token');
// import { useEditMessage } from '@/features/message_tanstack';

interface DialogEditMessageProps {
  messageId: string;
}

export default function DialogEditMessage({
  messageId,
}: DialogEditMessageProps) {
  // const { data: messages } = useEditMessage();

  // Zustand store
  // const { editMessage } = useMessageStore();

  // State for form inputs
  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // State for validation errors
  const [errors, setErrors] = useState<{ name?: string; content?: string }>({});

  // Validate form inputs
  const validateForm = () => {
    const newErrors: { name?: string; content?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Judul Pesan is required';
    }
    if (!content.trim()) {
      newErrors.content = 'Detail Isi Pesan is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      id,
      name,
      content,
    }: {
      id: string;
      name: string;
      content: string;
    }) => {
      const response = await axios.put(
        `${apiURL}/message/update-message`,
        { id, name, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.updatedMessage;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  // Handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      // Call the editMessage action from Zustand store
      // const response = await editMessage(messageId, name, content);
      mutation.mutate({ id: messageId, name, content });
      // console.log(response);
      // if (response) {
      //   alert('Message updated successfully');
      // } else {
      //   console.log('something went wrong');
      // }
    } catch (error) {
      console.error('Error updating message:', error);
      alert('Message failed to update');
    }
  };

  return (
    <Box>
      <DialogRoot>
        <DialogTrigger asChild>
          <BiMessageAltEdit style={{ fontSize: '20px' }} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Message</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <form onSubmit={onSubmit}>
              <Text fontWeight="600" fontSize="15px" mb="7px">
                Judul Pesan*
              </Text>
              <Input
                mb="7px"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.name}
                </Text>
              )}

              <Text fontWeight="600" fontSize="15px" mb="7px">
                Detail Isi Pesan*
              </Text>
              <Textarea
                mb="7px"
                h="100px"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              {errors.content && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.content}
                </Text>
              )}

              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogActionTrigger>
                <Button type="submit" bgColor="#2400FE" color="white">
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
