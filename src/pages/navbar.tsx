import { InputGroup } from '@/components/ui/input-group';
import { Box, Flex, Image, Input, Text } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';

export default function Navbar() {
  return (
    <Box
      m={0}
      p={3}
      bg={'white'}
      dropShadow="1px 5px 15px 1px grey"
      display="flex"
      alignItems="center"
      w="full"
      justifyContent="center"
    >
      <Flex w="full" justify="space-between" alignItems="center">
        <Box>
          <Text color="black" fontWeight="600" fontSize="17px">
            Welcome, User
          </Text>
        </Box>
        <Box>
          <InputGroup flex="1" startElement={<LuSearch />} w="full">
            <Input
              placeholder="Search contacts"
              w="500px"
              color="black"
              fontWeight="600"
            />
          </InputGroup>
        </Box>

        <Box>
          <Image
            src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04"
            rounded="full"
            boxSize="40px"
            fit="cover"
          />
        </Box>
      </Flex>
      <Box justifyContent="flex-end"></Box>
    </Box>
  );
}
