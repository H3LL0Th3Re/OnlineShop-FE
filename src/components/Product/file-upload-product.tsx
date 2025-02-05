import { Box, Icon, Image, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { FaRegFileImage } from 'react-icons/fa';

interface FileUploadProductProps {
  onFileSelect: (file: File | null) => void;
}

export const FileUploadProduct: React.FC<FileUploadProductProps> = ({
  onFileSelect,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileSelect(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  return (
    <Box>
      {/* Button untuk membuka input file */}
      <label htmlFor="file-upload">
        {/* Hidden file input */}
        <Box
          h="200px"
          w="200px"
          borderWidth="3px"
          borderRadius="10px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
        >
          <Icon size={'xl'}>
            <FaRegFileImage />
          </Icon>
          <Input
            h="200px"
            w="200px"
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            hidden
            accept="image/*"
          />
          {preview && (
            <Image
              src={preview}
              alt="Preview"
              boxSize="200px"
              objectFit="cover"
              borderRadius="10px"
              mb={2}
            />
          )}
        </Box>
      </label>
    </Box>
  );
};
