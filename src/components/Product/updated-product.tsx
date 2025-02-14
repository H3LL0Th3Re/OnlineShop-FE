// import {
//   Box,
//   Button,
//   Center,
//   Flex,
//   Group,
//   HStack,
//   Icon,
//   Input,
//   InputAddon,
//   Text,
//   Textarea,
//   VStack,
// } from '@chakra-ui/react';
// import { FileUploadProduct } from './file-upload-product';
// import { useAuthStore } from '@/hooks/authstore';
// import { useState } from 'react';
// import DialogAddVariant from './Dialog/dialog-add-variant';
// import DropdownCategory from './dropdown-category';
// import { Variant } from '@/types/product-type';
// import { FaChevronRight } from 'react-icons/fa';

// function UpdatedProduct() {
//   const { token } = useAuthStore();

//   const [formData, setFormData] = useState({
//     name: '',
//     url: '',
//     description: '',
//     categoryIds: [] as string[],
//     subcategoryIds: [] as string[],
//     minimum_order: 0,
//     price: 0,
//     stock: 0,
//     sku: '',
//     length: 0,
//     height: 0,
//     width: 0,
//     weight: 0,
//   });

//   const [attachments, setAttachments] = useState<File[]>([]);
//   const [variants, setVariants] = useState<Variant[]>([]);

//   const handleCategorySelect = (categoryId: string, subcategoryId: string) => {
//     setFormData({
//       ...formData,
//       categoryIds: [categoryId],
//       subcategoryIds: [subcategoryId],
//     });
//   };

//   const handleFileSelect = (files: File[]) => {
//     setAttachments((prev) => [...prev, ...files]);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Box>
//         <Flex>
//           <VStack align={'flex-start'} w={'100%'}>
//             <HStack>
//               <Text fontWeight="700" fontSize="15px" color="#2400FE">
//                 Products{' '}
//                 <Icon>
//                   <FaChevronRight />
//                 </Icon>
//               </Text>
//               <Text fontWeight="700" fontSize="15px" color="gray.500">
//                 Updated Product
//               </Text>
//             </HStack>
//             <VStack
//               bgColor="white"
//               w={'full'}
//               p="7"
//               gap="10px"
//               align="flex-start"
//               borderRadius="10px"
//             >
//               <Text fontWeight="700" fontSize="17px" color="#2400FE">
//                 Product Information
//               </Text>
//               <VStack gap="5px" w={'full'} align="flex-start">
//                 <Text fontWeight="600" fontSize="15px">
//                   Product Name
//                 </Text>
//                 <Input name="name" placeholder="Enter product name" />
//               </VStack>
//               <VStack gap="5px" w={'full'} align="flex-start">
//                 <Text fontWeight="600" fontSize="15px">
//                   Product URL
//                 </Text>
//                 <Input placeholder="Enter your URL" />
//               </VStack>
//               <VStack gap="5px" w={'full'} align="flex-start">
//                 <Text fontWeight="600" fontSize="15px">
//                   Category
//                 </Text>
//                 <DropdownCategory onSelectCategory={handleCategorySelect} />
//               </VStack>
//             </VStack>

//             <VStack
//               bgColor="white"
//               w={'full'}
//               p="7"
//               gap="10px"
//               mt="30px"
//               align="flex-start"
//               borderRadius="10px"
//             >
//               <Text fontWeight="700" fontSize="17px" color="#2400FE">
//                 Product Detail
//               </Text>
//               <VStack gap="5px" w="full" align="flex-start">
//                 <Text fontWeight="600" fontSize="15px">
//                   Description
//                 </Text>
//                 <Textarea
//                   placeholder="Enter description product..."
//                   size="xl"
//                   p="2"
//                   borderRadius="10px"
//                   height="200px"
//                   name="description"
//                 />
//               </VStack>
//               <Text fontWeight="600" fontSize="15px">
//                 Product URL
//               </Text>
//               <VStack gap="5px" w="full" align="center">
//                 <HStack align="center" gap="50px">
//                   {Array.from({ length: 4 }).map((_, index) => (
//                     <Center
//                       key={index}
//                       bg="bg.emphasized"
//                       h="200px"
//                       w="200px"
//                       borderWidth="3px"
//                       borderRadius="10px"
//                       style={{ borderStyle: 'dashed' }}
//                     >
//                       <FileUploadProduct onFileSelect={handleFileSelect} />
//                     </Center>
//                   ))}
//                 </HStack>
//               </VStack>
//             </VStack>

