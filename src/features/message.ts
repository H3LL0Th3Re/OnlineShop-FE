import axios from 'axios';
import { apiURL } from '@/utils/api-url';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtNml1aGd3bDAwMDF0YXQ4YmdtejR3a2MiLCJmdWxsbmFtZSI6Ikh1Z2dpbmcgRmFjZSIsImVtYWlsIjoiSHVnZ2luZ0ZhY2VAZ21haWwuY29tIiwiaWF0IjoxNzM4Mjg4MTUwLCJleHAiOjE3MzgzMzEzNTB9.6m42c4FZtyUlBtNYpj1_Rstm3Rb8UP6qgQlsEpLBIOA"
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
  