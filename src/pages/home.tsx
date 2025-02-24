import {
  Box,
  Container,
  Flex,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/features/dashboard/get-categories';
// import NavbarBuyer from './navbarBuyer';
import { useAllStore } from '@/components/tanstack/useStore';
import { Link } from 'react-router';

const backroundImages = [
  'https://res.cloudinary.com/dbavdkhmz/image/upload/v1737548208/1_scleah.png',
  'https://res.cloudinary.com/dbavdkhmz/image/upload/v1737548320/2_b4vc5m.png',
  'https://res.cloudinary.com/dbavdkhmz/image/upload/v1737548327/3_xydogw.png',
];

export function Home() {
  const useFetchCategory = () => {
    return useQuery({
      queryKey: ['Category'],
      queryFn: () => getCategories(),
    });
  };
  const { data } = useFetchCategory();
  const { data: store } = useAllStore();
  console.log(store);
  // const { data, isLoading, isError, error } = useQuery<
  //   CategoryResponse | undefined,
  //   Error
  // >({

  // });

  return (
    <Box>
      <Box position="sticky" top="0" right="0" overflow="auto" zIndex="2">
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
                <Image src="/src/assets/Lakoe-Logo.png" alt="logo" />
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
      </Box>
      <Box m="0" h="full" w="full" p="3">
        <Box bgColor="white" p="3" h="full" w="full">
          <VStack h="full" w="full">
            {/* <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              w="full"
              h="200px"
            ></Box> */}
            <Carousel
              useKeyboardArrows={true}
              showThumbs={false}
              showStatus={false}
            >
              {backroundImages.map((URL, index) => (
                <div className="slide">
                  <img alt="sample_file" src={URL} key={index} />
                </div>
              ))}
            </Carousel>
          </VStack>
        </Box>

        <VStack my="5" h="full" w="full" p="3" bgColor="white">
          <HStack h="full" w="full">
            <Box
              w="15px"
              h="35px"
              color="blue"
              bgColor="#5F2EEA"
              borderRadius="5px"
            ></Box>
            <Text
              fontWeight="600"
              fontSize="20px"
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              w="full"
              color="#5F2EEA"
            >
              Product Categories
            </Text>
          </HStack>

          <Box
            mt="10px"
            id="scrollable-container"
            w="full"
            h="full"
            overflowX="auto"
            display="flex"
            scrollbar="visible"
          >
            <Grid templateColumns="repeat(9, 1fr)" gap="4">
              {/* {isLoading && (
                <>
                  {' '}
                  <Text> Loading....</Text>{' '}
                </>
              )}
              {error && (
                <>
                  {' '}
                  <Text> Error: {error.message}</Text>{' '}
                </>
              )} */}
              {data
                ?.filter((category) => !category.parentId)
                .map((category, index) => (
                  <Box
                    // bgColor="#F3F4F6"
                    borderRadius="5px"
                    borderWidth="2px"
                    borderColor="#F3F4F6"
                    w="full"
                    h="100px"
                    p="2"
                  >
                    <VStack w="full" h="full" gap="0">
                      <Image
                        src={category.icon}
                        w="full"
                        h="40px"
                        objectFit="contain"
                        alt={`User uploaded image ${index + 1}`}
                      />

                      <Text
                        fontWeight="500"
                        fontSize="14px"
                        textAlign="center"
                        w="full"
                        h="full"
                        alignContent="center"
                      >
                        {category.name}
                      </Text>
                    </VStack>
                  </Box>
                ))}
            </Grid>
          </Box>
        </VStack>

        <VStack
          my="5"
          h="full"
          w="full"
          p="3"
          backgroundImage="linear-gradient(to right, white 1%, #F3F4F6 50%, white 99%)"
          borderRadius="5px"
        >
          <Text fontWeight="600" fontSize="20px" w="full" textAlign="center">
            Our Partner Store
          </Text>
          <Box w="full" mt="10px">
            <Grid templateColumns="repeat(7, 1fr)" gap="4">
              {!store && (
                <>
                  <Text>No Stores Available</Text>
                </>
              )}
              {store?.map((stores, index) => (
                <Link to={`/store/${stores.username}`}>
                  <Box borderRadius="5px" w="full" h="160px">
                    <VStack
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      p="2"
                      gap="1"
                    >
                      <Image
                        src={
                          stores?.logo_attachment ||
                          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                        }
                        h="50px"
                        objectFit="contain"
                        alt={`User uploaded image ${index + 1}`}
                      />
                      <Text fontWeight="600" textAlign="center">
                        {stores.name}
                      </Text>
                      <Text fontWeight="400" textAlign="center" fontSize="12px">
                        {stores.slogan}
                      </Text>
                    </VStack>
                  </Box>
                </Link>
              ))}
            </Grid>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
