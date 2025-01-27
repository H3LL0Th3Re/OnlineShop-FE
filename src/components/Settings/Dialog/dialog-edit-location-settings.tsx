import {
  Box,
  Button,
  createListCollection,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
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
import { MdEditLocationAlt } from 'react-icons/md';

const daftarKecamatan = createListCollection({
  items: [
    { label: 'Periuk', value: 'Periuk' },
    { label: 'karawaci', value: 'karawaci' },
    { label: 'padalarang', value: 'padalarang' },
    { label: 'sawangan', value: 'sawangan' },
  ],
});

const daftarKodePos = createListCollection({
  items: [
    { label: '15113', value: '15113' },
    { label: '12345', value: '12345' },
    { label: '51112', value: '51112' },
    { label: '13112', value: '13112' },
  ],
});

export default function DialogEditLocation() {
  return (
    <Box>
      <DialogRoot>
        <DialogTrigger asChild>
          <MdEditLocationAlt style={{ fontSize: '20px' }} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text fontWeight="600" fontSize="15px" mb="7px">
              Location Name*
            </Text>
            <Input mb="7px" />
            <Text fontWeight="600" fontSize="15px" mb="7px">
              Kota/Kecamatan*
            </Text>
            {/* menu input kota/kecamatan */}
            <SelectRoot
              collection={daftarKecamatan}
              size="sm"
              w="full"
              mb="7px"
            >
              <SelectTrigger>
                <SelectValueText placeholder="Cari kota/kecamtan" />
              </SelectTrigger>
              <SelectContent>
                {daftarKecamatan.items.map((kecamatan) => (
                  <SelectItem item={kecamatan} key={kecamatan.value}>
                    {kecamatan.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>

            <Text fontWeight="600" fontSize="15px" mb="7px">
              Kode Pos*
            </Text>
            {/* menu input Kode pos */}
            <SelectRoot collection={daftarKodePos} size="sm" w="full" mb="7px">
              <SelectTrigger>
                <SelectValueText placeholder="Cari kota/kecamtan" />
              </SelectTrigger>
              <SelectContent>
                {daftarKodePos.items.map((kodepos) => (
                  <SelectItem item={kodepos} key={kodepos.value}>
                    {kodepos.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>

            <Text fontWeight="600" fontSize="15px" mb="7px">
              Alamat Lengkap*
            </Text>
            <Textarea mb="7px" />
            <Text fontWeight="600" fontSize="15px" mb="7px">
              Pinpoint Lokasi*
            </Text>
            <Text fontWeight="400" fontSize="13px" mb="7px">
              Tandai lokasi untuk mempermudah pemintaan pickup kurir{' '}
            </Text>

            <Box w="full" h="150px" bgColor="blue" borderRadius="7px">
              {/* Maps pinpoint */}
            </Box>
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
