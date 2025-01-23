'use client';

import { Button } from '@/components/ui/button';
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
import {
  Group,
  Input,
  InputAddon,
  Stack,
  Strong,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Field } from './ui/field';

export function DialogUpdatePrice() {
  const [open, setOpen] = useState(false);
  return (
    <DialogRoot
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size={'xs'}
    >
      <DialogTrigger asChild>
        <Button size="xs" rounded={'full'} bg="blue.600">
          Ubah Harga
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle color={'blue.600'} fontWeight={'medium'}>
            Update Price
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap="4">
            <Field>
              <Text>
                Ubah harga untuk produk <Strong>[nama produk]</Strong>
              </Text>
              <Group attached w={'full'}>
                <InputAddon>Rp</InputAddon>
                <Input borderLeftRadius="0" placeholder="55.000" />
              </Group>
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button bg={'blue.600'}>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
