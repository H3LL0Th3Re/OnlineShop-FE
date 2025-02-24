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
import { Link, useNavigate, Navigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUser } from '@/features/register';
import { useState } from 'react';
import { useAuthStore } from '@/hooks/authstore';
import Swal from 'sweetalert2';
import { PasswordInput } from '@/components/ui/password-input';

const schema = z.object({
  fullname: z.string().min(1, 'Fullname is required'),
  email: z.string().email('Invalid email address'),
  phone_number: z.string().min(6, 'Phone number is required '),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormData = z.infer<typeof schema>;
function Registration() {
  const { token } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  if (token) {
    return <Navigate to="/" replace />;
  }
  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const result = await registerUser(
        data.fullname,
        data.email,
        data.phone_number,
        data.password
      );

      if (result.user) {
        Swal.fire({
          title: 'Registration Successful!',
          text: 'Your account has been created. You can now log in.',
          icon: 'success',
          confirmButtonText: 'Go to Login',
        }).then(() => {
          navigate('/login');
        });
      } else {
        console.log(errorMessage);
        Swal.fire({
          title: '',
          text: result.message || 'An error occurred. Please try again.',
          icon: 'error',
          confirmButtonText: 'Retry',
        });
      }
    } catch (err) {
      setErrorMessage('An error occurred while registering.');
      console.error(err);
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
              //  src="https://res.cloudinary.com/dbavdkhmz/image/upload/v1740374902/Zero_Registration_Fees_Just_1_Transaction_Fee_Sign_Up_Now_4_pwurg5.png"

              src="https://res.cloudinary.com/dbavdkhmz/image/upload/v1740374429/Zero_Registration_Fees_Just_1_Transaction_Fee_Sign_Up_Now_3_ywf6ql.png"
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
                  color="#2400FE"
                  bg="white"
                  fontWeight="500"
                  placeholder="Full Name*"
                  {...register('fullname')}
                />
                {errors.fullname && (
                  <Text color="red.500" fontSize="sm">
                    {errors.fullname.message}
                  </Text>
                )}
                <Input
                  padding="4"
                  mb="10px"
                  rounded="50px"
                  placeholder="Email*"
                  borderWidth="1px"
                  borderColor="#E5E5E5"
                  color="#2400FE"
                  bg="white"
                  fontWeight="500"
                  {...register('email')}
                />
                {errors.email && (
                  <Text color="red.500" fontSize="sm">
                    {errors.email.message}
                  </Text>
                )}
                <Input
                  padding="4"
                  mb="10px"
                  rounded="50px"
                  placeholder="Phone Number*"
                  type="number"
                  borderWidth="1px"
                  borderColor="#E5E5E5"
                  color="#2400FE"
                  bg="white"
                  fontWeight="500"
                  {...register('phone_number')}
                />
                {errors.fullname && (
                  <Text color="red.500" fontSize="sm">
                    {errors.fullname.message}
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

                {errors.password && (
                  <Text color="red.500" fontSize="sm">
                    {errors.password.message}
                  </Text>
                )}
              </Box>
              <Button
                type="submit"
                width="80%"
                rounded="50px"
                bgColor="#085DCF"
                color="white"
                mt="10px"
              >
                Sign Up
              </Button>
              <HStack>
                <Text color="#222222" fontWeight="500" fontSize="13px">
                  Already have an account?
                </Text>
                <Text color="#2400FE" fontWeight="500" fontSize="13px">
                  <Link to={'/login'}>Sign In</Link>
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

export default Registration;
