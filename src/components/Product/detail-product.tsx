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

export default function DetailProduct() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <Box bg="white" w="full" h="full" m="0" p="3">
      <HStack w="full" h="full" gap="6" mt="20px">
        <Box
          w="60%"
          h="full"
          position="sticky"
          top="0"
          left="0"
          overflow="auto"
        >
          <Image
            h="full"
            src="https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
          />
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
              Iphone 13 Pro Max
            </Text>
            <Text fontSize="20px" fontWeight="600" w="full" mb="15px">
              Rp 150.000.000
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
                    text produck Description
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
