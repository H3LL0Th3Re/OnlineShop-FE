import { Box, Icon, Image, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { CloseButton } from '../ui/close-button';
import { IoImages } from 'react-icons/io5';
interface FileUploadProductProps {
  onFileSelect: (files: File[]) => void;
}

export const FileUploadProduct: React.FC<FileUploadProductProps> = ({
  onFileSelect,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      const newPreviews = selectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
      onFileSelect([...files, ...selectedFiles]);
      setInputVisible(false);
    }
  };

  const removePreview = (index: number) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedFiles = files.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
    setFiles(updatedFiles);
    onFileSelect(updatedFiles);

    if (updatedPreviews.length === 0) {
      setInputVisible(true);
    }
  };

  return (
    <Box>
      {inputVisible && (
        <label htmlFor="file-upload">
          <Box
            h="200px"
            w="200px"
            border={'dotted'}
            // borderWidth="3px"
            borderRadius="10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            borderColor="blackAlpha.600"
            bg="gray.100"
          >
            <Icon size={'xl'}>
              <IoImages />
            </Icon>
            <Input
              h="200px"
              w="200px"
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              hidden
              accept="image/*"
              multiple
            />
          </Box>
        </label>
      )}
      <Box display="flex" flexWrap="wrap">
        {previews.map((preview, index) => (
          <Box
            key={index}
            h="200px"
            w="200px"
            borderWidth="1px"
            borderRadius="10px"
            overflow="hidden"
            borderColor="gray.300"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            m={1}
          >
            <Image
              src={preview}
              alt={`Preview ${index + 1}`}
              boxSize="100%"
              objectFit="cover"
            />
            <CloseButton
              position="absolute"
              top={1}
              right={1}
              onClick={() => removePreview(index)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
