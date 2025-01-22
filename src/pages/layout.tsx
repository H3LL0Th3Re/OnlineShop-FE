import Sidebar from '@/components/Sidebar';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router';
import Navbar from './navbar';

const Layout = () => {
  return (
    <Box>
      {/* <Navbar/> */}
      <Flex>
        <Box w={'20%'} display="">
          <Sidebar />
        </Box>

        <Box w={'80%'} p={0} bg={'blackAlpha.100'}>
          <Box>
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

export default Layout;
