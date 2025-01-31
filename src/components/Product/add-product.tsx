import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  HStack,
  Input,
  InputAddon,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { FileUploadProduct } from './file-upload-product';

function addProduct() {
  return (
    <Box>
      <Flex>
        <VStack align={'flex-start'} w={'100%'}>
          <VStack
            bgColor="white"
            w={'full'}
            p="7"
            gap="10px"
            align="flex-start"
            borderRadius="10px"
          >
            <Text fontWeight="700" fontSize="17px" color="#2400FE">
              Product Information
            </Text>
            <VStack gap="5px" w={'full'} align="flex-start">
              <Text fontWeight="600" fontSize="15px">
                Product Name
              </Text>
              <Input placeholder="Enter product name" />
            </VStack>
            <VStack gap="5px" w={'full'} align="flex-start">
              <Text fontWeight="600" fontSize="15px">
                Product URL
              </Text>
              <Input placeholder="Enter your URL" />
            </VStack>
            <VStack gap="5px" w={'full'} align="flex-start">
              <Text fontWeight="600" fontSize="15px">
                Category
              </Text>
              <Input placeholder="Select category" />
            </VStack>
          </VStack>

          <VStack
            bgColor="white"
            w={'full'}
            p="7"
            gap="10px"
            mt="30px"
            align="flex-start"
            borderRadius="10px"
          >
            <Text fontWeight="700" fontSize="17px" color="#2400FE">
              Product Detail
            </Text>
            <VStack gap="5px" w="full" align="flex-start">
              <Text fontWeight="600" fontSize="15px">
                Description
              </Text>
              <Textarea
                placeholder="Enter description product..."
                size="xl"
                p="2"
                borderRadius="10px"
                height="200px"
              />
            </VStack>
            <Text fontWeight="600" fontSize="15px">
              Product URL
            </Text>
            <VStack gap="5px" w="full" align="center">
              <HStack align="center" gap="50px">
                <Center
                  bg="bg.emphasized"
                  h="200px"
                  w="200px"
                  borderWidth="3px"
                  borderRadius="10px"
                  style={{ borderStyle: 'dashed' }}
                >
                  <FileUploadProduct />
                </Center>
                <Center
                  bg="bg.emphasized"
                  h="200px"
                  w="200px"
                  borderWidth="3px"
                  borderRadius="10px"
                  style={{ borderStyle: 'dashed' }}
                >
                  <FileUploadProduct />
                </Center>
                <Center
                  bg="bg.emphasized"
                  h="200px"
                  w="200px"
                  borderWidth="3px"
                  borderRadius="10px"
                  style={{ borderStyle: 'dashed' }}
                >
                  <FileUploadProduct />
                </Center>
                <Center
                  bg="bg.emphasized"
                  h="200px"
                  w="200px"
                  borderWidth="3px"
                  borderRadius="10px"
                  style={{ borderStyle: 'dashed' }}
                >
                  <FileUploadProduct />
                </Center>
              </HStack>
            </VStack>
          </VStack>

          <VStack
            bgColor="white"
            w={'full'}
            p="7"
            gap="10px"
            mt="30px"
            align="flex-start"
            borderRadius="10px"
          >
            <Text fontWeight="700" fontSize="17px" color="#2400FE">
              Product Variant
            </Text>
            <HStack gap="5px" w="full" align="flex-start">
              <Text fontWeight="600" fontSize="15px">
                Add variants so buyers can choose the right product, come on!{' '}
              </Text>
              {/* <DialogAddVariant/> */}
            </HStack>
          </VStack>

          <VStack
            bgColor="white"
            w={'full'}
            p="7"
            gap="10px"
            mt="30px"
            align="flex-start"
            borderRadius="10px"
          >
            <Text fontWeight="700" fontSize="17px" color="#2400FE">
              Product Price
            </Text>
            <VStack gap="5px" w="full" align="flex-start">
              <Text fontWeight="600" fontSize="15px">
                Price
              </Text>
              <Group>
                <InputAddon>Rp</InputAddon>
                <Input borderLeftRadius="0" placeholder="Harga produk ..." />
              </Group>
            </VStack>
            <VStack gap="5px" w="full" align="flex-start">
              <Text fontWeight="600" fontSize="15px">
                Minimum Order
              </Text>
              <Group>
                <Input placeholder="Jumlah produk ..." borderRightRadius="0" />
                <InputAddon borderLeftRadius="0" borderRightRadius="5px">
                  Product
                </InputAddon>
              </Group>
            </VStack>
          </VStack>

          <VStack
            bgColor="white"
            w={'full'}
            p="7"
            gap="10px"
            mt="30px"
            align="flex-start"
            borderRadius="10px"
          >
            <Text fontWeight="700" fontSize="17px" color="#2400FE">
              Product Management
            </Text>
            <HStack gap="10" width="full">
              <VStack w="full" align="flex-start">
                <Text fontWeight="600" fontSize="15px">
                  Product Stock
                </Text>
                <Group flex="1">
                  <Input placeholder="Username" />
                </Group>
              </VStack>
              <VStack w="full" align="flex-start">
                <Text fontWeight="600" fontSize="15px">
                  SKU (Stock Keeping Unit)
                </Text>
                <Group flex="1">
                  <Input placeholder="Username" />
                </Group>
              </VStack>
            </HStack>
          </VStack>

          <VStack
            bgColor="white"
            w={'full'}
            p="7"
            gap="10px"
            mt="30px"
            align="flex-start"
            borderRadius="10px"
          >
            <Text fontWeight="700" fontSize="17px" color="#2400FE">
              Weight & Dimension
            </Text>
            <VStack w="full" align="flex-start">
              <Text fontWeight="600" fontSize="15px">
                Product Weight
              </Text>
              <Group>
                <Input borderLeftRadius="5px" borderRightRadius="0" />
                <InputAddon borderLeftRadius="0" borderRightRadius="5px">
                  Grams
                </InputAddon>
              </Group>
            </VStack>
            <VStack w="full" align="flex-start">
              <Text fontWeight="600" fontSize="15px">
                Product Stock
              </Text>
              <HStack gap="10" width="full">
                <VStack w="full" align="flex-start">
                  <Group flex="1">
                    <Input
                      borderLeftRadius="5px"
                      borderRightRadius="0"
                      placeholder="Length"
                    />
                    <InputAddon borderLeftRadius="0" borderRightRadius="5px">
                      cm
                    </InputAddon>
                  </Group>
                </VStack>
                <VStack w="full" align="flex-start">
                  <Group flex="1">
                    <Input
                      borderLeftRadius="5px"
                      borderRightRadius="0"
                      placeholder="Width"
                    />
                    <InputAddon borderLeftRadius="0" borderRightRadius="5px">
                      cm
                    </InputAddon>
                  </Group>
                </VStack>
                <VStack w="full" align="flex-start">
                  <Group flex="1">
                    <Input
                      borderLeftRadius="5px"
                      borderRightRadius="0"
                      placeholder="Height"
                    />
                    <InputAddon borderLeftRadius="0" borderRightRadius="5px">
                      cm
                    </InputAddon>
                  </Group>
                </VStack>
              </HStack>
            </VStack>
          </VStack>

          <VStack
            bgColor="white"
            w={'full'}
            p="7"
            gap="10px"
            mt="30px"
            borderRadius="10px"
            align="flex-end"
          >
            <HStack>
              <Button variant="outline">Cancel</Button>
              <Button bgColor="#2400FE" color="white">
                Save Product
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </Flex>
    </Box>
  );
}

export default addProduct;
