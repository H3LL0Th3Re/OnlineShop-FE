import { Box, Table, Button, Text, Flex, Tabs, VStack } from '@chakra-ui/react';
import { acceptWithdraw, rejectWithdraw } from '@/features/handle-withdraw';
import { useAuthStore } from '@/hooks/authstore';
import { useFetchAllWithdrawal } from '@/components/tanstack/useTransactionList';
import { formatPrice } from '@/utils/format-price';
import { formatDateString } from '@/utils/date-format';
import { TransactionList } from '@/types/transaction-list';
import { FiCheck, FiX } from 'react-icons/fi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function DashboardAdmin() {
  const { token } = useAuthStore();
  //   const { data: bank, isLoading, isError, error } = useFetchBank(token || '');

  const { data: items } = useFetchAllWithdrawal(token || '');

  const filterByStatus = (items: TransactionList[], status: string) => {
    return items.filter((item) => item.status === status);
  };

  const PendingItems = filterByStatus(items || [], 'pending');
  const RejectedItems = filterByStatus(items || [], 'rejected');
  const SuccessItems = filterByStatus(items || [], 'accepted');
  const queryClient = useQueryClient();

  const acceptMutation = useMutation({
    mutationFn: (id: string) => acceptWithdraw(token || '', id),
    onSuccess: () => {
      // Invalidate and refetch the withdrawal data to update the UI
      queryClient.invalidateQueries({ queryKey: ['TransactionList'] });
      alert('Withdraw Accepted');
    },
    onError: (error) => {
      console.error('Error accepting withdrawal:', error);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: string) => rejectWithdraw(token || '', id),
    onSuccess: () => {
      // Invalidate and refetch the withdrawal data to update the UI
      queryClient.invalidateQueries({ queryKey: ['TransactionList'] });
      alert('Withdraw Rejected');
    },
    onError: (error) => {
      alert(error);
      console.log(token);
      console.error('Error rejecting withdrawal:', error);
    },
  });
  return (
    <>
      <Box bgColor="white" p="3">
        <VStack display="flex" justifyContent="flex-start" align="flex-start">
          <Text fontWeight="700" fontSize="2xl">
            Withdrawal Request
          </Text>
          {PendingItems.length === 0 && <Text>No Waiting Request</Text>}

          {PendingItems.map((item) => (
            <Box
              borderWidth={'2px'}
              borderColor={'gray.200'}
              width={'full'}
              p={3}
            >
              <Flex direction={'row'} width={'100%'} justify={'space-between'}>
                <Flex direction={'column'}>
                  <Text fontWeight={'bolder'}>{item.store.name}</Text>
                  <Text>
                    {item.bank.acc_name} - {item.bank.bank} -{' '}
                    {item.bank.acc_number}
                  </Text>
                  <Text>{formatDateString(item.createdAt)}</Text>
                  <Text>Rp.{formatPrice(item.amount)}</Text>
                </Flex>
                <Flex direction={'row'} gap={3}>
                  <Button
                    background={'green'}
                    onClick={() => acceptMutation.mutate(item.id)}
                    loading={acceptMutation.isPending}
                  >
                    <FiCheck />
                  </Button>
                  <Button
                    background={'red'}
                    onClick={() => rejectMutation.mutate(item.id)}
                    loading={rejectMutation.isPending}
                  >
                    <FiX />
                  </Button>
                </Flex>
              </Flex>
            </Box>
          ))}

          <Tabs.Root defaultValue="all" w="full">
            <Tabs.List>
              <Tabs.Trigger value="all">All Request</Tabs.Trigger>
              <Tabs.Trigger value="accepted">Accepted</Tabs.Trigger>
              <Tabs.Trigger value="rejected">Rejected</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="all">
              <Table.ScrollArea
                mt={3}
                borderWidth="1px"
                rounded="md"
                height="300px"
              >
                <Table.Root size="sm" stickyHeader>
                  <Table.Header>
                    <Table.Row bg="bg.subtle">
                      <Table.ColumnHeader>Date</Table.ColumnHeader>
                      <Table.ColumnHeader>Name</Table.ColumnHeader>
                      <Table.ColumnHeader>Type</Table.ColumnHeader>
                      <Table.ColumnHeader>Status</Table.ColumnHeader>
                      <Table.ColumnHeader>Bank Destination</Table.ColumnHeader>
                      <Table.ColumnHeader>Store</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="end">
                        Amount
                      </Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {items?.length === 0 ? (
                      <Text> No transaction</Text>
                    ) : (
                      items?.map((item) => (
                        <Table.Row key={item.id}>
                          <Table.Cell>
                            {' '}
                            {formatDateString(item.createdAt)}
                          </Table.Cell>
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>{item.type}</Table.Cell>
                          <Table.Cell>{item.status}</Table.Cell>
                          <Table.Cell>
                            {item.bank.acc_name} - {item.bank.bank} -{' '}
                            {item.bank.acc_number}{' '}
                          </Table.Cell>
                          <Table.Cell>{item.store.name}</Table.Cell>
                          <Table.Cell textAlign="end">{item.amount}</Table.Cell>
                        </Table.Row>
                      ))
                    )}
                  </Table.Body>
                </Table.Root>
              </Table.ScrollArea>
            </Tabs.Content>
            <Tabs.Content value="accepted">
              <Table.ScrollArea
                mt={3}
                borderWidth="1px"
                rounded="md"
                height="300px"
              >
                <Table.Root size="sm" stickyHeader>
                  <Table.Header>
                    <Table.Row bg="bg.subtle">
                      <Table.ColumnHeader>Date</Table.ColumnHeader>
                      <Table.ColumnHeader>Name</Table.ColumnHeader>
                      <Table.ColumnHeader>Type</Table.ColumnHeader>
                      <Table.ColumnHeader>Status</Table.ColumnHeader>
                      <Table.ColumnHeader>Bank Destination</Table.ColumnHeader>
                      <Table.ColumnHeader>Store</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="end">
                        Amount
                      </Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {SuccessItems?.length === 0 ? (
                      <Text> No transaction</Text>
                    ) : (
                      SuccessItems?.map((item) => (
                        <Table.Row key={item.id}>
                          <Table.Cell>
                            {' '}
                            {formatDateString(item.createdAt)}
                          </Table.Cell>
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>{item.type}</Table.Cell>
                          <Table.Cell>{item.status}</Table.Cell>
                          <Table.Cell>
                            {item.bank.acc_name} - {item.bank.bank} -{' '}
                            {item.bank.acc_number}{' '}
                          </Table.Cell>
                          <Table.Cell>{item.store.name}</Table.Cell>
                          <Table.Cell textAlign="end">{item.amount}</Table.Cell>
                        </Table.Row>
                      ))
                    )}
                  </Table.Body>
                </Table.Root>
              </Table.ScrollArea>
            </Tabs.Content>
            <Tabs.Content value="rejected">
              <Table.ScrollArea
                mt={3}
                borderWidth="1px"
                rounded="md"
                height="300px"
              >
                <Table.Root size="sm" stickyHeader>
                  <Table.Header>
                    <Table.Row bg="bg.subtle">
                      <Table.ColumnHeader>Date</Table.ColumnHeader>
                      <Table.ColumnHeader>Name</Table.ColumnHeader>
                      <Table.ColumnHeader>Type</Table.ColumnHeader>
                      <Table.ColumnHeader>Status</Table.ColumnHeader>
                      <Table.ColumnHeader>Bank Destination</Table.ColumnHeader>
                      <Table.ColumnHeader>Store</Table.ColumnHeader>
                      <Table.ColumnHeader textAlign="end">
                        Amount
                      </Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {RejectedItems?.length === 0 ? (
                      <Text> No transaction</Text>
                    ) : (
                      RejectedItems?.map((item) => (
                        <Table.Row key={item.id}>
                          <Table.Cell>
                            {' '}
                            {formatDateString(item.createdAt)}
                          </Table.Cell>
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>{item.type}</Table.Cell>
                          <Table.Cell>{item.status}</Table.Cell>
                          <Table.Cell>
                            {item.bank.acc_name} - {item.bank.bank} -{' '}
                            {item.bank.acc_number}{' '}
                          </Table.Cell>
                          <Table.Cell>{item.store.name}</Table.Cell>
                          <Table.Cell textAlign="end">{item.amount}</Table.Cell>
                        </Table.Row>
                      ))
                    )}
                  </Table.Body>
                </Table.Root>
              </Table.ScrollArea>
            </Tabs.Content>
          </Tabs.Root>
        </VStack>
      </Box>
    </>
  );
}
