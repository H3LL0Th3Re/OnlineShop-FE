import { Box, Grid, Image, Text, VStack } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/features/dashboard/get-categories';
import NavbarBuyer from './navbarBuyer';

const backroundImages = [
  'https://res.cloudinary.com/dbavdkhmz/image/upload/v1737548208/1_scleah.png',
  'https://res.cloudinary.com/dbavdkhmz/image/upload/v1737548320/2_b4vc5m.png',
  'https://res.cloudinary.com/dbavdkhmz/image/upload/v1737548327/3_xydogw.png',
];

// const data = [
//   {
//     name: 'Electronics',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//   },
//   {
//     name: 'Computer & Accessories',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//   },
//   {
//     name: 'Handphone & Accessories',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//   },
//   {
//     name: 'Man Clothes',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//   },
//   {
//     name: 'Man Shoes',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//   },
//   {
//     name: 'Man Bags',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//   },
//   {
//     name: 'Fashion Accesories',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//   },
//   {
//     name: 'Watches',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//   },
//   {
//     name: 'Health & Medicine',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//   },
//   {
//     name: 'Hobby & Collections',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//   },
//   {
//     name: 'Food & Drinks',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//   },
//   {
//     name: 'Care & Beauty',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//   },
//   {
//     name: 'Home Utensils',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//   },
// ];

const recommendations = [
  {
    name: 'Woman Clothes',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 'Rp 950.000',
  },
  {
    name: 'Woman Clothes',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 'Rp 950.000',
  },
  {
    name: 'Woman Clothes',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 'Rp 950.000',
  },
  {
    name: 'Woman Clothes',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 'Rp 950.000',
  },
  {
    name: 'Woman Clothes',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 'Rp 950.000',
  },
  {
    name: 'Woman Clothes',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 'Rp 950.000',
  },
  {
    name: 'Woman Clothes',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 'Rp 950.000',
  },
  {
    name: 'Woman Clothes',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 'Rp 950.000',
  },
  {
    name: 'Woman Clothes',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 'Rp 950.000',
  },
  {
    name: 'Woman Clothes',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 'Rp 950.000',
  },
  {
    name: 'Woman Clothes',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 'Rp 950.000',
  },
  {
    name: 'Woman Clothes',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
    price: 'Rp 950.000',
  },
];

export function Home() {
  const useFetchCategory = () => {
    return useQuery({
      queryKey: ['Category'],
      queryFn: () => getCategories(),
    });
  };
  const { data, isLoading, error } = useFetchCategory();
  // const { data, isLoading, isError, error } = useQuery<
  //   CategoryResponse | undefined,
  //   Error
  // >({

  // });

  return (
    <Box>
      <Box position="sticky" top="0" right="0" overflow="auto" zIndex="2">
        <NavbarBuyer />
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
          <Text
            fontWeight="600"
            fontSize="20px"
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            w="full"
          >
            Product Categories
          </Text>


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
                .map((category,index) => (
                <Box
                  bgColor="#F4F5F0"
                  borderRadius="5px"
                  w="full"
                  h="140px"
                  p="2"
                >
                  <VStack w="full" h="full" gap="1">
                    {/* <Image
                      src={category.image}
                      borderRadius="5px"
                      w="full"
                      h="100px"
                      objectFit="cover"
                      alt={`User uploaded image ${index + 1}`}
                    /> */}
                    <Box borderRadius="5px"
                      w="full"
                      h="100px"
                      objectFit="cover"
                      bg="blue"
                      >

                    </Box>
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

        <VStack my="5" h="full" w="full" p="3" bg="#F3F4F6" borderRadius="5px">
          <Text fontWeight="600" fontSize="20px" w="full">
            Recommendations
          </Text>
          <Box w="full" mt="10px">
            <Grid templateColumns="repeat(5, 1fr)" gap="4">
              {recommendations.map((recommendation, index) => (
                <Box bgColor="White" borderRadius="5px" w="100%" h="270px">
                  <VStack
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image
                      src={recommendation.image}
                      borderTopRadius="5px"
                      w="full"
                      h="200px"
                      objectFit="cover"
                      alt={`User uploaded image ${index + 1}`}
                    />
                    <Text fontWeight="600" textAlign="center">
                      {recommendation.name}
                    </Text>
                    <Text fontWeight="400" textAlign="center" fontSize="15px">
                      {recommendation.price}
                    </Text>
                  </VStack>
                </Box>
              ))}
            </Grid>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
