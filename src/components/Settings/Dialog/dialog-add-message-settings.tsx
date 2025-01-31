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
import { messageTemplates } from '@/features/message';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string(),
  content: z.string(),
});

// TypeScript type inferred from Zod schema
type MessageData = z.infer<typeof schema>;

export default function DialogAddMessage() {

  
  const {
    register,
    handleSubmit
  } = useForm<MessageData>({
    resolver: zodResolver(schema),
  });
  
  const [apiError, setApiError] = useState<string | null>(null);
  const onSubmit = async (data: MessageData) => {
    console.log("called");
    setApiError(null);
    const response = await messageTemplates(data.name, data.content);
    console.log(response);
    if (response) {
      alert('message created successfully');
    } else {
      setApiError(response.message || 'message failed');
      console.log(apiError);
      alert(response.message);
    }
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Text fontWeight="600" fontSize="15px" mb="7px">
                Judul Pesan*
              </Text>
              <Input mb="7px" {...register('name')} />
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
                >
                  Nama Toko
                </Button>
              </HStack>
              <Textarea mb="7px" h="100px" {...register('content')} />
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
