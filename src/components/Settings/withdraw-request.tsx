import { Box, Button, HStack, Text, Flex } from '@chakra-ui/react';
import DialogAddBank from './Dialog/dialog-add-bank-settings';
import { useFetchBank } from '../tanstack/useBank';
import DialogEditBank from './Dialog/dialog-edit-bank-settings';

import { useAuthStore } from '@/hooks/authstore';
import DialogBankDelete from './Dialog/dialog-delete-bank-settings';

export default function Withdrawal() {
  const { token } = useAuthStore();
  const { data: bank, isLoading, isError, error } = useFetchBank(token || '');
  console.log(bank);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  // if (!Array.isArray(bank) || bank.length === 0) {
  //   return <Text>No bank Available</Text>;
  // }
  return (
    <>
      <Box>
        <Text fontWeight={'bold'}>Withdrawal Request</Text>

        <Box mt={5}>
          <HStack borderStyle={'solid'} borderWidth={'thin'} p={'3'}>
            <Box>
              <Text>Current Balance</Text>
              <Text>Rp. 50.000</Text>
              <Button>Request Withdraw</Button>
            </Box>
          </HStack>
        </Box>
      </Box>
      <Box mt={5}>
        <Text fontWeight={'bold'}>Bank Account</Text>
        <Box mt={3}>
          <Box borderStyle={'solid'} borderWidth={'thin'} p={'3'}>
            {bank?.length === 0 && (
              <>
                <Text>No bank Available</Text>
              </>
            )}
            {bank?.map((data) => (
              <>
                <Flex
                  mt={1}
                  direction={'row'}
                  justify="space-between"
                  width="100%"
                >
                  <Flex direction={'column'}>
                    <Text fontWeight={'bolder'}>{data.acc_name}</Text>
                    <Text>{data.bank}</Text>
                    <Text>{data.acc_number}</Text>
                  </Flex>
                  <Flex direction={'row'} gap={3}>
                    <DialogEditBank id={data.id}></DialogEditBank>
                    <DialogBankDelete id={data.id}></DialogBankDelete>
                  </Flex>
                </Flex>
              </>
            ))}
            <DialogAddBank></DialogAddBank>
          </Box>
        </Box>
      </Box>
    </>
  );
}
