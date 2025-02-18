import { Button } from '@/components/ui/button';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

export default function NavbarBuyer() {
  return (
    <Box
      m={0}
      p={3}
      display="flex"
      alignItems="center"
      w="full"
      justifyContent="center"
      bgGradient="to-r"
      gradientFrom="red.300"
      gradientTo="blue.500"
    >
      <Flex w="full" justify="space-between" alignItems="center">
        <Box>
          <Text
            color="#5F2EEA"
            fontWeight="900"
            fontSize="25px"
            mb="0"
            onClick={() => (window.location.href = '/home')}
          >
            LAKOE APP
          </Text>
        </Box>

        <Box>
          <HStack gap={10} color={'whiteAlpha.900'}>
            <Box _hover={{ color: '#5F2EEA' }}>
              <Link to={'/'}>Pricing</Link>
            </Box>
            <Box _hover={{ color: '#5F2EEA' }}>
              <Link to={'/'}>About</Link>
            </Box>
            <Box _hover={{ color: '#5F2EEA' }}>
              <Link to={'/'}>Contact Us</Link>
            </Box>
          </HStack>
        </Box>

        <Box>
          <Button bg={'#5F2EEA'} rounded={'full'}>
            <Link to={'/register'}>Become a Seller</Link>
          </Button>
        </Box>
      </Flex>
      <Box justifyContent="flex-end"></Box>
    </Box>
  );
}
