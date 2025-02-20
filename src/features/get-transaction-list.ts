import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import { TransactionList } from '@/types/transaction-list';

export const storeTransaction = async (
  token: string
): Promise<TransactionList[]> => {
  try {
    const response = await axios.get(apiURL + '/transaction-list/transaction', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.transaction;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Balance');
  }
};
