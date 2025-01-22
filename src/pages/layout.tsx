import Sidebar from '@/components/Sidebar';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <Box pt={10}>
      <Flex>
        <Box w={'20%'}>
          <Sidebar />
        </Box>
        <Box w={'60%'} p={6} bg={'blackAlpha.100'}>
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
