import { Box, Button, Input, Text } from '@chakra-ui/react';
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

export default function DialogAddBank() {
  const [acc_name, setAccName] = useState<string>('');
  const [bank, setBank] = useState<string>('');
  const [acc_number, setAccNumber] = useState<string>('');
  const [errors, setErrors] = useState<{
    acc_name?: string;
    bank?: string;
    acc_number?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { acc_name?: string; bank?: string; acc_number?: string } =
      {};
    if (!acc_name.trim()) newErrors.acc_name = 'Nama harus diisi';
    if (!bank.trim()) newErrors.bank = 'Bank harus diisi';
    if (!acc_number.trim())
      newErrors.acc_number = 'Nomor Rekening tidak boleh kosong';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      acc_name,
      bank,
      acc_number,
    }: {
      acc_name: string;
      bank: string;
      acc_number: string;
    }) => {
      const response = await axios.post(
        `${apiURL}/bank/create-bank`,
        { acc_name, bank, acc_number },
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
    mutation.mutate({ acc_name, bank, acc_number });
  };

  return (
    <Box>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button
            mt={3}
            rounded="full"
            borderWidth="1px"
            borderColor="black"
            fontWeight="700"
          >
            Add Bank Account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Bank Account</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <form onSubmit={onSubmit}>
              <Text fontWeight="600" fontSize="15px" mb="7px">
                Nama Pengguna*
              </Text>
              <Input
                mb="7px"
                value={acc_name}
                onChange={(e) => setAccName(e.target.value)}
              />
              {errors.acc_name && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.acc_name}
                </Text>
              )}
              <Text fontWeight="600" fontSize="15px" mb="7px">
                Bank*
              </Text>

              <Input value={bank} onChange={(e) => setBank(e.target.value)} />
              {errors.bank && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.bank}
                </Text>
              )}
              <Text fontWeight="600" fontSize="15px" mb="7px">
                Nomor Rekening*
              </Text>

              <Input
                value={acc_number}
                onChange={(e) => setAccNumber(e.target.value)}
              />
              {errors.acc_number && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.acc_number}
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
