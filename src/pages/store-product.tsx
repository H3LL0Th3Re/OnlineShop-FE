import { Box, Grid, Image, Text, VStack } from '@chakra-ui/react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Link, useParams } from 'react-router';
import { useStoreName } from '@/components/tanstack/useProduct';
import { useFetchStoreName } from '@/components/tanstack/useStore';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { formatPrice } from '@/utils/format-price';
import NavbarBuyer from './navbarBuyer';

export default function StoreProduct() {
  const { username } = useParams();

  const { data: products } = useStoreName(String(username));
  const {
    data: store,
    isLoading: loadingStore,
    error: storeError,
  } = useFetchStoreName(String(username));

  function scrollHorizontally(direction: 'left' | 'right') {
    const container = document.getElementById('scrollable-container');
    const scrollAmount = direction === 'left' ? -300 : 300;
    container?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  return (
    <Box>
      <Box position="sticky" top="0" right="0" overflow="auto" zIndex="2">
        <NavbarBuyer />
      </Box>

      <Box w="full" p="3">
        <Box w="full" h="full" mb="15px">
          <Image
            w="full"
            h="350px"
            borderRadius="5px"
            src={
              store?.banner_attachment
                ? store.banner_attachment
                : 'https://wallpapers.com/images/featured/blank-h9v8oske8iey8nkq.jpg'
            }
          ></Image>
        </Box>
        <Box
          w="full"
          h="150px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="30px" fontWeight="700" mb="10px" color="red">
            {store?.name}
          </Text>
          <Text fontSize="20px" fontWeight="500" fontStyle="italic">
            "{store?.slogan}"
          </Text>
        </Box>
        <Box position="relative" w="full" h="full" p="3">
          <Button
            position="absolute"
            top="50%"
            left="0"
            transform="translateY(-50%)"
            zIndex="10"
            bg="#5F2EEA"
            onClick={() => scrollHorizontally('left')}
          >
            <ChevronLeftIcon style={{ fontSize: '12px' }} />
          </Button>

          <Box
            id="scrollable-container"
            w="full"
            h="full"
            overflowX="auto"
            display="flex"
            scrollbar="visible"
            bg="gray.100"
          >
            <Grid
              templateColumns={`repeat(${products?.length}, 220px)`}
              gap="3"
              gapY="1"
              w="max-content"
              p="4"
            >
              {loadingStore && (
                <>
                  {' '}
                  <Text> Loading store....</Text>{' '}
                </>
              )}
              {storeError && (
                <>
                  {' '}
                  <Text> Error: {storeError.message}</Text>{' '}
                </>
              )}
              {products?.map((product, index) => (
                <Box
                  bgColor="White"
                  borderRadius="5px"
                  w="100%"
                  h="250px"
                  borderWidth="1px"
                  borderColor="gray.200"
                >
                  <Link to={`/${store?.username}/${product.url}`}>
                    <VStack display="flex" alignItems="center" h="full">
                      <Image
                        src={
                          Array.isArray(product.attachments) &&
                          product.attachments.length > 0
                            ? typeof product.attachments[0] === 'string'
                              ? product.attachments[0]
                              : URL.createObjectURL(product.attachments[0])
                            : ''
                        }
                        borderTopRadius="5px"
                        w="full"
                        h="70%"
                        objectFit="cover"
                        alt={`User uploaded image ${index + 1}`}
                      />
                      <Text fontWeight="600" textAlign="center">
                        {product.name}
                      </Text>
                      <Text fontWeight="400" textAlign="center" fontSize="15px">
                        Rp.{' '}
                        {product.price
                          ? formatPrice(product.price)
                          : product.variants?.[0].Variant_options[0]
                                .Variant_option_values?.[0].price
                            ? formatPrice(
                                product.variants?.[0].Variant_options[0]
                                  .Variant_option_values?.[0].price
                              )
                            : '-'}
                      </Text>
                    </VStack>
                  </Link>
                </Box>
              ))}
            </Grid>
          </Box>
          <Button
            position="absolute"
            top="50%"
            right="0"
            transform="translateY(-50%)"
            zIndex="10"
            bg="#5F2EEA"
            onClick={() => scrollHorizontally('right')}
          >
            <ChevronRightIcon style={{ fontSize: '12px' }} />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

/* <Box> */
//   <Box position="sticky" top="0" right="0" overflow="auto" zIndex="2">
//     <Navbar />
//   </Box>
//   <Box m="0" h="full" w="full" p="3">
//     <Box bgColor="white" p="3">
//       <VStack>
//         <Box
//           display="flex"
//           justifyContent="flex-start"
//           alignItems="center"
//           w="full"
//         >
//           <Text fontWeight="700" fontSize="2xl" color="#2400FE">
//             {store?.name}
//           </Text>
//         </Box>
//         {loadingStore && (
//           <>
//             {' '}
//             <Text>Loading....</Text>{' '}
//           </>
//         )}
//         {storeError && (
//           <>
//             {' '}
//             <Text>{storeError.message}</Text>{' '}
//           </>
//         )}
//         <Image
//           width={'auto'}
//           height={'25%'}
//           src={
//             store?.banner_attachment
//               ? store.banner_attachment
//               : 'https://wallpapers.com/images/featured/blank-h9v8oske8iey8nkq.jpg'
//           }
//         />
//         {/* <Carousel
//           useKeyboardArrows={true}
//           showThumbs={false}
//           showStatus={false}
//         >
//           {backroundImages.map((URL, index) => (
//             <div className="slide">
//               <img alt="sample_file" src={URL} key={index} width={'60%'} />
//             </div>
//           ))}
//         </Carousel> */}
//       </VStack>
//     </Box>

//     <VStack my="5" h="full" w="full" p="3" bgColor="white">
//       <Text
//         fontWeight="600"
//         fontSize="20px"
//         display="flex"
//         justifyContent="flex-start"
//         alignItems="center"
//         w="full"
//       >
//         Product Categories
//       </Text>
//       <Box w="90%" mt="10px">
//         <Grid templateColumns="repeat(5, 1fr)" gap="1" gapY="5" mb="15px">
//           {isLoading && (
//             <>
//               {' '}
//               <Text> Loading....</Text>{' '}
//             </>
//           )}
//           {error && (
//             <>
//               {' '}
//               <Text> Error: {error.message}</Text>{' '}
//             </>
//           )}
//           {data
//             ?.filter((category) => !category.parentId)
//             .map((category) => (
//               <Box
//                 bgColor="White"
//                 borderRadius="5px"
//                 w="90%"
//                 boxShadow="2px 2px 5px 1px grey"
//               >
//                 <VStack
//                   m="15px"
//                   display="flex"
//                   justifyContent="center"
//                   alignItems="center"
//                 >
//                   {/* <Image
//                   src={category.image}
//                   borderRadius="5px"
//                   w="full"
//                   h="100px"
//                   objectFit="cover"
//                   alt={`User uploaded image ${index + 1}`}
//                 /> */}
//                   <Text fontWeight="600" textAlign="center">
//                     {category.name}
//                   </Text>
//                 </VStack>
//               </Box>
//             ))}
//         </Grid>
//       </Box>
//     </VStack>

//     <VStack my="5" h="full" w="full" p="3" bgColor="white">
//       <Text
//         fontWeight="600"
//         fontSize="20px"
//         display="flex"
//         justifyContent="flex-start"
//         alignItems="center"
//         w="full"
//       >
//         Our Product
//       </Text>
//       <Box w="90%" mt="10px">
//         <Grid templateColumns="repeat(4, 1fr)" gap="1" gapY="5" mb="15px">
//           {!products ? (
//             <>
//               <Text textAlign={'center'}>No Product Available</Text>
//             </>
//           ) : (
//             products?.map((product) => (
//               <Box
//                 bgColor="White"
//                 borderRadius="5px"
//                 w="90%"
//                 h="250px"
//                 boxShadow="2px 2px 5px 1px grey"
//               >
//                 <VStack
//                   display="flex"
//                   justifyContent="center"
//                   alignItems="center"
//                 >
//                   <Image
//                     src={
//                       typeof product.attachments === 'string'
//                         ? product.attachments
//                         : ''
//                     }
//                     alt={product.name}
//                     w={'28'}
//                   />
//                   <Text fontWeight="600" textAlign="center">
//                     {product.name}
//                   </Text>
//                   <Text fontWeight="400" textAlign="center" fontSize="15px">
//                     Rp.{' '}
//                     {product.variants?.[0].variantOptions[0].values?.[0]
//                       .price
//                       ? product.variants?.[0].variantOptions[0].values[0]
//                           .price
//                       : '-'}
//                   </Text>
//                 </VStack>
//               </Box>
//             ))
//           )}
//         </Grid>
//       </Box>
//     </VStack>
//   </Box>
// </Box>
