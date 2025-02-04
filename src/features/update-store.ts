import { apiURL } from '@/utils/api-url';
import { Store } from '@/types/store';
import axios from 'axios';
export const updateStore = async ({
  token,
  formData,
}: {
  token: string;
  formData: FormData;
}): Promise<{ message: string; store: Store }> => {
  const response = await axios.put(apiURL + '/stores/update/', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
