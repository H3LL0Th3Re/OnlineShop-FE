import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router';

const Sidebar = () => {
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
        <Link to="/">
          <Text p={1} _hover={{ bgColor: 'grey' }} borderRadius={5}>
            Dashboard
          </Text>
        </Link>
        <Link to="/product">
          <Text p={1} _hover={{ bgColor: 'grey' }} borderRadius={5}>
            Produk
          </Text>
        </Link>
        <Link to="/pesanan">
          <Text p={1} _hover={{ bgColor: 'grey' }} borderRadius={5}>
            Pesanan
          </Text>
        </Link>
        <Link to="/pengaturan">
          <Text p={1} _hover={{ bgColor: 'grey' }} borderRadius={5}>
            Pengaturan
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
