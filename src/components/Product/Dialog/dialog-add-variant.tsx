import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Variant } from '@/types/product-type';
import { Box, Button, Input, Stack } from '@chakra-ui/react';
import { useState } from 'react';

interface DialogAddVariantProps {
  onAddVariant: (variant: Variant) => void; // Define the type for onAddVariant
}

function DialogAddVariant({ onAddVariant }: DialogAddVariantProps) {
  const [variantName, setVariantName] = useState('');

  const handleSubmit = () => {
    if (variantName) {
      const newVariant: Variant = {
        name: variantName,
        id: '',
        variantOptions: [],
      };
      onAddVariant(newVariant);
      setVariantName('');
    }
  };

  return (
    <Box>
      <DialogRoot placement={'center'}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            type="button"
            width="200px"
            rounded="50px"
            bgColor="#085DCF"
            color="white"
          >
            Add Variant
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Variant</DialogTitle>
          </DialogHeader>
          <DialogBody pb="4">
            <Stack gap="4">
              <Input
                placeholder="*Variant Name"
                value={variantName}
                onChange={(e) => setVariantName(e.target.value)}
              />
            </Stack>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button bgColor="#2400FE" color="white" onClick={handleSubmit}>
              Save Variant
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
    // <Box bgColor="#E5E5E5" height="100vh" w="100vw" display="flex" justifyContent="center" alignItems="center" m="0" p="0">
    //   <HStack>

    //     <Box w="90vw" h="90vh" bgColor="white" display="flex"alignItems="center" justifyContent="center" rounded="12px">
    //       <VStack>
    //       <HStack gap="50px" marginLeft="40px" marginRight="40px">
    //         <Box flex="1">

    //           <Stack align="center" width="500px" borderColor="#5F2EEA" borderWidth="2px" h="400px" justifyContent="center" borderRadius="15px" >
    //           <Text color="#5F2EEA" fontWeight="900" fontSize="25px" mb="15px">LAKOE APP</Text>
    //               <Input
    //                 width="80%"
    //                 padding="4"
    //                 rounded="50px"
    //                 borderWidth="1px"
    //                 borderColor="whiteAlpha.950"
    //                 placeholder="Email/Username*"
    //                 color="#085DCF"
    //                 gap="4"
    //               />
    //             <Input
    //                 width="80%"
    //                 padding="4"
    //                 rounded="50px"
    //                 borderWidth="1px"
    //                 borderColor="whiteAlpha.950"
    //                 placeholder="Password"
    //                 color="#085DCF"
    //                 gap="4"
    //               />

    //               <Button
    //                 type="submit"
    //                 width="80%"
    //                 rounded="50px"
    //                 bgColor="#085DCF"
    //                 color="white"
    //               >
    //                 Login
    //               </Button>
    //               <HStack>
    //                 <Text color="#222222" fontWeight="500" fontSize="13px">Don't have an account?</Text>
    //                 <Text color="#2400FE" fontWeight="500" fontSize="13px">Sign Up</Text>
    //               </HStack>

    //               <VStack mt="40px">
    //                 <Text color="#222222" fontWeight="400" fontSize="12px">Or sign in with social account</Text>
    //                 <HStack gap="20px">
    //                   <Box bgColor="#EA473C" w="100px" h="40px" borderRadius="10px" display="flex"alignItems="center" justifyContent="center">
    //                     <HStack>

    //                       <Text color="white" fontWeight="600" fontSize="12px">Google</Text>
    //                     </HStack>

    //                   </Box>
    //                   <Box bgColor="#3B5998" w="100px" h="40px" borderRadius="10px" display="flex"alignItems="center" justifyContent="center">
    //                     <HStack>

    //                       <Text color="white" fontWeight="600" fontSize="12px">Facebook</Text>
    //                     </HStack>
    //                   </Box>
    //                 </HStack>
    //               </VStack>

    //           </Stack>
    //         </Box>
    //         <Box flex="7">
    //           <Image src="https://plus.unsplash.com/premium_photo-1687203673190-d39c3719123a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2VsY29tZXxlbnwwfHwwfHx8MA%3D%3D" alt="Login Animation" h="400px" w="700px"/>
    //         </Box>
    //       </HStack>
    //       </VStack>
    //     </Box>
    //   </HStack>
    // </Box>
  );
}

export default DialogAddVariant;
