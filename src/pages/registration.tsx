import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa6';

function Registration() {
  return (
    <Box
      bgColor="#E5E5E5"
      height="100vh"
      w="100vw"
      display="flex"
      justifyContent="center"
      alignItems="center"
      m="0"
      p="0"
    >
      <HStack>
        <Box
          w="90vw"
          h="90vh"
          bgColor="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          rounded="12px"
        >
          <VStack>
            <HStack gap="50px" marginLeft="40px" marginRight="40px">
              <Box flex="2">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1687203673190-d39c3719123a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2VsY29tZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Login Animation"
                  h="400px"
                  w="700px"
                />
              </Box>
              <Box flex="1">
                <Stack
                  align="center"
                  width="500px"
                  borderColor="#5F2EEA"
                  borderWidth="2px"
                  h="400px"
                  justifyContent="center"
                  borderRadius="15px"
                >
                  <Text
                    color="#5F2EEA"
                    fontWeight="900"
                    fontSize="25px"
                    mb="15px"
                  >
                    LAKOE APP
                  </Text>
                  <Input
                    width="80%"
                    padding="4"
                    rounded="50px"
                    borderWidth="1px"
                    borderColor="whiteAlpha.950"
                    placeholder="Username*"
                    color="#085DCF"
                    gap="4"
                  />
                  <Input
                    width="80%"
                    padding="4"
                    rounded="50px"
                    borderWidth="1px"
                    borderColor="whiteAlpha.950"
                    placeholder="Email*"
                    color="#085DCF"
                    gap="4"
                  />
                  <Input
                    width="80%"
                    padding="4"
                    rounded="50px"
                    borderWidth="1px"
                    borderColor="whiteAlpha.950"
                    placeholder="Password*"
                    color="#085DCF"
                    gap="4"
                  />

                  <Button
                    type="submit"
                    width="80%"
                    rounded="50px"
                    bgColor="#085DCF"
                    color="white"
                  >
                    Sign Up
                  </Button>
                  <HStack>
                    <Text color="#222222" fontWeight="500" fontSize="13px">
                      Already have an account?
                    </Text>
                    <Text color="#2400FE" fontWeight="500" fontSize="13px">
                      Sign In
                    </Text>
                  </HStack>

                  <VStack mt="40px">
                    <Text color="#222222" fontWeight="400" fontSize="12px">
                      Or sign up with social account
                    </Text>
                    <HStack gap="20px">
                      <Box
                        bgColor="#EA473C"
                        w="100px"
                        h="40px"
                        borderRadius="10px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <HStack>
                          <FaGoogle color="white" />
                          <Text color="white" fontWeight="600" fontSize="12px">
                            Google
                          </Text>
                        </HStack>
                      </Box>
                      <Box
                        bgColor="#3B5998"
                        w="100px"
                        h="40px"
                        borderRadius="10px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <HStack>
                          <FaFacebookF color="white" />
                          <Text color="white" fontWeight="600" fontSize="12px">
                            Facebook
                          </Text>
                        </HStack>
                      </Box>
                    </HStack>
                  </VStack>
                </Stack>
              </Box>
            </HStack>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
}

export default Registration;
