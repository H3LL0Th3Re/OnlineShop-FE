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
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { loginUser } from '@/features/login';

import { Link, useNavigate, Navigate } from 'react-router';
import { useAuthStore } from '@/hooks/authstore';
import Swal from 'sweetalert2';
import { PasswordInput } from '@/components/ui/password-input';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// TypeScript type inferred from Zod schema
type LoginFormData = z.infer<typeof schema>;

function Login() {
  const { setToken, token } = useAuthStore();
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);
    const response = await loginUser(data.email, data.password);

    if (response.token) {
      setToken(response.token);
      Swal.fire({
        title: 'Login Successful!',
        text: 'Welcome to Lakoe App',
        icon: 'success',
        confirmButtonText: 'Ok',
      });

      navigate('/dashboard');
    } else {
      setApiError(response.message || 'Login failed');
      console.log(apiError);
      Swal.fire({
        title: 'Login Failed!',
        text:
          response.message || 'Please check your credentials and try again.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  };
  return (
    <Box m="30px" p="0" bg="#dce0fe" borderRadius="5px">
      <HStack w="full" h="full">
        {/* <Box
          bgColor="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
          rounded="5px"
        > */}
        <HStack
          w="full"
          h="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box flex="2" h="520px">
            <Image
              src="https://res.cloudinary.com/dbavdkhmz/image/upload/v1740374902/Zero_Registration_Fees_Just_1_Transaction_Fee_Sign_Up_Now_4_pwurg5.png"
              alt="Login Animation"
              h="full"
              objectFit="cover"
              w="full"
              borderLeftRadius="5px"
            />
          </Box>
          <Box flex="1">
            <Stack
              align="center"
              width="500px"
              // borderColor="#5F2EEA"
              // borderWidth="2px"
              p="3"
              justifyContent="center"
              // borderRadius="15px"
              as="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Image
                src="https://res.cloudinary.com/dbavdkhmz/image/upload/v1740373500/Lakoe_Logo_rxtafs.png"
                alt="Logo Lakoe App"
                h="35px"
                objectFit="contain"
                mb="24px"
              />

              <Box w="80%">
                <Input
                  padding="4"
                  mb="10px"
                  rounded="50px"
                  borderWidth="1px"
                  borderColor="#E5E5E5"
                  placeholder="Email*"
                  color="#2400FE"
                  bg="white"
                  fontWeight="500"
                  {...register('email')}
                />
                {errors.email && (
                  <Text
                    color="red.500"
                    fontSize="sm"
                    mb="10px"
                    ml="10px"
                    textAlign="center"
                  >
                    {errors.email.message}
                  </Text>
                )}
                <PasswordInput
                  rounded="50px"
                  borderWidth="1px"
                  borderColor="#E5E5E5"
                  placeholder="Password"
                  color="#2400FE"
                  type="password"
                  bg="white"
                  fontWeight="500"
                  {...register('password')}
                />
              </Box>
              {errors.password && (
                <Text color="red.500" fontSize="sm">
                  {errors.password.message}
                </Text>
              )}
              <Button
                type="submit"
                width="80%"
                rounded="50px"
                bgColor="#085DCF"
                color="white"
                mt="10px"
              >
                Login
              </Button>
              <HStack>
                <Text color="#222222" fontWeight="500" fontSize="13px">
                  Already have an account?
                </Text>
                <Text color="#2400FE" fontWeight="500" fontSize="13px">
                  <Link to={'/register'}>Sign Up</Link>
                </Text>
              </HStack>

              <VStack mt="10px">
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
        {/* </Box> */}
      </HStack>
    </Box>
  );
}

export default Login;
