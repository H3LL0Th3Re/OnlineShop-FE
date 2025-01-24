import { Button } from '@/components/ui/button';
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from '@/components/ui/menu';
import { Box, Flex, Icon, Text } from '@chakra-ui/react';
import { BiTrendingUp } from 'react-icons/bi';
import { BsCurrencyDollar } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { TbShoppingCartDollar } from 'react-icons/tb';

export function Dashboard() {
  return (
    <Box spaceY={5}>
      <Box bg={'white'} rounded={'md'} p={1}>
        <Text
          color="#5F2EEA"
          fontWeight="900"
          fontSize="25px"
          mb="0"
          textAlign={'center'}
        >
          DASHBOARD
        </Text>
      </Box>
      <Flex gap={5}>
        <Flex
          w={'50%'}
          p={3}
          bg={'white'}
          justify={'space-between'}
          rounded={'md'}
        >
          <Box>
            <Text
              fontSize={'18px'}
              fontWeight={'500'}
              fontFamily={'sans-serif'}
              color={'gray.600'}
            >
              Overall Sales
            </Text>
            <Text
              fontSize={'24px'}
              fontWeight={'700'}
              fontFamily={'sans-serif'}
            >
              Rp.178.000.000,00
            </Text>
          </Box>
          <Box>
            <MenuRoot>
              <MenuTrigger asChild>
                <Button variant="outline" size="sm">
                  This Month
                  <Icon>
                    <IoIosArrowDown />
                  </Icon>
                </Button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem value="new-txt">Last Month</MenuItem>
              </MenuContent>
            </MenuRoot>
          </Box>
        </Flex>
        <Flex direction={'column'} w={'50%'} gap={3}>
          <Flex gap={5}>
            <Box bg={'white'} rounded={'md'} w={'50%'} h={'32'} p={3}>
              <Icon
                size={'xl'}
                color="#5F2EEA"
                bg={'teal.300'}
                p={1}
                rounded={'md'}
              >
                <BsCurrencyDollar />
              </Icon>
              <Text
                fontSize={'18px'}
                fontWeight={'500'}
                fontFamily={'sans-serif'}
                color={'gray.600'}
              >
                Total Sales
              </Text>
              <Text
                fontSize={'24px'}
                fontWeight={'700'}
                fontFamily={'sans-serif'}
                pt={1}
              >
                Rp.14.000.000,00
              </Text>
              <Text
                fontSize={'15px'}
                fontWeight={'600'}
                fontFamily={'sans-serif'}
                color={'#5F2EEA'}
              >
                From Jan.
              </Text>
            </Box>
            <Box bg={'white'} rounded={'md'} w={'50%'} h={'32'} p={3}>
              <Icon
                size={'xl'}
                color="#5F2EEA"
                bg={'teal.300'}
                p={1}
                rounded={'md'}
              >
                <BiTrendingUp />
              </Icon>
              <Text
                fontSize={'18px'}
                fontWeight={'500'}
                fontFamily={'sans-serif'}
                color={'gray.600'}
              >
                Weekly Sales
              </Text>
              <Text
                fontSize={'24px'}
                fontWeight={'700'}
                fontFamily={'sans-serif'}
                pt={1}
              >
                Rp.1.000.000,00
              </Text>
              <Text
                fontSize={'15px'}
                fontWeight={'600'}
                fontFamily={'sans-serif'}
                color={'#5F2EEA'}
              >
                From Jan.
              </Text>
            </Box>
          </Flex>
          <Flex gap={5}>
            <Box bg={'white'} rounded={'md'} w={'50%'} h={'32'} p={3}>
              <Icon
                size={'xl'}
                color="#5F2EEA"
                bg={'teal.300'}
                p={1}
                rounded={'md'}
              >
                <TbShoppingCartDollar />
              </Icon>
              <Text
                fontSize={'18px'}
                fontWeight={'500'}
                fontFamily={'sans-serif'}
                color={'gray.600'}
              >
                Avg. Order Value
              </Text>
              <Text
                fontSize={'24px'}
                fontWeight={'700'}
                fontFamily={'sans-serif'}
                pt={1}
              >
                Rp.470.000,00
              </Text>
              <Text
                fontSize={'15px'}
                fontWeight={'600'}
                fontFamily={'sans-serif'}
                color={'#5F2EEA'}
              >
                From Jan.
              </Text>
            </Box>
            <Box bg={'white'} rounded={'md'} w={'50%'} h={'32'} p={3}>
              <Icon
                size={'xl'}
                color="#5F2EEA"
                bg={'teal.300'}
                p={1}
                rounded={'md'}
              >
                <TbShoppingCartDollar />
              </Icon>
              <Text
                fontSize={'18px'}
                fontWeight={'500'}
                fontFamily={'sans-serif'}
                color={'gray.600'}
              >
                Avg. Order Value
              </Text>
              <Text
                fontSize={'24px'}
                fontWeight={'700'}
                fontFamily={'sans-serif'}
                pt={1}
              >
                100
              </Text>
              <Text
                fontSize={'15px'}
                fontWeight={'600'}
                fontFamily={'sans-serif'}
                color={'#5F2EEA'}
              >
                From Jan.
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
      <Box w={'100%'} bg={'white'} rounded={'md'} h={'40'} p={3}>
        <Text
          fontSize={'18px'}
          fontWeight={'500'}
          fontFamily={'sans-serif'}
          color={'gray.600'}
        >
          Selling Products
        </Text>
      </Box>
    </Box>
  );
}
