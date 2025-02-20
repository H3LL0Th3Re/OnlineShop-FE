import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import { TransactionList } from '@/types/transaction-list';

export const acceptWithdraw = async (
  token: string,
  id: string
): Promise<TransactionList> => {
  try {
    const response = await axios.put(
      apiURL + `/admin/accept/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.status;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to accept withdraw');
  }
};
export const rejectWithdraw = async (
  token: string,
  id: string
): Promise<TransactionList> => {
  try {
    const response = await axios.put(
      apiURL + `/admin/reject/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.status;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to reject withdraw');
  }
};
