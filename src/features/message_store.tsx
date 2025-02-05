import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import Cookies from 'js-cookie';
import { create } from 'zustand';

const token = Cookies.get('token');
console.log('this is token', token);
type Message = {
  id: string;
  name: string;
  content: string;
  storesId: string;
};

interface MessageState {
  messages: Message[];
  fetchMessages: () => Promise<void>;
  createMessage: (name: string, content: string) => Promise<string>;
  editMessage: (id: string, name: string, content: string) => Promise<string>;
  deleteMessage: (id: string) => Promise<void>;
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],

  fetchMessages: async () => {
    try {
      const response = await axios.get(`${apiURL}/message/get-message`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      set({ messages: response.data.message_data });
      // return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  },

  createMessage: async (name, content) => {
    try {
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
      set((state) => ({ messages: [...state.messages, response.data] }));
      return response.data;
    } catch (error) {
      console.error('Error creating message:', error);
    }
  },

  editMessage: async (id, name, content) => {
    try {
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

      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === id ? response.data.updatedMessage : msg
        ),
      }));

      return response.data;
    } catch (error) {
      console.error('Error updating message:', error);
    }
  },

  deleteMessage: async (id) => {
    try {
      await axios.delete(`${apiURL}/message/delete-message`, {
        data: { id },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      set((state) => ({
        messages: state.messages.filter((msg) => msg.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  },
}));