//             <VStack
//               bgColor="white"
//               w={'full'}
//               p="7"
//               gap="10px"
//               mt="30px"
//               align="flex-start"
//               borderRadius="10px"
//             >
//               <Text fontWeight="700" fontSize="17px" color="#2400FE">
//                 Product Variant
//               </Text>
//               <HStack gap="5px" w="full" align="flex-start">
//                 <Text fontWeight="600" fontSize="15px">
//                   Add variants so buyers can choose the right product, come on!{' '}
//                 </Text>
//                 <DialogAddVariant
//                   onAddVariant={(newVariant) =>
//                     setVariants((prevVariants) => [...prevVariants, newVariant])
//                   }
//                 />
//               </HStack>

//               <VStack gap="5px" w="full" align="flex-start">
//                 <HStack>
//                   <Text fontWeight="600" fontSize="15px">
//                     Variant Name
//                   </Text>
//                   <Button colorScheme="red" size="xs">
//                     Remove
//                   </Button>
//                 </HStack>
//                 <HStack>
//                   <Input placeholder="Enter option..." />
//                   <Button colorScheme="blue">Add Option</Button>
//                 </HStack>
//                 <HStack align="flex-start">
//                   <HStack spaceY={2}>
//                     <Text fontSize="14px">Variant Option Name</Text>
//                     <Button colorScheme="red" size="xs">
//                       X
//                     </Button>
//                   </HStack>
//                 </HStack>
//               </VStack>

//               <VStack spaceY={2} align="flex-start" mt={4}>
//                 <Text fontWeight="700" fontSize="17px" color="#2400FE">
//                   All Variant Options
//                 </Text>
//                 <Flex
//                   bgColor="white"
//                   w={'full'}
//                   gap="10px"
//                   borderRadius="10px"
//                   align="flex-start"
//                 >
//                   <Box borderWidth="1px" borderRadius="md" p={2}>
//                     <Text fontWeight={'bold'}>Variant name</Text>
//                   </Box>
//                 </Flex>
//               </VStack>

//               <VStack spaceY={2} align="flex-start" mt={4} w={'100%'}>
//                 <>
//                   <Text fontWeight="700" fontSize="17px" color="#2400FE">
//                     Variant Option Values
//                   </Text>
//                   <Box
//                     bg={'green.100'}
//                     borderWidth="1px"
//                     borderRadius="md"
//                     p={4}
//                   >
//                     <VStack align="flex-start">
//                       <Text fontWeight={'bold'}></Text>
//                       <HStack w={'full'} gap={5}>
//                         <Flex w={'40%'} direction={'column'}>
//                           <Text fontWeight="600" fontSize="15px">
//                             Price *
//                           </Text>
//                           <Input placeholder="Price" type="number" />
//                         </Flex>
//                         <Flex w={'40%'} direction={'column'}>
//                           <Text fontWeight="600" fontSize="15px">
//                             SKU *
//                           </Text>
//                           <Input placeholder="SKU" />
//                         </Flex>
//                       </HStack>
//                       <HStack w={'full'} gap={5}>
//                         <Flex w={'40%'} direction={'column'}>
//                           <Text fontWeight="600" fontSize="15px">
//                             Product Stock *
//                           </Text>
//                           <Input placeholder="Stock" type="number" />
//                         </Flex>
//                         <Flex w={'40%'} direction={'column'}>
//                           <Text fontWeight="600" fontSize="15px">
//                             Product Weight *
//                           </Text>
//                           <Input placeholder="Weight" type="number" />
//                         </Flex>
//                       </HStack>
//                     </VStack>
//                   </Box>
//                 </>
//               </VStack>
//             </VStack>

//             {variants.length === 0 && (
//               <>
//                 <VStack
//                   bgColor="white"
//                   w={'full'}
//                   p="7"
//                   gap="10px"
//                   mt="30px"
//                   align="flex-start"
//                   borderRadius="10px"
//                 >
//                   <Text fontWeight="700" fontSize="17px" color="#2400FE">
//                     Product Price
//                   </Text>
//                   <VStack gap="5px" w="full" align="flex-start">
//                     <Text fontWeight="600" fontSize="15px">
//                       Price
//                     </Text>
//                     <Group>
//                       <InputAddon>Rp</InputAddon>
//                       <Input
//                         name="price"
//                         borderLeftRadius="0"
//                         placeholder="Harga produk ..."
//                         type="number"
//                       />
//                     </Group>
//                   </VStack>
//                   <VStack gap="5px" w="full" align="flex-start">
//                     <Text fontWeight="600" fontSize="15px">
//                       Minimum Order
//                     </Text>
//                     <Group>
//                       <Input
//                         name="minimum_order"
//                         placeholder="Jumlah produk ..."
//                         borderRightRadius="0"
//                         type="number"
//                       />
//                       <InputAddon borderLeftRadius="0" borderRightRadius="5px">
//                         Product
//                       </InputAddon>
//                     </Group>
//                   </VStack>
//                 </VStack>

