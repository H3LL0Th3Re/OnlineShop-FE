import { Box, Grid, Image, Text, VStack } from '@chakra-ui/react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const backroundImages = [
  "https://res.cloudinary.com/dbavdkhmz/image/upload/v1737548208/1_scleah.png",
  "https://res.cloudinary.com/dbavdkhmz/image/upload/v1737548320/2_b4vc5m.png",
  "https://res.cloudinary.com/dbavdkhmz/image/upload/v1737548327/3_xydogw.png",
];

const categories = [{
      name:"Electronics",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
    },
    {
      name:"Computer & Accessories",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
    },
    {
      name:"Handphone & Accessories",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
    },
    {
      name:"Man Clothes",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
    },
    {
      name:"Man Shoes",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
    },
    {
      name:"Man Bags",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
    },
    {
      name:"Fashion Accesories",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
    },
    {
      name:"Watches",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
    },
    {
      name:"Health & Medicine",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
    },
    {
      name:"Hobby & Collections",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
    },
    {
      name:"Food & Drinks",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
    },
    {
      name:"Care & Beauty",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
    },
    {
      name:"Home Utensils",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg"
    }
  ];

  const recommendations =[
    {
      name:"Woman Clothes",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg",
      price:"Rp 950.000"
    },
    {
      name:"Woman Clothes",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg",
      price:"Rp 950.000"
    },
    {
      name:"Woman Clothes",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg",
      price:"Rp 950.000"
    },
    {
      name:"Woman Clothes",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg",
      price:"Rp 950.000"
    },
    {
      name:"Woman Clothes",
      image:"https://res.cloudinary.com/demo/image/upload/v1652345767/docs/demo_image2.jpg",
      price:"Rp 950.000"
    }
  ]



export function Dashboard() {

  return (
    <Box m="0" h="full" w="full" p="3">
      <Box bgColor="white" p="3">
      <VStack>
        <Box display="flex" justifyContent="flex-start" alignItems="center" w="full">
          <Text fontWeight="700" fontSize="2xl" color="#2400FE" >
            Dashboard
          </Text>
        </Box>
        <Carousel useKeyboardArrows={true} showThumbs={false}  showStatus={false}>
          {backroundImages.map((URL, index) => (
            <div className="slide">
              <img alt="sample_file" src={URL} key={index} width={"60%"}/>
            </div>
          ))}
        </Carousel>
      </VStack>
      </Box>
          
      <VStack my="5" h="full" w="full" p="3" bgColor="white">
        <Text fontWeight="600" fontSize="20px" display="flex" justifyContent="flex-start" alignItems="center" w="full" >
          Product Categories
        </Text>
        <Box w="90%" mt="10px">
          <Grid templateColumns="repeat(5, 1fr)" gap="1" gapY="5" mb="15px">
            {categories.map((category, index) => (
              <Box bgColor="White" borderRadius="5px" w="90%" h="180px" boxShadow="2px 2px 5px 1px grey">
                <VStack m="15px" display="flex" justifyContent="center" alignItems="center">
                  <Image
                    src={category.image}
                    borderRadius="5px"
                    w="full"
                    h="100px"
                    objectFit="cover"
                    alt={`User uploaded image ${index + 1}`}
                  />
                  <Text fontWeight="600" textAlign="center">{category.name}</Text>
                </VStack>
              </Box>
            ))}
          </Grid>
        </Box>
      </VStack>

      <VStack my="5" h="full" w="full" p="3" bgColor="white">
        <Text fontWeight="600" fontSize="20px" display="flex" justifyContent="flex-start" alignItems="center" w="full" >
          Recommendations
        </Text>
        <Box w="90%" mt="10px">
          <Grid templateColumns="repeat(4, 1fr)" gap="1" gapY="5" mb="15px">
            {recommendations.map((recommendation, index) => (
              <Box bgColor="White" borderRadius="5px" w="90%" h="250px" boxShadow="2px 2px 5px 1px grey">
                <VStack display="flex" justifyContent="center" alignItems="center">
                  <Image
                    src={recommendation.image}
                    borderTopRadius="5px"
                    w="full"
                    h="170px"
                    objectFit="cover"
                    alt={`User uploaded image ${index + 1}`}
                  />
                  <Text fontWeight="600" textAlign="center">{recommendation.name}</Text>
                  <Text fontWeight="400" textAlign="center" fontSize="15px">{recommendation.price}</Text>
                </VStack>
              </Box>
            ))}
          </Grid>
        </Box>
      </VStack>
      
    </Box>
  );
}