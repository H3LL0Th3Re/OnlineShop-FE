import { Box, Text } from '@chakra-ui/react';
import Lottie from 'lottie-react';
import animationShop from '@/assets/fallback.json';
export default function Fallback() {
  return (
    <Box w="100vw" h="100vh" position="relative" bg="gray.50">
      {/* Elemen Animasi */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex={1} // Mengatur z-index
      >
        <Lottie
          animationData={animationShop}
          loop={true}
          style={{ width: 250, height: 250 }}
        />
      </Box>

      {/* Elemen Teks */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-42%, 120%)" // Bergeser ke bawah sedikit
        zIndex={2}
      >
        <Text
          color="#5F2EEA"
          fontWeight="700"
          fontSize="25px"
          textAlign="center"
          px={2}
          borderRadius="md"
          mt={4} // Tambahkan margin-top untuk jarak
        >
          ERROR 404
        </Text>
        <Text
          color="black"
          fontWeight="700"
          fontSize="12px"
          textAlign="center"
          px={2}
          borderRadius="md"
          mt={4} // Tambahkan margin-top untuk jarak
          onClick={() => (window.location.href = '/landing-page')}
        >
          Back To Home
        </Text>
      </Box>
    </Box>
  );
}
