import { Box, Grid, Image, Text, VStack } from '@chakra-ui/react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from './navbar';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/features/dashboard/get-categories';
import { useParams } from 'react-router';
import { useStoreName } from '@/components/tanstack/useProduct';
import { useFetchStoreName } from '@/components/tanstack/useStore';

// const categories = [
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

// const recommendations = [
//   {
//     name: 'Woman Clothes',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//     price: 'Rp 950.000',
//   },
//   {
//     name: 'Woman Clothes',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//     price: 'Rp 950.000',
//   },
//   {
//     name: 'Woman Clothes',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//     price: 'Rp 950.000',
//   },
//   {
//     name: 'Woman Clothes',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//     price: 'Rp 950.000',
//   },
//   {
//     name: 'Woman Clothes',
//     image:
//       'https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg',
//     price: 'Rp 950.000',
//   },
// ];

export default function StoreProduct() {
  const { username } = useParams();
  const useFetchCategory = () => {
    return useQuery({
      queryKey: ['Category'],
      queryFn: () => getCategories(),
    });
  };

  const { data, isLoading, error } = useFetchCategory();
  const { data: products } = useStoreName(String(username));
  const {
    data: store,
    isLoading: loadingStore,
    error: storeError,
  } = useFetchStoreName(String(username));
  // const { data, isLoading, isError, error } = useQuery<
  //   CategoryResponse | undefined,
  //   Error
  // >({

  // });

  return (
    <Box>
      <Box position="sticky" top="0" right="0" overflow="auto" zIndex="2">
        <Navbar />
      </Box>
      <Box m="0" h="full" w="full" p="3">
        <Box bgColor="white" p="3">
          <VStack>
            <Box
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
              w="full"
            >
              <Text fontWeight="700" fontSize="2xl" color="#2400FE">
                {store?.name}
              </Text>
            </Box>
            {loadingStore && (
              <>
                {' '}
                <Text>Loading....</Text>{' '}
              </>
            )}
            {storeError && (
              <>
                {' '}
                <Text>{storeError.message}</Text>{' '}
              </>
            )}
            <Image
              width={'auto'}
              height={'25%'}
              src={
                store?.banner_attachment
                  ? store.banner_attachment
                  : 'https://wallpapers.com/images/featured/blank-h9v8oske8iey8nkq.jpg'
              }
            />
            {/* <Carousel
              useKeyboardArrows={true}
              showThumbs={false}
              showStatus={false}
            >
              {backroundImages.map((URL, index) => (
                <div className="slide">
                  <img alt="sample_file" src={URL} key={index} width={'60%'} />
                </div>
              ))}
            </Carousel> */}
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
          <Box w="90%" mt="10px">
            <Grid templateColumns="repeat(5, 1fr)" gap="1" gapY="5" mb="15px">
              {isLoading && (
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
              )}
              {data
                ?.filter((category) => !category.parentId)
                .map((category) => (
                  <Box
                    bgColor="White"
                    borderRadius="5px"
                    w="90%"
                    boxShadow="2px 2px 5px 1px grey"
                  >
                    <VStack
                      m="15px"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {/* <Image
                      src={category.image}
                      borderRadius="5px"
                      w="full"
                      h="100px"
                      objectFit="cover"
                      alt={`User uploaded image ${index + 1}`}
                    /> */}
                      <Text fontWeight="600" textAlign="center">
                        {category.name}
                      </Text>
                    </VStack>
                  </Box>
                ))}
            </Grid>
          </Box>
        </VStack>

        <VStack my="5" h="full" w="full" p="3" bgColor="white">
          <Text
            fontWeight="600"
            fontSize="20px"
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            w="full"
          >
            Our Product
          </Text>
          <Box w="90%" mt="10px">
            <Grid templateColumns="repeat(4, 1fr)" gap="1" gapY="5" mb="15px">
              {!products ? (
                <>
                  <Text textAlign={'center'}>No Product Available</Text>
                </>
              ) : (
                products?.map((product) => (
                  <Box
                    bgColor="White"
                    borderRadius="5px"
                    w="90%"
                    h="250px"
                    boxShadow="2px 2px 5px 1px grey"
                  >
                    <VStack
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image
                        src={
                          Array.isArray(product.attachments) &&
                          product.attachments.length > 0
                            ? typeof product.attachments[0] === 'string'
                              ? product.attachments[0]
                              : URL.createObjectURL(product.attachments[0])
                            : ''
                        }
                        alt={product.name}
                        w={'28'}
                      />
                      <Text fontWeight="600" textAlign="center">
                        {product.name}
                      </Text>
                      <Text fontWeight="400" textAlign="center" fontSize="15px">
                        Rp.{' '}
                        {product.variants?.[0].variantOptions[0].values?.[0]
                          .price
                          ? product.variants?.[0].variantOptions[0].values[0]
                              .price
                          : '-'}
                      </Text>
                    </VStack>
                  </Box>
                ))
              )}
            </Grid>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
