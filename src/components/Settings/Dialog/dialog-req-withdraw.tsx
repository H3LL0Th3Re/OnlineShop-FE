import { Box, Button, Input, Text, NativeSelect } from '@chakra-ui/react';

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
import { useState, useRef } from 'react';
// import { messageTemplates } from '@/features/message';
// import { z } from 'zod';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useMessageStore } from '@/features/message_store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import { useAuthStore } from '@/hooks/authstore';
import { useFetchBank } from '@/components/tanstack/useBank';
import { useFetchBalance } from '@/components/tanstack/useTransactionList';
import Swal from 'sweetalert2';
// const schema = z.object({
//   name: z.string(),
//   content: z.string(),
// });

// // TypeScript type inferred from Zod schema
// type MessageData = z.infer<typeof schema>;

export default function DialogRequestWithdraw() {
  const [amount, setAmount] = useState<number>(0);
  const [bankId, setBankId] = useState<string>('');
  const [errors, setErrors] = useState<{ amount?: string; bankId?: string }>(
    {}
  );
  const { token } = useAuthStore();
  const { data: total } = useFetchBalance(token || '');
  const { data: banks } = useFetchBank(token || '');
  console.log(banks);
  const validateAmount = (value: number) => {
    let error: string | undefined;
    if (isNaN(value) || value <= 0) {
      error = 'Jumlah harus lebih besar dari 0 dan berupa angka';
    } else if (value > (total || 0)) {
      error = 'Jumlah tidak boleh lebih dari total saldo';
    }
    setErrors((prevErrors) => ({ ...prevErrors, amount: error }));
  };
  const validateForm = () => {
    const newErrors: { amount?: string; bankId?: string } = {};

    if (!bankId.trim()) newErrors.bankId = 'Bank harus dipilih';
    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

    return Object.keys(newErrors).length === 0 && !errors.amount;
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      amount,
      bankId,
    }: {
      amount: number;
      bankId: string;
    }) => {
      const response = await axios.post(
        `${apiURL}/transaction-list/request`,
        { amount, bankId },
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
      queryClient.invalidateQueries({ queryKey: ['TransactionList'] });
    },
  });
  const contentRef = useRef<HTMLDivElement>(null);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    mutation.mutate({ amount, bankId });
    Swal.fire({
      title: 'Data Bank Added!',
      confirmButtonText: 'Ok',
    });
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
            Request Withdraw
          </Button>
        </DialogTrigger>
        <DialogContent ref={contentRef}>
          <DialogHeader>
            <DialogTitle>Add Bank Account</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <form onSubmit={onSubmit}>
              <Text fontWeight="600" fontSize="15px" mb="7px">
                Jumlah Withdraw*
              </Text>
              <Input
                mb="7px"
                value={amount}
                type="number"
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : 0;
                  setAmount(value);
                  validateAmount(value); // Real-time validation on change
                }}
              />
              {errors.amount && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {errors.amount}
                </Text>
              )}

              <NativeSelect.Root size="sm" width="240px">
                <NativeSelect.Field
                  placeholder="Select option"
                  value={bankId}
                  onChange={(e) => setBankId(e.currentTarget.value)}
                >
                  {banks?.map((x) => (
                    <option value={x.id}>
                      {x.acc_name} : {x.bank} - {x.acc_number}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              {/* <Input value={bank} onChange={(e) => setBank(e.target.value)} />
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
              )} */}

              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button
                    type="submit"
                    bgColor="#2400FE"
                    color="white"
                    disabled={amount === 0 || errors.amount !== undefined}
                  >
                    Save
                  </Button>
                </DialogActionTrigger>
              </DialogFooter>
            </form>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