//                 <VStack
//                   bgColor="white"
//                   w={'full'}
//                   p="7"
//                   gap="10px"
//                   mt="30px"
//                   align="flex-start"
//                   borderRadius="10px"
//                 >
//                   <Text fontWeight="700" fontSize="17px" color="#2400FE">
//                     Product Management
//                   </Text>
//                   <HStack gap="10" width="full">
//                     <VStack w="full" align="flex-start">
//                       <Text fontWeight="600" fontSize="15px">
//                         Product Stock
//                       </Text>
//                       <Group flex="1">
//                         <Input name="stock" placeholder="Stock" type="number" />
//                       </Group>
//                     </VStack>
//                     <VStack w="full" align="flex-start">
//                       <Text fontWeight="600" fontSize="15px">
//                         SKU (Stock Keeping Unit)
//                       </Text>
//                       <Group flex="1">
//                         <Input name="sku" placeholder="Sku" />
//                       </Group>
//                     </VStack>
//                   </HStack>
//                 </VStack>

//                 <VStack
//                   bgColor="white"
//                   w={'full'}
//                   p="7"
//                   gap="10px"
//                   mt="30px"
//                   align="flex-start"
//                   borderRadius="10px"
//                 >
//                   <Text fontWeight="700" fontSize="17px" color="#2400FE">
//                     Weight & Dimension
//                   </Text>
//                   <VStack w="full" align="flex-start">
//                     <Text fontWeight="600" fontSize="15px">
//                       Product Weight
//                     </Text>
//                     <Group>
//                       <Input
//                         name="weight"
//                         borderLeftRadius="5px"
//                         borderRightRadius="0"
//                         type="number"
//                       />
//                       <InputAddon borderLeftRadius="0" borderRightRadius="5px">
//                         Grams
//                       </InputAddon>
//                     </Group>
//                   </VStack>
//                   <VStack w="full" align="flex-start">
//                     <Text fontWeight="600" fontSize="15px">
//                       Product Stock
//                     </Text>
//                     <HStack gap="10" width="full">
//                       <VStack w="full" align="flex-start">
//                         <Group flex="1">
//                           <Input
//                             name="length"
//                             borderLeftRadius="5px"
//                             borderRightRadius="0"
//                             placeholder="Length"
//                             type="number"
//                           />
//                           <InputAddon
//                             borderLeftRadius="0"
//                             borderRightRadius="5px"
//                           >
//                             cm
//                           </InputAddon>
//                         </Group>
//                       </VStack>
//                       <VStack w="full" align="flex-start">
//                         <Group flex="1">
//                           <Input
//                             name="width"
//                             borderLeftRadius="5px"
//                             borderRightRadius="0"
//                             placeholder="Width"
//                             type="number"
//                           />
//                           <InputAddon
//                             borderLeftRadius="0"
//                             borderRightRadius="5px"
//                           >
//                             cm
//                           </InputAddon>
//                         </Group>
//                       </VStack>
//                       <VStack w="full" align="flex-start">
//                         <Group flex="1">
//                           <Input
//                             name="height"
//                             borderLeftRadius="5px"
//                             borderRightRadius="0"
//                             placeholder="Height"
//                             type="number"
//                           />
//                           <InputAddon
//                             borderLeftRadius="0"
//                             borderRightRadius="5px"
//                           >
//                             cm
//                           </InputAddon>
//                         </Group>
//                       </VStack>
//                     </HStack>
//                   </VStack>
//                 </VStack>
//               </>
//             )}

//             <VStack
//               bgColor="white"
//               w={'full'}
//               p="7"
//               gap="10px"
//               mt="30px"
//               borderRadius="10px"
//               align="flex-end"
//             >
//               <HStack>
//                 <Button variant="outline">Cancel</Button>
//                 <Button bgColor="#2400FE" color="white" type="submit">
//                   Save Product
//                 </Button>
//               </HStack>
//             </VStack>
//           </VStack>
//         </Flex>
//       </Box>
//     </form>
//   );
// }

// export default UpdatedProduct;
