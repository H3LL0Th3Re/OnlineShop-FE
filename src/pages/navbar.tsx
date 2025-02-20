import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';
import { currentStore } from '@/features/get-store';
import { useAuthStore } from '@/hooks/authstore';
import { Store } from '@/types/store';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

export default function Navbar() {
  const { token, setToken } = useAuthStore();

  const { data: store } = useQuery<Store, Error>({
    queryKey: ['store'],
    queryFn: () => currentStore(token || ''),
    enabled: !!token,
  });

  console.log('data store:', store);
  // console.log("data tanstack:",));
  const handleLogout = () => {
    setToken(null); // Hapus token dari cookies dan state
    window.location.href = 'http://localhost:5173/landing-page'; // Arahkan ke halaman landing page
  };
  const handleProfile = () => {
    // Hapus token dari cookies dan state
    window.location.href = `/preview/store/${store?.username}`; // Arahkan ke halaman landing page
  };

  return (
    <Box
      m={0}
      p={3}
      bg={'white'}
      display="flex"
      alignItems="center"
      w="full"
      justifyContent="center"
      borderBottom="10000px"
    >
      <Flex w="full" justify="space-between" alignItems="center">
        <Box>
          <Text color="black" fontWeight="600" fontSize="17px">
            Welcome, {store?.name || 'admin'}
          </Text>
        </Box>
        <Box>
          {/* <InputGroup flex="1" startElement={<LuSearch />} w="full">
            <Input
              placeholder="Search products"
              w="500px"
              color="black"
              fontWeight="600"
            />
          </InputGroup> */}
        </Box>

        <Box>
          <MenuRoot>
            <MenuTrigger asChild>
              <Image
                src={
                  store?.banner_attachment ||
                  'https://wallpapers.com/images/featured/blank-h9v8oske8iey8nkq.jpg'
                }
                rounded="full"
                boxSize="40px"
                fit="cover"
              />
            </MenuTrigger>
            <MenuContent>
              <MenuItem value="rename" onClick={handleProfile}>
                Preview Store
              </MenuItem>
              <MenuItem
                value="delete"
                color="fg.error"
                _hover={{ bg: 'bg.error', color: 'fg.error' }}
                onClick={handleLogout}
              >
                Logout...
              </MenuItem>
            </MenuContent>
          </MenuRoot>
        </Box>
      </Flex>
      <Box justifyContent="flex-end"></Box>
    </Box>
  );
}
