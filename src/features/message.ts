import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import Cookies from 'js-cookie';

const token = Cookies.get('token');

export async function messageTemplates (
  name: string,
  content: string
) {
  try {
    
    const response = await axios.post(
      apiURL + '/message/create-message',
      {
        name,
        content,
        storesId: "cm6iuhhtg0003tat8zypxzgm2"
      },
      {
        headers: {
            'Authorization': `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(name);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data.message || 'Error creating message',
      };
    } else {
      return { message: 'An error occurred while creating message.' };
    }
  }
};



export async function getMessage () {
    try {
      const response = await axios.get(
        apiURL + '/message/get-message',
        
        {
            headers: {
                'Authorization': `bearer ${token}`,
              'Content-Type': 'application/json',
            },
        }
      );
      console.log("from function",response.data.message_data);
      return response.data.message_data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          message: error.response?.data.message || 'Error creating message',
        };
      } else {
        return { message: 'An error occurred while creating message.' };
      }
    }
};


export async function editMessage (
    id: string,
    name: string,
    content: string
  ) {
    try {
      
      const response = await axios.put(
        apiURL + '/message/update-message',
        {
          name,
          content,
          id: id
        },
        {
          headers: {
              'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          message: error.response?.data.message || 'Error updating message',
        };
      } else {
        return { message: 'An error occurred while updating message.' };
      }
    }
  };

  export async function deleteMessage (
    id: string
  ) {
    try {
      
      const response = await axios.delete(apiURL + '/message/delete-message', {
        data: { id: id }, // Move `id` inside `data`
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    //   console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          message: error.response?.data.message || 'Error updating message',
        };
      } else {
        return { message: 'An error occurred while updating message.' };
      }
    }
  };
  