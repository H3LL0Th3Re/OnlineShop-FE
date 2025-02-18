import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
  Image,
} from '@chakra-ui/react';
// import {
//   FileUploadDropzone,
//   FileUploadList,
//   FileUploadRoot,
// } from '../ui/file-upload';
import { currentStore } from '@/features/get-store';
import { Store } from '@/types/store';
import { useAuthStore } from '@/hooks/authstore';
import { useState, useEffect } from 'react';
import { updateStore } from '@/features/update-store';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function Information() {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  const [slogan, setSlogan] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [storename, setStoreName] = useState<string>('');
  const [banner_attachment, setBanner] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logo_attachment, setLogo] = useState<File | null>(null);

  const {
    data: store,
    isLoading,
    isError,
    error,
  } = useQuery<Store, Error>({
    queryKey: ['Store'],
    queryFn: () => currentStore(token || ''),
    enabled: !!token, // Only fetch if token exists
  });
  const mutation = useMutation({
    mutationFn: updateStore,
    onSuccess: (data) => {
      queryClient.setQueryData(['Store'], data.store); // Update the cache
      alert('Store Updated!');
    },
    onError: (error) => {
      console.error('Error updating Store:', error);
      alert('Error updating Store, please try again later.');
    },
  });
  useEffect(() => {
    if (store) {
      setSlogan(store.slogan || '');
      setDescription(store.description || '');
      setStoreName(store.name || '');
    }
  }, [store]);
  // useEffect(() => {
  //   const getCurrentStore = async () => {
  //     if (token) {
  //       try {
  //         const storedata = await currentStore(token);
  //         setStore(storedata);
  //         setInitialValues({
  //           name: storedata.name,
  //           description: storedata.description || '',
  //           slogan: storedata.slogan || '',
  //         });
  //         setStoreName(storedata.name);
  //         setSlogan(storedata.slogan || '');
  //         setDescription(storedata.description || '');
  //         setLogoPreview(storedata.logo_attachement);
  //       } catch (err) {
  //         console.error('Error fetching store data:', err);
  //         setErrorMessage('Failed to fetch store data');
  //         console.log(errorMessage);
  //       }
  //     } else {
  //       console.log('No token found');
  //     }
  //   };

  //   getCurrentStore();
  // }, [token, setStore, errorMessage]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Access the file input through the event's currentTarget

    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Access the file input through the event's currentTarget

    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      setBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !store) {
      console.log("You're not logged in");
      return;
    }

    const formData = new FormData();
    if (storename !== store?.name) {
      formData.append('name', storename);
    }

    // Check if the slogan has changed, and only append if it's different
    if (slogan !== store?.slogan) {
      formData.append('slogan', slogan);
    }

    // Check if the description has changed, and only append if it's different
    if (description !== store?.description) {
      formData.append('description', description);
    }

    // Check if there is a new image, and append if there is one
    if (logo_attachment) {
      formData.append('logo_attachment', logo_attachment);
    }
    if (banner_attachment) {
      formData.append('banner_attachment', banner_attachment);
    }

    mutation.mutate({ token, formData });
  };
  console.log(store);
  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>Error: {error.message}</Text>;
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
          disabled={isLoading}
          onClick={onSubmit}
        >
          Save Information
        </Button>
      </Box>

      <HStack>
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
            <Box
              width={'100px'}
              height={'100px'}
              borderRadius={'100%'}
              position="relative"
              cursor="pointer" // Makes it clear the area is clickable
              onClick={() =>
                document.getElementById('logo_attachment')?.click()
              } // Triggers file input click
              _hover={{
                opacity: 0.8, // Slightly dim the image on hover for effect
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional background color on hover
              }}
            >
              <Image
                src={
                  logoPreview ||
                  store?.logo_attachment ||
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                } // Fallback if no image
                alt="Profile"
                width="100%"
                height="100%"
                borderRadius="50%" // Ensures the image stays circular
                objectFit="cover" // Keeps the image properly cropped inside the circle
              />
              <Input
                type="file"
                id="logo_attachment"
                onChange={handleImageChange}
                display="none" // Hides the default file input
              />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="white"
                fontWeight="bold"
                fontSize="14px"
                opacity="0"
                _hover={{
                  opacity: 1, // Make text visible on hover
                }}
                transition="opacity 0.3s ease"
              >
                Upload Photo
              </Box>
            </Box>

            {error && (
              <Box mt="10px" color="red.500">
                <Text>{error}</Text>
              </Box>
            )}
            <Text textAlign="left" w="50%" fontSize="13px">
              Ukuran optimal 300 x 300 piksel dengan Besar file: Maksimum 10
              Megabytes. Ekstensi file yang diperbolehkan: JPG, JPEG, PNG
            </Text>
          </VStack>
        </Box>
        <Box mt="10px">
          <Text fontWeight="700" fontSize="17px" color="black" mb="10px">
            Store Banner
          </Text>

          <VStack w="100%" display="flex" alignItems="flex-start">
            {/* <FileUploadRoot maxW="xs" alignItems="stretch" maxFiles={1}>
            <FileUploadDropzone
              label="Upload Store Logo"
              onSelect={handleImageChange}
            />
            <FileUploadList />
          </FileUploadRoot> */}
            <Box
              width={'400px'}
              height={'350px'}
              borderRadius={'100%'}
              position="relative"
              cursor="pointer" // Makes it clear the area is clickable
              onClick={() =>
                document.getElementById('banner_attachment')?.click()
              } // Triggers file input click
              _hover={{
                opacity: 0.8, // Slightly dim the image on hover for effect
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional background color on hover
              }}
            >
              <Image
                src={
                  bannerPreview ||
                  store?.banner_attachment ||
                  'https://wallpapers.com/images/featured/blank-h9v8oske8iey8nkq.jpg'
                } // Fallback if no image
                alt="Profile"
                width="100%"
                height="100%"
                objectFit="cover" // Keeps the image properly cropped inside the circle
              />
              <Input
                type="file"
                id="banner_attachment"
                onChange={handleBannerChange}
                display="none" // Hides the default file input
              />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="white"
                fontWeight="bold"
                fontSize="14px"
                opacity="0"
                _hover={{
                  opacity: 1, // Make text visible on hover
                }}
                transition="opacity 0.3s ease"
              >
                Upload Photo
              </Box>
            </Box>

            {error && (
              <Box mt="10px" color="red.500">
                <Text>{error}</Text>
              </Box>
            )}
            <Text textAlign="left" w="50%" fontSize="13px">
              Ukuran optimal 300 x 300 piksel dengan Besar file: Maksimum 10
              Megabytes. Ekstensi file yang diperbolehkan: JPG, JPEG, PNG
            </Text>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
}
