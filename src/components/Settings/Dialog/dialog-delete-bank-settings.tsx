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
// import { useMessageStore } from '@/features/message_store';
import { apiURL } from '@/utils/api-url';
import { Button, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// import { useState } from 'react';
import Cookies from 'js-cookie';
import { FiTrash2 } from 'react-icons/fi';
const token = Cookies.get('token');
interface DeleteBank {
  id: string;
}

export default function DialogBankDelete({ id }: DeleteBank) {
  // const [apiError, setApiError] = useState<string | null>(null);
  // const { deleteMessage } = useMessageStore();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await axios.delete(`${apiURL}/bank/delete-bank/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Bank'] });
    },
  });
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the editMessage action from Zustand store
      // const response = await editMessage(messageId, name, content);
      mutation.mutate({ id: id });
      // console.log(response);
      // if (response) {
      //   alert('Message updated successfully');
      // } else {
      //   console.log('something went wrong');
      // }
    } catch (error) {
      console.error('Error delete bank:', error);
      alert('failed to delete');
    }
  };

  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>
          {' '}
          <FiTrash2 />{' '}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Bank</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={onSubmit}>
            <Text fontWeight="400" fontSize="15px">
              Apakah kamu yakin untuk menghapus data Bank?
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
