import { Flex, Text, Link } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Flex
      direction={'column'}
      color="black"
      fontSize={'lg'}
      p="4"
      justify="space-between"
      align="center"
    >
      <Flex gap="4" direction={'column'} w={'70%'}>
        <Link>
          <Text p={1} _hover={{ bgColor: 'grey' }} borderRadius={5}>
            Dashboard
          </Text>
        </Link>
        <Link>
          <Text p={1} _hover={{ bgColor: 'grey' }} borderRadius={5}>
            Produk
          </Text>
        </Link>
        <Link>
          <Text p={1} _hover={{ bgColor: 'grey' }} borderRadius={5}>
            Pesanan
          </Text>
        </Link>
        <Link>
          <Text p={1} _hover={{ bgColor: 'grey' }} borderRadius={5}>
            Pengaturan
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
