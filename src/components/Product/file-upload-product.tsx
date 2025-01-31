import { VStack } from '@chakra-ui/react';
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from '../ui/file-upload';
import { Button } from '../ui/button';
import { HiUpload } from 'react-icons/hi';

export function FileUploadProduct() {
  return (
    <VStack>
      <FileUploadRoot directory>
        <FileUploadTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            h="200px"
            w="200px"
            borderWidth="3px"
            borderRadius="10px"
          >
            <HiUpload /> Upload Image
          </Button>
        </FileUploadTrigger>
        <FileUploadList />
      </FileUploadRoot>
    </VStack>
  );
}
