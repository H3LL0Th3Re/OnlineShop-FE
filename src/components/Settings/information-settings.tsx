import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from '../ui/file-upload';

export default function Information() {
  return (
    <Box>
      <Box>
        <Text fontWeight="700" fontSize="17px" color="black">
          Store Information
        </Text>
        <HStack h="full">
          <VStack w="50%">
            <Text textAlign="left" w="full">
              Slogan
            </Text>
            <Input placeholder="Craete slogan for your store" />
            <Text textAlign="left" w="full">
              Store Name
            </Text>
            <Input placeholder="Craete name for your store" />
          </VStack>
          <VStack w="50%" display="flex" alignItems="flex-start" h="155px">
            <Text textAlign="left" w="full">
              Description
            </Text>
            <Textarea
              placeholder="Write your store's description here"
              h="100%"
            />
          </VStack>
        </HStack>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        mt="10px"
        borderBottomWidth="1px"
      >
        <Button bgColor="#2400FE" color="white" rounded="full" mb="10px">
          Save Information
        </Button>
      </Box>

      <Box mt="10px">
        <Text fontWeight="700" fontSize="17px" color="black" mb="10px">
          Store Logo
        </Text>

        <VStack w="100%" display="flex" alignItems="flex-start">
          <FileUploadRoot maxW="xs" alignItems="stretch" maxFiles={10}>
            <FileUploadDropzone label="Upload Store Logo" />
            <FileUploadList />
          </FileUploadRoot>
          <Text textAlign="left" w="50%" fontSize="13px">
            Ukuran optimal 300 x 300 piksel dengan Besar file: Maksimum 10
            Megabytes. Ekstensi file yang diperbolehkan: JPG, JPEG, PNG
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
