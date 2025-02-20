import { Box, Grid, Image, Text, VStack } from '@chakra-ui/react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Link, useParams } from 'react-router';
import { useStoreName } from '@/components/tanstack/useProduct';
import { useFetchStoreName } from '@/components/tanstack/useStore';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { formatPrice } from '@/utils/format-price';
import NavbarBuyer from './navbarBuyer';

export default function previewStoreProduct() {
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
    <Box bg="white">
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
                        {(product.variants ?? []).length > 0
                          ? formatPrice(
                              (
                                product.variants?.[0]
                                  ?.Variant_options?.[0] as any
                              )?.variant_values?.[0]?.variant_option_value
                                ?.price || 0
                            )
                          : formatPrice(product.price || 0)}
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
