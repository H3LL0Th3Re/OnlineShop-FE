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
// import { deleteMessage } from '@/features/message';
import { useMessageStore } from '@/features/message_store';
import { Button, Text } from '@chakra-ui/react';
// import { useState } from 'react';
import { MdOutlineDelete } from 'react-icons/md';

interface DialogEditMessageProps {
  messageId: string;
}

export default function DialogDeleteMessage({
  messageId,
}: DialogEditMessageProps) {
  // const [apiError, setApiError] = useState<string | null>(null);
  const { deleteMessage } = useMessageStore();
  // const onSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault(); // Prevent default form submission
  //   setApiError(null);
  //   try {
  //     const response = await deleteMessage(messageId);
  //     if (response) {
  //       alert('Message deleted successfully');
  //     } else {
  //       setApiError('Failed to delete message');
  //       alert('Failed to delete message');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setApiError('An error occurred while deleting the message');
  //     alert('An error occurred while deleting the message');
  //   }
  // };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <MdOutlineDelete style={{ fontSize: '20px', cursor: 'pointer' }} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Message</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form onClick={() => deleteMessage(messageId)}>
            <Text fontWeight="400" fontSize="15px">
              Apakah kamu yakin untuk menghapus Pesan? Kamu tidak akan dapat
              mengembalikan pesan yang sudah dihapus.
            </Text>
            {/* {apiError && <Text color="red.500">{apiError}</Text>} */}
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogActionTrigger>
              <Button bgColor="#FF0000" color="white" type="submit">
                Delete
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
