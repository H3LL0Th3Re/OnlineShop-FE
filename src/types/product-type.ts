export interface Product {
  id: string;
  name: string;
  description: string;
  categoryIds: string[];
  subcategoryIds: string[];
  attachments: string;
  variants: Variant[];
}

export interface Variant {
  id: string;
  name: string;
  is_active: boolean;
  Variant_options: VariantOption[];
}

export interface VariantOption {
  id: string;
  name: string;
  Variant_option_values: VariantOptionValue[];
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
