export interface Product {
  id?: string;
  name: string;
  description: string;
  categoryIds: string[];
  subcategoryIds: string[];
  attachments: File | null;
  variants?: Variant[];
  is_active?: boolean;
}

export interface Variant {
  id?: string;
  name: string;
  productId?: string;
  variantOptions: VariantOption[];
}

export interface VariantOption {
  name: string;
  values: string[];
}

export interface VariantOptionValue {
  id: string;
  sku: string;
  weight: number;
  stock: number;
  price: number;
  is_active: boolean;
  variant_optionsId: string;
}
