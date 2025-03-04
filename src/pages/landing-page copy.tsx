import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  HStack,
  VStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  ShoppingBag,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import { Link } from 'react-router';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

function LandingPageCopy() {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const features = [
    {
      icon: <ShoppingBag size={24} />,
      title: 'Easy to Start',
      description: 'Set up your store in minutes and start selling right away',
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Grow Your Business',
      description: 'Access powerful tools to scale your online presence',
    },
    {
      icon: <Users size={24} />,
      title: 'Global Reach',
      description: 'Connect with customers worldwide through our platform',
    },
    {
      icon: <Wallet size={24} />,
      title: 'Secure Payments',
      description: 'Reliable payment processing and instant transfers',
    },
  ];

  return (
    <Box bgGradient="to-r" gradientFrom="#CFEEFC" gradientTo="#FAFAFA">
      {/* Navigation Bar */}
      <Box
        py={10}
        bgGradient="to-r"
        gradientFrom="#CFEEFC"
        gradientTo="#FAFAFA"
        position="sticky"
        top={0}
        zIndex={1000}
        shadow="sm"
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Box w={'150px'}>
              <Image
                src="https://res.cloudinary.com/dbavdkhmz/image/upload/v1740373500/Lakoe_Logo_rxtafs.png"
                alt="logo"
              />
            </Box>

            <HStack gap={8}>
              <Text
                fontWeight="medium"
                cursor="pointer"
                _hover={{ color: 'brand.500' }}
              >
                Home
              </Text>
              <Text cursor="pointer" _hover={{ color: 'brand.500' }}>
                About Us
              </Text>
              <Text cursor="pointer" _hover={{ color: 'brand.500' }}>
                Contact Us
              </Text>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        bgGradient="to-r"
        gradientFrom="#CFEEFC"
        gradientTo="#FAFAFA"
        minH="100vh"
        py={20}
      >
        <Container maxW="container.xl">
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            gap={12}
            align="center"
            justify="space-between"
          >
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              flex={1}
            >
              <Text fontSize={'6xl'} fontWeight={'700'} mb={6} color="#0ea5e9">
                Transform Your Passion into Profit
              </Text>
              <Text fontSize="xl" color="gray.600" mb={8}>
                Join thousands of successful sellers who have turned their
                dreams into reality. Start your online business journey today.
              </Text>
              <Button
                size="lg"
                bgColor={'#0ea5e9'}
                px={8}
                as={motion.button}
                _hover={{ transform: 'scale(1.05)' }}
                _active={{ transform: 'scale(0.95)' }}
              >
                <Link to={'/register'}>Start Selling Now</Link>
              </Button>
            </MotionBox>

            {isDesktop && (
              <MotionImage
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                flex={1}
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                rounded="2xl"
                shadow="2xl"
                alt="Online Business"
              />
            )}
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={10}>
        <Container maxW="container.xl">
          <Heading
            textAlign="center"
            mb={16}
            fontSize={'4xl'}
            fontWeight={'700'}
            color="#0ea5e9"
          >
            Why Choose Our Platform?
          </Heading>
          <Flex wrap="wrap" justify="center" gap={8}>
            {features.map((feature, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                bg="#FFDD99"
                p={8}
                rounded="xl"
                shadow="lg"
                width={{ base: 'full', md: '45%', lg: '22%' }}
                _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
                style={{ transition: 'all 0.3s' }} // Changed this line
              >
                <Box color="brand.500" mb={4}>
                  {feature.icon}
                </Box>
                <Heading size="md" mb={4}>
                  {feature.title}
                </Heading>
                <Text color="gray.600">{feature.description}</Text>
              </MotionBox>
            ))}
          </Flex>
        </Container>
      </Box>

      <Box py={20}>
        <Container maxW="container.xl">
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            gap={12}
            align="center"
            justify="space-between"
          >
            {isDesktop && (
              <MotionImage
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                flex={1}
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                rounded="2xl"
                shadow="2xl"
                alt="Success Story"
              />
            )}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              flex={1}
            >
              <Heading
                as="h2"
                mb={6}
                fontSize={'4xl'}
                fontWeight={'700'}
                color="#0ea5e9"
              >
                Simplifying Your Online Business Journey
              </Heading>
              <Text fontSize="lg" color="gray.600" mb={8}>
                Lakoe is here as a complete solution for online sellers. We
                understand the challenges of managing businesses across various
                marketplaces, which is why we created a platform that simplifies
                all processes - from product management to sales analytics - in
                one integrated dashboard.
              </Text>
              <Button
                size="lg"
                bgColor={'#0ea5e9'}
                px={8}
                as={motion.button}
                _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
                style={{ transition: 'all 0.3s' }} // Changed this line
              >
                Get Started Free
              </Button>
            </MotionBox>
          </Stack>
        </Container>
      </Box>
      <Box py={10} bg="brand.50">
        <Container maxW="container.xl">
          <VStack gap={16}>
            <Box textAlign="center">
              <Heading
                fontSize={{ base: '3xl', md: '4xl' }}
                fontWeight="700"
                mb={4}
              >
                Manage your business in
                <Text as="span" pt={5} color="#0ea5e9" display="block">
                  One Dashboard
                </Text>
              </Heading>
            </Box>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
              <Box
                bg="#E7A5E2"
                p={6}
                rounded="xl"
                shadow="md"
                _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
                transition="all 0.3s"
              >
                <Heading size="xl" fontWeight={'700'} mb={4}>
                  Product Management
                </Heading>
                <Text color="gray.700" mb={4}>
                  Add and edit products across all your marketplace stores more
                  quickly
                </Text>
                <Image
                  src="https://img.freepik.com/free-vector/product-manager-concept-illustration_114360-21574.jpg?t=st=1740210511~exp=1740214111~hmac=0d1e81a11d2296d5e21ee1f1fea12eb221b2edfd0ef4fcc94539f8de66f55d1f&w=740"
                  alt="Product Management"
                  rounded="lg"
                />
              </Box>

              <Box
                bg="#E7A5E2"
                p={6}
                rounded="xl"
                shadow="md"
                _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
                transition="all 0.3s"
              >
                <Heading size="xl" mb={4} fontWeight={'700'}>
                  Order Management
                </Heading>
                <Text color="gray.700" mb={4}>
                  Process orders from pickup requests to shipping management
                  across all your marketplace stores
                </Text>
                <Image
                  src="https://img.freepik.com/free-vector/conveyor-belt-warehouse-concept-illustration_114360-15026.jpg?t=st=1740210549~exp=1740214149~hmac=736f5ed711a48769d4ec24e1d1e1ff3222fbd99a41e6e59f16b1b2caab593860&w=740"
                  rounded="lg"
                />
              </Box>

              <Box
                bg="#E7A5E2"
                p={6}
                rounded="xl"
                shadow="md"
                _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
                transition="all 0.3s"
              >
                <Heading size="xl" mb={4} fontWeight={'700'}>
                  Stock Synchronization
                </Heading>
                <Text color="gray.700" mb={4}>
                  More accurate and automatically updated stock to prevent
                  overselling & underselling!
                </Text>
                <Image
                  src="https://img.freepik.com/free-vector/accounting-concept-illustration_114360-16010.jpg?t=st=1740210807~exp=1740214407~hmac=3859738196f843748aedbd53b59e27e439b90495cfc85092bec2060e3bd03f20&w=740"
                  alt="Stock Synchronization"
                  rounded="lg"
                />
              </Box>

              <Box
                bg="#E7A5E2"
                p={6}
                rounded="xl"
                shadow="md"
                _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
                transition="all 0.3s"
              >
                <Heading size="xl" mb={4} fontWeight={'700'}>
                  Consolidated Reports
                </Heading>
                <Text color="gray.700" mb={4}>
                  Analyze sales and stock reports from marketplace stores to
                  accelerate your business growth
                </Text>
                <Image
                  src="https://img.freepik.com/free-vector/digital-presentation-concept-illustration_114360-8175.jpg?t=st=1740210728~exp=1740214328~hmac=18d2a52248a7a7274643b12bec50fef976d60c5d32d6ed0d562004bf5f5fac29&w=740"
                  alt="Consolidated Reports"
                  rounded="lg"
                />
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
      <Box bg="#0ea5e9" color="white" py={5}>
        <Container maxW="container.xl">
          <Stack
            direction={{ base: 'column', md: 'row' }}
            spaceY={8}
            align="center"
            justify="space-between"
          >
            <VStack align="start" spaceY={4} maxW="lg">
              <Heading size="xl" fontWeight={'700'}>
                Ready to Start Your Success Story?
              </Heading>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <li
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <CheckCircle size={16} color="white" />
                  No setup fees
                </li>
                <li
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <CheckCircle size={16} color="white" />
                  24/7 support
                </li>
                <li
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <CheckCircle size={16} color="white" />
                  flat charges 1%
                </li>
              </ul>
            </VStack>
            <VStack gap={6} align="center">
              <HStack gap={6}>
                <Link to="https://instagram.com/lakoe">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/600px-Instagram_icon.png"
                    alt="Instagram"
                    boxSize="32px"
                    _hover={{ transform: 'scale(1.1)' }}
                    transition="all 0.3s"
                  />
                </Link>
                <Link to="https://facebook.com/lakoe">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/800px-2021_Facebook_icon.svg.png"
                    alt="Facebook"
                    boxSize="32px"
                    _hover={{ transform: 'scale(1.1)' }}
                    transition="all 0.3s"
                  />
                </Link>
                <Link to="https://linkedin.com/company/lakoe">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
                    alt="LinkedIn"
                    boxSize="32px"
                    _hover={{ transform: 'scale(1.1)' }}
                    transition="all 0.3s"
                  />
                </Link>
              </HStack>
              <HStack gap={8}>
                <Image
                  src="https://iconape.com/wp-content/files/yh/207674/png/midtrans-logo.png"
                  alt="Midtrans"
                  height="24px"
                  filter="brightness(0) invert(1)"
                />
                <Image
                  src="https://dashboard.biteship.com/images/logos/biteship.png"
                  alt="Biteship"
                  height="24px"
                  filter="brightness(0) invert(1)"
                />
              </HStack>
            </VStack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPageCopy;
