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
        <Text color="#5F2EEA" fontWeight="900" fontSize="25px" mb="0">
          LAKOE APP
        </Text>
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
        <Link to="/order">
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
