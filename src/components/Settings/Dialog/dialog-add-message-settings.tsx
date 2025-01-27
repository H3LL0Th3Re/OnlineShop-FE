import { Box, Button, HStack, Input, Text, Textarea } from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function DialogAddMessage() {
  return (
    <Box>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button
            bgColor="white"
            color="black"
            rounded="full"
            borderWidth="1px"
            borderColor="black"
            fontWeight="700"
          >
            Add Message
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Message</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text fontWeight="600" fontSize="15px" mb="7px">
              Judul Pesan*
            </Text>
            <Input mb="7px" />
            <Text fontWeight="600" fontSize="15px" mb="7px">
              Detail Isi Pesan*
            </Text>
            <HStack>
              <Button
                bgColor="white"
                color="grey"
                rounded="full"
                borderWidth="1px"
                borderColor="grey"
                fontWeight="600"
                mb="7px"
              >
                Nama Customer
              </Button>
              <Button
                bgColor="white"
                color="grey"
                rounded="full"
                borderWidth="1px"
                borderColor="grey"
                fontWeight="600"
                mb="7px"
              >
                Nama Produk
              </Button>
              <Button
                bgColor="white"
                color="grey"
                rounded="full"
                borderWidth="1px"
                borderColor="grey"
                fontWeight="600"
                mb="7px"
              >
                Nama Toko
              </Button>
            </HStack>
            <Textarea mb="7px" h="100px" />
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button bgColor="#2400FE" color="white">
              Save
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
