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
import { editMessage } from '@/features/message';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
const schema = z.object({
  name: z.string(),
  content: z.string(),
});

interface DialogEditMessageProps {
  messageId: string;
}

// TypeScript type inferred from Zod schema
type MessageData = z.infer<typeof schema>;
export default function DialogEditMessage({ messageId }: DialogEditMessageProps) {

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
    const response = await editMessage(messageId, data.name, data.content);
    console.log(response);
    if (response) {
      alert('message updated successfully');
    } else {
      setApiError(response.message || 'message failed to update');
      console.log(apiError);
      alert(response.message);
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
          <form onSubmit={handleSubmit(onSubmit)}>
              <Text fontWeight="600" fontSize="15px" mb="7px">
                Judul Pesan*
              </Text>
              <Input mb="7px" {...register('name')} />
              <Text fontWeight="600" fontSize="15px" mb="7px">
                Detail Isi Pesan*
              </Text>
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
