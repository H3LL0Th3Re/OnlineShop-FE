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
import { Button, Text } from '@chakra-ui/react';
import { MdOutlineDelete } from 'react-icons/md';

export default function DialogDeleteLocation() {
    return (
        <DialogRoot>
      <DialogTrigger asChild>
       <MdOutlineDelete style={{ fontSize: '20px' }} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Address</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text fontWeight="400" fontSize="15px">
          Apakah kamu yakin untuk menghapus Rumah?
          Kamu tidak akan dapat mengembalikan alamat yang sudah dihapus.
          </Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button 
            bgColor="#2400FE" color="white"
            >Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
    )
}