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
  Box,
  Flex,
  Group,
  Input,
  InputAddon,
  Stack,
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
      size={'lg'}
    >
      <DialogTrigger asChild>
        <Text>Update Product</Text>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle color={'blue.600'} fontWeight={'medium'}>
            Update Product
          </DialogTitle>
        </DialogHeader>
        <DialogBody spaceY={5}>
          <Box spaceY={2}>
            <Text fontWeight={'bold'}>Navy - M</Text>
            <Flex gap={4}>
              <Stack gap="4" w={'50%'}>
                <Field>
                  <Text>Price</Text>
                  <Group attached w={'full'}>
                    <InputAddon>Rp</InputAddon>
                    <Input borderLeftRadius="0" placeholder="55.000" />
                  </Group>
                </Field>
              </Stack>
              <Stack gap="4" w={'50%'}>
                <Field>
                  <Text>Stock</Text>
                  <Group attached w={'full'}>
                    <InputAddon>Qty</InputAddon>
                    <Input borderLeftRadius="0" placeholder="20" />
                  </Group>
                </Field>
              </Stack>
            </Flex>
          </Box>
          <Box spaceY={2}>
            <Text fontWeight={'bold'}>Navy - L</Text>
            <Flex gap={4}>
              <Stack gap="4" w={'50%'}>
                <Field>
                  <Text>Price</Text>
                  <Group attached w={'full'}>
                    <InputAddon>Rp</InputAddon>
                    <Input borderLeftRadius="0" placeholder="55.000" />
                  </Group>
                </Field>
              </Stack>
              <Stack gap="4" w={'50%'}>
                <Field>
                  <Text>Stock</Text>
                  <Group attached w={'full'}>
                    <InputAddon>Qty</InputAddon>
                    <Input borderLeftRadius="0" placeholder="20" />
                  </Group>
                </Field>
              </Stack>
            </Flex>
          </Box>
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
