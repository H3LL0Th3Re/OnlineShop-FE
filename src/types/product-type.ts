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
  description: string;
  category: string;
  variant: string;
  sku: string;
  attachments: string;
  quantity: number;
  price: number;
  is_active: boolean;
  variants: Variant[];
}

export interface ProductTemporary {
  id: string;
  name: string;
  description: string;
  attachments: string;
}
