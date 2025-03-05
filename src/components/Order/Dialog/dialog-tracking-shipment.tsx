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
} from '../../ui/timeline';
import { LuPackage } from 'react-icons/lu';
import { detailOrder } from '@/types/detailOrder';

interface TrackingShipmentProps {
  order: detailOrder | undefined;
}

export function TrackingShipment({ order }: TrackingShipmentProps) {
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
                <Text fontWeight={'medium'}>{order?.courier.company}</Text>
              </Box>
              <Box>
                <Text>No. Resi</Text>
                <Text fontWeight={'medium'}>{order?.courier.waybill_id}</Text>
              </Box>
              <Box>
                <Text>Pengirim</Text>
                <Text fontWeight={'medium'}>{order?.origin.contact_name}</Text>
              </Box>
            </Box>
            <Box>
              <Box>
                <Text>Penerima</Text>
                <Text fontWeight={'medium'}>
                  {order?.destination.contact_name}
                </Text>
                <Flex>
                  <Text>{order?.destination.address}</Text>
                </Flex>
              </Box>
            </Box>
          </Flex>
          <Flex gap={2} pt={2}>
            <Text>Status:</Text>
            <Text fontWeight={'medium'}>{order?.status}</Text>
          </Flex>
          <Box borderWidth={'1px'} p={2} rounded={'md'}>
            <TimelineRoot maxW="400px">
              {order?.courier.history.map((history, index) => (
                <TimelineItem key={index}>
                  <TimelineConnector>
                    <LuPackage />
                  </TimelineConnector>
                  <TimelineContent>
                    <TimelineTitle>{history.status}</TimelineTitle>
                    <TimelineDescription>
                      {history.updated_at}
                    </TimelineDescription>
                  </TimelineContent>
                </TimelineItem>
              ))}
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
