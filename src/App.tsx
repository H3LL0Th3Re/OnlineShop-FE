import Navbar from './components/Navbar';
import Main from './pages/main';
import { Box, Flex } from '@chakra-ui/react';

function App() {
  return (
    <Box pt={10}>
      <Flex>
        <Box w={'20%'}>
          <Navbar />
        </Box>
        <Box w={'60%'} p={6} bg={'blackAlpha.100'}>
          <Main />
        </Box>
      </Flex>
    </Box>
  );
}

export default App;
