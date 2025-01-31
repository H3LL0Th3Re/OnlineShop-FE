import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
// import {
//   FileUploadDropzone,
//   FileUploadList,
//   FileUploadRoot,
// } from '../ui/file-upload';
import { currentStore } from '@/features/get-store';
import { useStoreState, useAuthStore } from '@/hooks/authstore';
import { useEffect, useState } from 'react';
import { updateStore } from '@/features/update-store';
interface InitialValues {
  name: string;
  description: string;
  slogan: string;
}
export default function Information() {
  const { token } = useAuthStore();
  const { store, setStore } = useStoreState();
  const [slogan, setSlogan] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [storename, setStoreName] = useState<string>('');
  const [initialValues, setInitialValues] = useState<InitialValues | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logo_attachment, setLogo] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCurrentStore = async () => {
      if (token) {
        try {
          const storedata = await currentStore(token);
          setStore(storedata);
          setInitialValues({
            name: storedata.name,
            description: storedata.description || '',
            slogan: storedata.slogan || '',
          });
          setStoreName(storedata.name);
          setSlogan(storedata.slogan || '');
          setDescription(storedata.description || '');
          setLogoPreview(storedata.logo_attachement);
        } catch (err) {
          console.error('Error fetching store data:', err);
          setErrorMessage('Failed to fetch store data');
          console.log(errorMessage);
        }
      } else {
        console.log('No token found');
      }
    };

    getCurrentStore();
  }, [token, setStore, errorMessage]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Access the file input through the event's currentTarget

    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !store) {
      console.log("You're not logged in");
      return;
    }

    const formData = new FormData();
    if (storename !== initialValues?.name) {
      formData.append('name', storename);
    }

    // Check if the slogan has changed, and only append if it's different
    if (slogan !== initialValues?.slogan) {
      formData.append('slogan', slogan);
    }

    // Check if the description has changed, and only append if it's different
    if (description !== initialValues?.description) {
      formData.append('description', description);
    }

    // Check if there is a new image, and append if there is one
    if (logo_attachment) {
      formData.append('logo_attachment', logo_attachment);
    }

    // // If no changes were detected, do not send the form data
    // if (formData.entries().next().done) {
    //   console.log('No changes to update');
    //   return;
    // }

    setLoading(true);
    try {
      await updateStore(token, formData);
      const response = await currentStore(token);
      setStore(response);
      console.log('Store updated successfully:', response);
      alert('Store Updated!');
    } catch (error) {
      console.error('Error updating Store:', error);
      setErrorMessage('Error updating Store, please try again later.');
    } finally {
      setLoading(false);
    }
  };
  console.log(store);
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
            <Input
              value={slogan || ''}
              onChange={(e) => setSlogan(e.target.value)}
              placeholder="Create slogan for your store"
            />
            <Text textAlign="left" w="full">
              Store Name
            </Text>
            <Input
              value={storename}
              required
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="Create name for your store"
            />
          </VStack>
          <VStack w="50%" display="flex" alignItems="flex-start" h="155px">
            <Text textAlign="left" w="full">
              Description
            </Text>
            <Textarea
              h="100%"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write your store's description here"
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
        <Button
          bgColor="#2400FE"
          color="white"
          rounded="full"
          mb="10px"
          type="submit"
          disabled={loading}
          onClick={onSubmit}
        >
          Save Information
        </Button>
      </Box>

      <Box mt="10px">
        <Text fontWeight="700" fontSize="17px" color="black" mb="10px">
          Store Logo
        </Text>

        <VStack w="100%" display="flex" alignItems="flex-start">
          {/* <FileUploadRoot maxW="xs" alignItems="stretch" maxFiles={1}>
            <FileUploadDropzone
              label="Upload Store Logo"
              onSelect={handleImageChange}
            />
            <FileUploadList />
          </FileUploadRoot> */}
          <input
            type="file"
            id="logo_attachment"
            onChange={handleImageChange}
          />
          {logoPreview && (
            <Box mt="10px">
              <Text fontWeight="700" fontSize="17px" color="black" mb="10px">
                Logo Preview
              </Text>
              <img src={logoPreview} alt="Logo Preview" width="150" />
            </Box>
          )}

          {errorMessage && (
            <Box mt="10px" color="red.500">
              <Text>{errorMessage}</Text>
            </Box>
          )}
          <Text textAlign="left" w="50%" fontSize="13px">
            Ukuran optimal 300 x 300 piksel dengan Besar file: Maksimum 10
            Megabytes. Ekstensi file yang diperbolehkan: JPG, JPEG, PNG
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}
