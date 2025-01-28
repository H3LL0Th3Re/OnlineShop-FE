import { Box, Flex } from '@chakra-ui/react';
import { Outlet, Navigate } from 'react-router';
import Sidebar from '@/pages/sidebar';
import Navbar from '@/pages/navbar';
import { useAuthStore } from '@/hooks/authstore';
const PrivateLayout = () => {
  const { token } = useAuthStore();
  console.log(token);

  if (!token) {
    return <Navigate to="/login" replace />;
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
