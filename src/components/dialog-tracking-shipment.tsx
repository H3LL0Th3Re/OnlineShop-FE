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
import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from './ui/timeline';
import { LuCheck, LuPackage, LuShip } from 'react-icons/lu';

export function TrackingShipment() {
  const [open, setOpen] = useState(false);
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>
        <Button variant="outline" color={'blue.600'}>
          Lacak Pengiriman
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle color={'blue.600'}>Lacak Pengiriman</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Flex justify={'space-between'}>
            <Box spaceY={3}>
              <Box>
                <Text>Kurir</Text>
                <Text fontWeight={'medium'}>J&T-Regular</Text>
              </Box>
              <Box>
                <Text>No. Resi</Text>
                <Text fontWeight={'medium'}>JT6268865922</Text>
              </Box>
              <Box>
                <Text>Pengirim</Text>
                <Text fontWeight={'medium'}>Bakulan Store</Text>
              </Box>
            </Box>
            <Box>
              <Box>
                <Text>Penerima</Text>
                <Text fontWeight={'medium'}>Bambang Pamungkas</Text>
                <Flex>
                  <Text>Jl. Ki Hajar Dewantoro,</Text>
                  <Text>Kec. Ciputat</Text>
                </Flex>
                <Text>Kota Tangerang Selatan</Text>
              </Box>
            </Box>
          </Flex>
          <Flex gap={2} pt={2}>
            <Text>Status:</Text>
            <Text fontWeight={'medium'}>Dalam Proses Pengiriman</Text>
          </Flex>
          <Box borderWidth={'1px'} p={2} rounded={'md'}>
            <TimelineRoot maxW="400px">
              <TimelineItem>
                <TimelineConnector>
                  <LuShip />
                </TimelineConnector>
                <TimelineContent>
                  <TimelineTitle>Product Shipped</TimelineTitle>
                  <TimelineDescription>13th May 2021</TimelineDescription>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineConnector>
                  <LuCheck />
                </TimelineConnector>
                <TimelineContent>
                  <TimelineTitle textStyle="sm">Order Confirmed</TimelineTitle>
                  <TimelineDescription>18th May 2021</TimelineDescription>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineConnector>
                  <LuPackage />
                </TimelineConnector>
                <TimelineContent>
                  <TimelineTitle textStyle="sm">Order Delivered</TimelineTitle>
                  <TimelineDescription>
                    20th May 2021, 10:30am
                  </TimelineDescription>
                </TimelineContent>
              </TimelineItem>
            </TimelineRoot>
          </Box>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
