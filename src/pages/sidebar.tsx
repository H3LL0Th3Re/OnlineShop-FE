import { Flex, HStack, Spacer, Text } from '@chakra-ui/react';
import { FiBox } from 'react-icons/fi';
import { RiDashboardHorizontalLine } from 'react-icons/ri';
import { TbSettings, TbSmartHome } from 'react-icons/tb';
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
      h="full"
    >
      <Flex gap="4" direction={'column'} w={'80%'} h="full">
        <Text color="#5F2EEA" fontWeight="900" fontSize="25px" mb="0">
          LAKOE APP
        </Text>
        <Link to="/dashboard">
          <HStack _hover={{ color: '#5F2EEA' }}>
            <TbSmartHome />
            <Text p={1} borderRadius={5} fontWeight="600">
              Dashboard
            </Text>
          </HStack>
        </Link>
        <Link to="/product">
          <HStack _hover={{ color: '#5F2EEA' }} align="center">
            <RiDashboardHorizontalLine />
            <Text p={1} borderRadius={5} fontWeight="600">
              Products
            </Text>
          </HStack>
        </Link>
        <Link to="/order">
          <HStack _hover={{ color: '#5F2EEA' }} align="center">
            <FiBox />
            <Text p={1} borderRadius={5} fontWeight="600">
              Orders
            </Text>
          </HStack>
        </Link>

        <Spacer />
        <Link to="/pengaturan">
          <HStack _hover={{ color: '#5F2EEA' }}>
            <TbSettings />
            <Text p={1} borderRadius={5} fontWeight="600">
              Settings
            </Text>
          </HStack>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
