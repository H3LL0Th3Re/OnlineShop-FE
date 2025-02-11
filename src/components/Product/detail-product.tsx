import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import { StepperInput } from '@/components/ui/stepper-input';
import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useFetchProductUrl } from '../tanstack/useProduct';
import { formatPrice } from '@/utils/format-price';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
export default function DetailProduct() {
  const { username, url } = useParams();
  const [selected, setSelected] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useFetchProductUrl(String(username), String(url));
  const imageUrls =
    products?.attachments?.map((attachment) => {
      // If attachment is a File object, create an Object URL
      if (attachment instanceof File) {
        return URL.createObjectURL(attachment);
      }
      // If attachment is already a URL (string), just return it
      return attachment;
    }) || [];
  const nextImage = () => {
    if (imageUrls.length === 0) return;

    setCurrentImageIndex((prevIndex) => {
      if (prevIndex < imageUrls.length - 1) {
        return prevIndex + 1;
      } else {
        return 0; // Loop back to the first image
      }
    });
  };

  const prevImage = () => {
    if (imageUrls.length === 0) return;

    setCurrentImageIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      } else {
        return imageUrls.length - 1; // Loop back to the last image
      }
    });
  };
  return (
    <Box bg="white" w="full" h="full" m="0" p="3">
      {isLoading && (
        <>
          <Text>Loading...</Text>
        </>
      )}
      {isError && (
        <>
          <Text>{error.message}</Text>
        </>
      )}
      <HStack w="full" h="full" gap="6" mt="20px">
        <Box
          w="60%"
          h="full"
          position="sticky"
          top="0"
          left="0"
          overflow="auto"
        >
          {imageUrls.length > 0 && (
            <Image
              h="full"
              width={'auto'}
              src={imageUrls[currentImageIndex]}
              alt="Product Image"
            />
          )}
          {imageUrls.length > 1 && (
            <>
              <Button
                position="absolute"
                top="50%"
                right="10px"
                transform="translateY(-50%)"
                size="lg"
                onClick={nextImage}
                aria-label="Next Image"
              >
                {' '}
                <ChevronRightIcon />
              </Button>
              <Button
                position="absolute"
                top="50%"
                left="10px"
                transform="translateY(-50%)"
                size="lg"
                onClick={prevImage}
                aria-label="Next Image"
              >
                {' '}
                <ChevronLeftIcon />
              </Button>
            </>
          )}
        </Box>
        <VStack
          w="40%"
          height="90vh"
          overflowY="auto"
          scrollbar="hidden"
          mb="7px"
        >
          <VStack w="full" borderBottomWidth="3px" mb="">
            <Text fontSize="30px" fontWeight="700" w="full">
              {products?.name}
            </Text>
            <Text fontSize="20px" fontWeight="600" w="full" mb="15px">
              {products?.price
                ? formatPrice(products.price)
                : products?.variants?.[0].Variant_options[0]
                      .Variant_option_values?.[0].price
                  ? formatPrice(
                      products.variants?.[0].Variant_options[0]
                        .Variant_option_values?.[0].price
                    )
                  : '-'}
            </Text>
          </VStack>
          <Box w="full" mt="15px">
            <VStack w="full" display="flex" alignItems="flex-start">
              <Text fontSize="15px" fontWeight="600" w="full">
                Select Variant
              </Text>
              <Grid templateColumns="repeat(6, 1fr)" gap="2" mb="5px">
                {['Biru', 'Hitam', 'Merah', 'Kuning'].map((warna) => (
                  <Button
                    borderWidth="1px"
                    borderColor="black"
                    borderRadius="4px"
                    p="7px"
                    fontWeight="500"
                    textAlign="center"
                    bg={selected === warna ? 'black' : 'white'}
                    color={selected === warna ? 'white' : 'black'}
                    onClick={() => setSelected(warna)}
                  >
                    {warna}
                  </Button>
                ))}
              </Grid>

              <Text fontSize="15px" fontWeight="600" w="full">
                Select Size
              </Text>
              <Grid templateColumns="repeat(6, 1fr)" gap="2" mb="5px">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <Button
                    borderWidth="1px"
                    borderColor="black"
                    borderRadius="4px"
                    p="7px"
                    fontWeight="500"
                    textAlign="center"
                    bg={selected === size ? 'black' : 'white'}
                    color={selected === size ? 'white' : 'black'}
                    onClick={() => setSelected(size)}
                  >
                    {size}
                  </Button>
                ))}
              </Grid>

              <Text fontSize="15px" fontWeight="600" w="full">
                Select Variant
              </Text>
              <Grid templateColumns="repeat(6, 1fr)" gap="2" mb="5px">
                {['Panjang', 'Pendek'].map((variant) => (
                  <Box
                    borderWidth="1px"
                    borderColor="black"
                    borderRadius="4px"
                    p="7px"
                    fontWeight="500"
                    textAlign="center"
                    bg={selected === variant ? 'black' : 'white'}
                    color={selected === variant ? 'white' : 'black'}
                    onClick={() => setSelected(variant)}
                  >
                    {variant}
                  </Box>
                ))}
              </Grid>
              <Text fontSize="15px" fontWeight="600" w="full">
                Quantity
              </Text>
              <StepperInput defaultValue="1" min={1} max={50} />
              <HStack w="full" mt="15px">
                <Button
                  w="50%"
                  p="7"
                  borderWidth="2px"
                  borderColor="black"
                  bg="white"
                  color="black"
                >
                  Add to Cart
                </Button>
                <Button w="50%" p="7">
                  Buy it Now
                </Button>
              </HStack>

              <AccordionRoot collapsible defaultValue={['specification']}>
                <AccordionItem value="specification">
                  <AccordionItemTrigger>
                    Product Specification
                  </AccordionItemTrigger>
                  <AccordionItemContent p="3">
                    <HStack gapX="10">
                      <VStack>
                        <Text color="grey" w="full">
                          Category
                        </Text>
                        <Text color="grey" w="full">
                          Stock
                        </Text>
                        <Text color="grey" w="full">
                          Weight
                        </Text>
                        <Text color="grey" w="full">
                          Length
                        </Text>
                        <Text color="grey" w="full">
                          Width
                        </Text>
                        <Text color="grey" w="full">
                          Height
                        </Text>
                        <Text color="grey" w="full">
                          SKU
                        </Text>
                      </VStack>

                      <VStack>
                        <Text w="full">Category</Text>
                        <Text w="full">Stock</Text>
                        <Text w="full">Weight</Text>
                        <Text w="full">Length</Text>
                        <Text w="full">Width</Text>
                        <Text w="full">Height</Text>
                        <Text w="full">SKU</Text>
                      </VStack>
                    </HStack>
                  </AccordionItemContent>
                </AccordionItem>
              </AccordionRoot>

              <AccordionRoot collapsible defaultValue={['description']}>
                <AccordionItem value="description">
                  <AccordionItemTrigger>
                    Product Description
                  </AccordionItemTrigger>
                  <AccordionItemContent>
                    {products?.description || 'No description'}
                  </AccordionItemContent>
                </AccordionItem>
              </AccordionRoot>
            </VStack>
          </Box>
        </VStack>
      </HStack>
    </Box>
  );
}
