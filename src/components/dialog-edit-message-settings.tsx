import {
  Box,
  Button,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';
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
import { BiMessageAltEdit } from 'react-icons/bi';


export default function DialogEditMessage() {
  return (
    <Box>
      <DialogRoot>
        <DialogTrigger asChild>
          <BiMessageAltEdit style={{ fontSize: '20px' }} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Message</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text fontWeight="600" fontSize="15px" mb="7px">
              Judul Pesan*
            </Text>
            <Input mb="7px" />
            <Text fontWeight="600" fontSize="15px" mb="7px">
              Detail Isi Pesan*
            </Text>
            <Textarea mb="7px" />
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
