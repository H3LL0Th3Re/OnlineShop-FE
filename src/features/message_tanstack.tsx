import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { apiURL } from '@/utils/api-url';

const token = Cookies.get('token');

// Fetch Messages
export const useMessages = () => {
  return useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const response = await axios.get(`${apiURL}/message/get-message`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.message_data; // Ensure response structure matches
    },
  });
};

// Create Message
export const useCreateMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      content,
    }: {
      name: string;
      content: string;
    }) => {
      const response = await axios.post(
        `${apiURL}/message/create-message`,
        { name, content },
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
      queryClient.invalidateQueries({ queryKey: ['messages'] }); // Refresh messages
    },
  });
};

// Edit Message
export const useEditMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      name,
      content,
    }: {
      id: string;
      name: string;
      content: string;
    }) => {
      const response = await axios.put(
        `${apiURL}/message/update-message`,
        { id, name, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.updatedMessage;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};

// Delete Message
export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${apiURL}/message/delete-message`, {
        data: { id },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });
};
