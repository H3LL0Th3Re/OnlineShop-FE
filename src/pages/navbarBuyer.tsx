import { Button } from '@/components/ui/button';
import { Box, Flex, HStack, Image } from '@chakra-ui/react';
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
      bg={'white'}
    >
      <Flex w="full" justify="space-between" alignItems="center">
        <Box w={'150px'} onClick={() => (window.location.href = '/home')}>
          <Image
            src="https://res.cloudinary.com/dbavdkhmz/image/upload/v1740373500/Lakoe_Logo_rxtafs.png"
            alt="logo"
          />
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
