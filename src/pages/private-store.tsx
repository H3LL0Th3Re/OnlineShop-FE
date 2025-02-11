// import { Button } from '@/components/ui/button';
// import { Box, Flex, Grid, Image, Text, VStack } from '@chakra-ui/react';
// import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
// import { Link } from 'react-router';

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

// export default function PrivateStore() {
//   function scrollHorizontally(direction: 'left' | 'right') {
//     const container = document.getElementById('scrollable-container');
//     const scrollAmount = direction === 'left' ? -300 : 300;
//     container?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//   }

//   return (
    // <Box>
    //   <Box
    //     bg="gray.100"
    //     w="full"
    //     h="60px"
    //     position="sticky"
    //     top="0"
    //     zIndex="1"
    //     overflow="auto"
    //     p="3"
    //   >
    //     <Flex w="full" justify="space-between" alignItems="center" h="full">
    //       <Text color="#5F2EEA" fontWeight="900" fontSize="25px" mb="0">
    //         LAKOE APP
    //       </Text>
    //     </Flex>
    //   </Box>
//       <Box w="full" p="3" bg="">
//         <Box w="full" h="full" mb="15px">
//           <Image
//             w="full"
//             h="300px"
//             borderRadius="5px"
//             src="https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
//           ></Image>
//         </Box>
//         <Box
//           w="full"
//           h="150px"
//           display="flex"
//           flexDirection="column"
//           justifyContent="center"
//           alignItems="center"
//         >
//           <Text fontSize="30px" fontWeight="700" mb="10px" color="red">
//             H&M Indonesia
//           </Text>
//           <Text fontSize="20px" fontWeight="500" fontStyle="italic">
//             "YOUR PATRIOTISM NEVER LOOKED THIS GOOD"
//           </Text>
//         </Box>
//         <Box position="relative" w="full" h="full" p="3">
//           <Button
//             position="absolute"
//             top="50%"
//             left="0"
//             transform="translateY(-50%)"
//             zIndex="10"
//             bg="#5F2EEA"
//             onClick={() => scrollHorizontally('left')}
//           >
//             <ChevronLeftIcon style={{ fontSize: '12px' }} />
//           </Button>

//           <Box
//             id="scrollable-container"
//             w="full"
//             h="full"
//             overflowX="auto"
//             display="flex"
//             scrollbar="visible"
//           >
//             <Grid
//               templateColumns={`repeat(${recommendations.length}, 220px)`}
//               gap="3"
//               gapY="1"
//               w="max-content"
//               bg="gray.100"
//               p="4"
//             >
//               {recommendations.map((recommendation, index) => (
//                 <Box
//                   bgColor="White"
//                   borderRadius="5px"
//                   w="100%"
//                   h="250px"
//                   borderWidth="1px"
//                   borderColor="gray.200"
//                 >
//                   <Link to={'/detail-product'}>
//                     <VStack display="flex" alignItems="center" h="full">
//                       <Image
//                         src={recommendation.image}
//                         borderTopRadius="5px"
//                         w="full"
//                         h="70%"
//                         objectFit="cover"
//                         alt={`User uploaded image ${index + 1}`}
//                       />
//                       <Text fontWeight="600" textAlign="center">
//                         {recommendation.name}
//                       </Text>
//                       <Text fontWeight="400" textAlign="center" fontSize="15px">
//                         {recommendation.price}
//                       </Text>
//                     </VStack>
//                   </Link>
//                 </Box>
//               ))}
//             </Grid>
//           </Box>
//           <Button
//             position="absolute"
//             top="50%"
//             right="0"
//             transform="translateY(-50%)"
//             zIndex="10"
//             bg="#5F2EEA"
//             onClick={() => scrollHorizontally('right')}
//           >
//             <ChevronRightIcon style={{ fontSize: '12px' }} />
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// }
