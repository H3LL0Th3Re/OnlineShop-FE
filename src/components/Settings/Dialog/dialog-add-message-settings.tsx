import { Box, Button, HStack, Input, Text, Textarea } from '@chakra-ui/react';
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
// import { useAuthStore } from '@/hooks/authstore';
import { useState } from 'react';
// import { messageTemplates } from '@/features/message';
// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useMessageStore } from '@/features/message_store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import Cookies from 'js-cookie';
// const schema = z.object({
//   name: z.string(),
//   content: z.string(),
// });

// // TypeScript type inferred from Zod schema
// type MessageData = z.infer<typeof schema>;
const token = Cookies.get('token');

export default function DialogAddMessage() {
  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [errors, setErrors] = useState<{ name?: string; content?: string }>({});

  const validateForm = () => {
    const newErrors: { name?: string; content?: string } = {};
    if (!name.trim()) newErrors.name = 'Judul Pesan is required';
    if (!content.trim()) newErrors.content = 'Detail Isi Pesan is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      name,
      content,
    }: {
      name: string;
      content: string;
    }) => {
      const response = await axios.post(
        `${apiURL}/message/create-message`,
        { name, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    mutation.mutate({ name, content });
  };

  // Function to insert placeholders
  const insertPlaceholder = (placeholder: string) => {
    setContent((prevContent) => prevContent + ` [${placeholder}]`);
  };

  return (
    <Box>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button
            bgColor="white"
            color="black"
            rounded="full"
            borderWidth="1px"
            borderColor="black"
            fontWeight="700"
          >
            Add Message
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Message</DialogTitle>
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
              <HStack>
                <Button
                  bgColor="white"
                  color="grey"
                  rounded="full"
                  borderWidth="1px"
                  borderColor="grey"
                  fontWeight="600"
                  mb="7px"
                  onClick={() => insertPlaceholder('customer name')}
                >
                  Nama Customer
                </Button>
                <Button
                  bgColor="white"
                  color="grey"
                  rounded="full"
                  borderWidth="1px"
                  borderColor="grey"
                  fontWeight="600"
                  mb="7px"
                  onClick={() => insertPlaceholder('product name')}
                >
                  Nama Produk
                </Button>
                <Button
                  bgColor="white"
                  color="grey"
                  rounded="full"
                  borderWidth="1px"
                  borderColor="grey"
                  fontWeight="600"
                  mb="7px"
                  onClick={() => insertPlaceholder('shop name')}
                >
                  Nama Toko
                </Button>
              </HStack>
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
