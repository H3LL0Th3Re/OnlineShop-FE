import { Box, Button, Flex, Grid, HStack, Icon, Text } from '@chakra-ui/react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { GoPeople } from 'react-icons/go';
import { GrSecure } from 'react-icons/gr';
import { MdOutlineStore } from 'react-icons/md';
import { Link } from 'react-router';

export function LandingPage() {
  return (
    <Box bgGradient="to-r" gradientFrom="red.300" gradientTo="blue.500">
      <Box p={5}>
        <Flex alignItems={'center'} justify={'space-between'}>
          <Text fontSize={'4xl'} fontWeight={'extrabold'} color={'#5F2EEA'}>
            LAKOE APP
          </Text>
          <HStack gap={10} color={'whiteAlpha.900'}>
            <Box _hover={{ color: '#5F2EEA' }}>
              <Link to={'/'}>Templates</Link>
            </Box>
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
          <Button bg={'#5F2EEA'} rounded={'full'}>
            <Link to={'/register'}>Become a Seller</Link>
          </Button>
        </Flex>
      </Box>
      <Flex direction={'column'} p={'32'} align={'center'} gap={3}>
        <Box>
          <Text
            textAlign={'center'}
            fontSize={'7xl'}
            fontWeight={'bold'}
            color={'whiteAlpha.900'}
          >
            Turn Your Templates into Profit
          </Text>
          <Text textAlign={'center'} fontSize={'xl'} color={'whiteAlpha.900'}>
            Join thousands of creators selling their premium templates, themes,
            and digital assets to a global audience.
          </Text>
        </Box>
        <Box spaceX={5} pt={10}>
          <Button
            size={'xl'}
            bg={'whiteAlpha.900'}
            rounded={'full'}
            color={'#5F2EEA'}
            fontSize={'xl'}
            _hover={{ bg: '#5F2EEA', color: 'white' }}
          >
            GET STARTED <FaLongArrowAltRight />
          </Button>
          <Button
            rounded={'full'}
            size={'xl'}
            borderWidth={'2px'}
            borderColor={'whiteAlpha.900'}
            bg={'transparent'}
            fontSize={'xl'}
          >
            Learn More
          </Button>
        </Box>
      </Flex>
      <Box bg={'white'} mt={10}>
        <Grid templateColumns="repeat(3, 1fr)" textAlign={'center'} p={10}>
          <Flex direction={'column'} align={'center'} gap={5}>
            <Box
              bg={'#F3E8FF'}
              h={'14'}
              w={'14'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              rounded={'full'}
            >
              <Icon size={'xl'}>
                <MdOutlineStore />
              </Icon>
            </Box>
            <Text fontSize={'2xl'}>Easy To Sell</Text>
            <Text color={'gray.600'}>
              Upload your templates and start selling in minutes with our
              streamlined platform.
            </Text>
          </Flex>
          <Flex direction={'column'} align={'center'} gap={5}>
            <Box
              bg={'#F3E8FF'}
              h={'14'}
              w={'14'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              rounded={'full'}
            >
              <Icon size={'xl'}>
                <GoPeople />
              </Icon>
            </Box>
            <Text fontSize={'2xl'}>Global Audience</Text>
            <Text color={'gray.600'}>
              Reach thousands of potential buyers from around the world looking
              for quality templates.
            </Text>
          </Flex>
          <Flex direction={'column'} align={'center'} gap={5}>
            <Box
              bg={'#F3E8FF'}
              h={'14'}
              w={'14'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              rounded={'full'}
            >
              <Icon size={'xl'}>
                <GrSecure />
              </Icon>
            </Box>
            <Text fontSize={'2xl'}>Secure Payment</Text>
            <Text color={'gray.600'}>
              Get paid securely and on time with our trusted payment processing
              system.
            </Text>
          </Flex>
        </Grid>
      </Box>
    </Box>
  );
}
