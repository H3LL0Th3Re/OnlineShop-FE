export interface VariantOption {
  id: string;
  name: string;
}

export interface Variant {
  id: string;
  name: string;
  Variant_options: VariantOption[];
}

export interface Product {
  id: string;
  name: string;
  variants: Variant[];
  attachments: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  variant: string;
  sku: string;
  attachments: string;
  quantity: number;
  price: number;
  is_active: boolean;
  variants: Variant[];
}
