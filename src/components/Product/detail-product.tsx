import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { formatPrice } from '@/utils/format-price';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import { Product, Variant, Variant_options } from '@/types/product-type';
import { getProductForCheckout } from '@/features/dashboard/services/product';
import Loading from '../Loading/loading';

export default function DetailProduct() {
  const { username, url } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductForCheckout(
          username!,
          url!,
          selectedOptions
        );
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };
    fetchProduct();
  }, [username, url, selectedOptions]);

  useEffect(() => {
    if (product && selectedOptions.length === product.variants?.length) {
      localStorage.setItem(
        'selectedProduct',
        JSON.stringify({
          ...product,
          selectedOptions,
          quantity,
        })
      );
    }
  }, [product, selectedOptions, quantity]);

  const imageUrls =
    product?.attachments?.map((attachment) =>
      attachment instanceof File ? URL.createObjectURL(attachment) : attachment
    ) || [];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + imageUrls.length) % imageUrls.length
    );
  };

  const handleBuyNow = () => {
    navigate('/checkout-product');
  };

  return (
    <Box bg="white" w="full" h="full">
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

      <Box bg="white" w="full" h="full" m="0" p="3">
        {!product && <Loading />}
        {product && (
          <HStack w="full" h="full" gap="6" mt="20px">
            <Box
              w="60%"
              h="full"
              position="sticky"
              top="0"
              left="0"
              display={'flex'}
              justifyContent={'center'}
            >
              {imageUrls.length > 0 && (
                <Image
                  h="full"
                  width={'500px'}
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
                    onClick={nextImage}
                  >
                    <ChevronRightIcon />
                  </Button>
                  <Button
                    position="absolute"
                    top="50%"
                    left="10px"
                    transform="translateY(-50%)"
                    onClick={prevImage}
                  >
                    <ChevronLeftIcon />
                  </Button>
                </>
              )}
            </Box>
            <VStack w="40%" height="90vh" p="3">
              <VStack
                w="full"
                borderBottomWidth="1px"
                borderColor="black"
                p="2"
              >
                <Text fontSize="30px" fontWeight="700">
                  {product.name}
                </Text>
                <Text fontSize="20px" fontWeight="600">
                  {product.variants?.length === 0 ? (
                    <div>Rp {formatPrice(product.price)}</div>
                  ) : selectedOptions.length === product.variants?.length &&
                    product.price !== null ? (
                    <div>Rp {formatPrice(product.price)}</div>
                  ) : (
                    <div>
                      {product.priceRange &&
                      product.priceRange.min !== undefined
                        ? `${formatPrice(product.priceRange.min)} - ${formatPrice(product.priceRange.max)}`
                        : 'No price available'}
                    </div>
                  )}
                </Text>
              </VStack>

              {product.variants?.map((variant: Variant) => (
                <Box key={variant.id} w="full" mt="15px">
                  <Text fontSize="15px" fontWeight="600">
                    {variant.name}
                  </Text>
                  <Grid templateColumns="repeat(6, 1fr)" gap="2">
                    {variant.Variant_options.map((option: Variant_options) => (
                      <Button
                        key={option.id}
                        borderWidth="1px"
                        borderColor="black"
                        borderRadius="4px"
                        p="7px"
                        fontWeight="500"
                        textAlign="center"
                        bg={
                          selectedOptions.includes(option.id!)
                            ? 'black'
                            : 'white'
                        }
                        color={
                          selectedOptions.includes(option.id!)
                            ? 'white'
                            : 'black'
                        }
                        onClick={() => handleOptionSelect(option.id!)}
                      >
                        {option.name}
                      </Button>
                    ))}
                  </Grid>
                </Box>
              ))}

              <Text fontSize="15px" fontWeight="600" w="full">
                Quantity
              </Text>
              <HStack gap="5">
                <Button
                  variant={'outline'}
                  borderColor="black"
                  borderWidth="1px"
                  onClick={decreaseQty}
                >
                  -
                </Button>
                <Text fontWeight="600">{quantity}</Text>
                <Button
                  variant={'outline'}
                  borderColor="black"
                  borderWidth="1px"
                  onClick={increaseQty}
                >
                  +
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
                        <Text w="full">{product.stock}</Text>
                        <Text w="full">{product.weight} </Text>
                        <Text w="full">{product.length}</Text>
                        <Text w="full">{product.width}</Text>
                        <Text w="full">{product.height}</Text>
                        <Text w="full">{product.sku}</Text>
                      </VStack>
                    </HStack>
                  </AccordionItemContent>
                </AccordionItem>
              </AccordionRoot>

              <AccordionRoot collapsible defaultValue={['specification']}>
                <AccordionItem value="specification">
                  <AccordionItemTrigger>
                    Product Specification
                  </AccordionItemTrigger>
                  <AccordionItemContent p="3">
                    <Text>
                      {product.description || 'No description available'}
                    </Text>
                  </AccordionItemContent>
                </AccordionItem>
              </AccordionRoot>
              <HStack w="full" mt="15px" justify={'center'}>
                <Button w="50%" p="7" bgColor="#5F2EEA" onClick={handleBuyNow}>
                  Buy it Now
                </Button>
              </HStack>
            </VStack>
          </HStack>
        )}
      </Box>
    </Box>
  );
}
