import { Box, Table, HStack, Text, Flex } from '@chakra-ui/react';
import DialogAddBank from './Dialog/dialog-add-bank-settings';
import { useFetchBank } from '../tanstack/useBank';
import DialogEditBank from './Dialog/dialog-edit-bank-settings';
import DialogRequestWithdraw from './Dialog/dialog-req-withdraw';
import { useAuthStore } from '@/hooks/authstore';
import DialogBankDelete from './Dialog/dialog-delete-bank-settings';
import { useFetchBalance } from '../tanstack/useTransactionList';
import { formatPrice } from '@/utils/format-price';
const items = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99 },
  { id: 2, name: 'Coffee Maker', category: 'Home Appliances', price: 49.99 },
  { id: 3, name: 'Desk Chair', category: 'Furniture', price: 150.0 },
  { id: 4, name: 'Smartphone', category: 'Electronics', price: 799.99 },
  { id: 5, name: 'Headphones', category: 'Accessories', price: 199.99 },
];
export default function Withdrawal() {
  const { token } = useAuthStore();
  const { data: bank, isLoading, isError, error } = useFetchBank(token || '');
  const { data: balance } = useFetchBalance(token || '');
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
              <Text>Rp. {formatPrice(balance || 0)}</Text>
              <DialogRequestWithdraw></DialogRequestWithdraw>
            </Box>
          </HStack>
        </Box>
      </Box>
      <Box mt={5}>
        <Text fontWeight={'bold'}>Bank Account</Text>
        <Box mt={3}>
          {bank?.length === 0 && (
            <>
              <Text>No bank Available</Text>
            </>
          )}
          {bank?.map((data) => (
            <>
              <Box borderStyle={'solid'} borderWidth={'thin'} mt={2} p={'3'}>
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
              </Box>
            </>
          ))}

          <DialogAddBank></DialogAddBank>
        </Box>
      </Box>
      <Box mt={3}>
        <Text fontWeight={'bolder'}>Transactions List</Text>
        <Table.ScrollArea mt={3} borderWidth="1px" rounded="md" height="300px">
          <Table.Root size="sm" stickyHeader>
            <Table.Header>
              <Table.Row bg="bg.subtle">
                <Table.ColumnHeader>Product</Table.ColumnHeader>
                <Table.ColumnHeader>Category</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {items.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>
                  <Table.Cell textAlign="end">{item.price}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </Box>
    </>
  );
}
