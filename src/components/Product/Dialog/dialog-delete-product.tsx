import { Box, HStack, Icon, Strong, Text } from '@chakra-ui/react';
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
} from '../../ui/dialog';
import { MdOutlineDelete } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { useDeleteProduct } from '@/components/tanstack/useProduct';
import { useAuthStore } from '@/hooks/authstore';
import { useRef } from 'react';

interface DialogDeleteProductProps {
  productId: string;
  productName: string;
}

export function DialogDeleteProduct({
  productId,
  productName,
}: DialogDeleteProductProps) {
  const token = useAuthStore((state) => state.token);
  const { mutate: deleteProducts, isPending } = useDeleteProduct(token || '');

  const closeDialogRef = useRef<HTMLButtonElement | null>(null);

  const handleDelete = () => {
    deleteProducts(productId, {
      onSuccess: () => {
        closeDialogRef.current?.click(); // 🔥 Menutup dialog setelah sukses
      },
    });
  };
  return (
    <Box>
      <DialogRoot placement={'center'}>
        <DialogTrigger asChild>
          <HStack>
            <Icon size={'sm'} color={'black'}>
              <MdOutlineDelete />
            </Icon>
            <Text>Delete Product</Text>
          </HStack>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
          </DialogHeader>
          <DialogBody spaceY={5}>
            <Text>
              Product <Strong>{productName}</Strong> will be removed
            </Text>
            <Text>
              Removed products will not be able to Cancelled. Make sure the
              product you Select it correctly.
            </Text>
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button onClick={handleDelete} disabled={isPending}>
              {isPending ? 'Deleting ...' : 'Delete Product'}
            </Button>
          </DialogFooter>
          <DialogCloseTrigger ref={closeDialogRef} />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
