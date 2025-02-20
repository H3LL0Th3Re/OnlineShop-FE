import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot,
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
  VStack,
} from '@chakra-ui/react';
import { Field } from '../../ui/field';
import { apiURL } from '@/utils/api-url';
import { ProductType, Variant_option_values } from '@/types/product-type';
import axios from 'axios';
import Swal from 'sweetalert2';

export function DialogUpdatePrice({ productId }: { productId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState<ProductType | null>(null);
  const [updatedData, setUpdatedData] = useState<{
    price: number | null;
    stock: number | null;
    variants: Variant_option_values[];
  }>({
    price: null,
    stock: null,
    variants: [],
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(
          apiURL + `/product/variants/${productId}`
        );
        const data = response.data;
        setProductData(data);

        // If there are variants, initialize updated data
        if (data.variant_combinations) {
          setUpdatedData({
            ...updatedData,
            variants: data.variant_combinations.map(
              (variant: Variant_option_values) => ({
                id: variant.id,
                price: variant.price,
                stock: variant.stock,
              })
            ),
          });
        } else {
          setUpdatedData({
            ...updatedData,
            price: data.price,
            stock: data.stock,
          });
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleSave = async () => {
    console.log('Updated data:', updatedData); // Logs the data you want to send
    setLoading(true); // Set loading menjadi true

    try {
      const response = await axios.put(
        apiURL + `/product/update-product/${productId}`,
        updatedData
      );
      console.log('Update success:', response.data);
      Swal.fire({
        // Ganti dengan SweetAlert
        title: 'Update Berhasil!',
        text: 'Data produk telah diperbarui.',
        icon: 'success',
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        setOpen(false); // Tutup dialog setelah notifikasi
      });
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire({
        // Notifikasi error
        title: 'Update Gagal!',
        text: 'Terjadi kesalahan saat memperbarui data produk.',
        icon: 'error',
      });
    } finally {
      setLoading(false); // Set loading menjadi false setelah proses selesai
    }
  };

  if (!productData) return null;

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
          {productData.variant_combinations ? (
            <VStack align="start" spaceY={4}>
              {productData.variant_combinations.map(
                (variant: Variant_option_values) => (
                  <Box key={variant.id} width="100%">
                    <Text fontWeight={'bold'}>
                      {variant.options
                        ?.map((option) => option.name)
                        .join(' - ')}
                    </Text>
                    <Flex gap={4}>
                      <Stack gap="4" w={'50%'}>
                        <Field>
                          <Text>Price</Text>
                          <Group attached w={'full'}>
                            <InputAddon>Rp</InputAddon>
                            <Input
                              borderLeftRadius="0"
                              value={
                                updatedData.variants.find(
                                  (v: Variant_option_values) =>
                                    v.id === variant.id
                                )?.price || variant.price
                              }
                              onChange={(e) => {
                                const updatedVariants =
                                  updatedData.variants.map(
                                    (v: Variant_option_values) =>
                                      v.id === variant.id
                                        ? {
                                            ...v,
                                            price: parseInt(e.target.value),
                                          }
                                        : v
                                  );
                                setUpdatedData({
                                  ...updatedData,
                                  variants: updatedVariants,
                                });
                              }}
                              placeholder="55.000"
                            />
                          </Group>
                        </Field>
                      </Stack>
                      <Stack gap="4" w={'50%'}>
                        <Field>
                          <Text>Stock</Text>
                          <Group attached w={'full'}>
                            <InputAddon>Qty</InputAddon>
                            <Input
                              borderLeftRadius="0"
                              value={
                                updatedData.variants.find(
                                  (v: Variant_option_values) =>
                                    v.id === variant.id
                                )?.stock || variant.stock
                              }
                              onChange={(e) => {
                                const updatedVariants =
                                  updatedData.variants.map(
                                    (v: Variant_option_values) =>
                                      v.id === variant.id
                                        ? {
                                            ...v,
                                            stock: parseInt(e.target.value),
                                          }
                                        : v
                                  );
                                setUpdatedData({
                                  ...updatedData,
                                  variants: updatedVariants,
                                });
                              }}
                              placeholder="20"
                            />
                          </Group>
                        </Field>
                      </Stack>
                    </Flex>
                  </Box>
                )
              )}
            </VStack>
          ) : (
            <Box spaceY={2}>
              <Text fontWeight={'bold'}>{productData.name}</Text>
              <Flex gap={4}>
                <Stack gap="4" w={'50%'}>
                  <Field>
                    <Text>Price</Text>
                    <Group attached w={'full'}>
                      <InputAddon>Rp</InputAddon>
                      <Input
                        borderLeftRadius="0"
                        value={updatedData.price || productData.price}
                        onChange={(e) =>
                          setUpdatedData({
                            ...updatedData,
                            price: parseInt(e.target.value),
                          })
                        }
                        placeholder="55.000"
                      />
                    </Group>
                  </Field>
                </Stack>
                <Stack gap="4" w={'50%'}>
                  <Field>
                    <Text>Stock</Text>
                    <Group attached w={'full'}>
                      <InputAddon>Qty</InputAddon>
                      <Input
                        borderLeftRadius="0"
                        value={updatedData.stock || productData.stock}
                        onChange={(e) =>
                          setUpdatedData({
                            ...updatedData,
                            stock: parseInt(e.target.value),
                          })
                        }
                        placeholder="20"
                      />
                    </Group>
                  </Field>
                </Stack>
              </Flex>
            </Box>
          )}
        </DialogBody>

        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button bg={'blue.600'} onClick={handleSave} loading={loading}>
            Save
          </Button>
        </DialogFooter>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
