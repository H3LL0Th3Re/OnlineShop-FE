import { ShippingDetails } from '@/types/courier';
import { apiURL } from '@/utils/api-url';
import axios from 'axios';

export const fetchCourier = async () => {
  try {
    const response = await axios.get(apiURL + '/');
    console.log('Response:', response.data.biteship);
  } catch (error) {
    console.error('Error fetching couriers:', error);
  }
};

export const fetchShippingRates = async (shippingDetails: ShippingDetails) => {
  try {
    const response = await axios.post(apiURL + '/rates', shippingDetails, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Rates:', response.data.biteship);
  } catch (error) {
    console.error('Error fetching rates courier:', error);
  }
};
