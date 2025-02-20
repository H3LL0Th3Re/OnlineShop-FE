import { Box, Flex } from '@chakra-ui/react';
import { Outlet, Navigate } from 'react-router';
import Sidebar from '@/pages/sidebar';
import Navbar from '@/pages/navbar';
import { useEffect, useState } from 'react';
import { useAuthStore, useStoreState } from '@/hooks/authstore';
import { currentStore } from '@/features/get-store';
import Loading from '@/components/Loading/loading';
const PrivateLayout = () => {
  const { token } = useAuthStore();
  const { store, setStore } = useStoreState();
  const [loading, setLoading] = useState(true);

  console.log(store);
  useEffect(() => {
    const getCurrentStore = async () => {
      if (token) {
        try {
          const storedata = await currentStore(token);
          setStore(storedata);

          setTimeout(() => {
            setLoading(false);
          }, 5000);
        } catch (err) {
          console.error('Error fetching store data:', err);
        }
      } else {
        console.log('No token found');
      }
    };

    getCurrentStore();
  }, [token, setStore]);
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return <Loading />; // Menampilkan loading saat data sedang dimuat
  }
  return (
    <Box>
      {/* <Navbar/> */}
      <Flex>
        <Box
          w={'20%'}
          h="100vh"
          position="sticky"
          top="0"
          left="0"
          overflow="auto"
          zIndex="1"
        >
          <Sidebar />
        </Box>

        <Box w={'80%'} p={0} bg={'blackAlpha.100'}>
          <Box position="sticky" top="0" right="0" overflow="auto" zIndex="2">
            <Navbar />
          </Box>
          <Box p={3}>
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default PrivateLayout;
