export interface Product {
  id?: string;
  name: string;
  url: string;
  description: string;
  minimum_order: number;
  price: number;
  stock: number;
  sku: string;
  length: number;
  height: number;
  width: number;
  weight: number;
  categoryIds: string[];
  subcategoryIds: string[];
  attachments: File[];
  variants?: Variant[];
  is_active?: boolean;
  priceRange?: { min: number; max: number };
}

export interface Checkout_Product {
  id: string
  price: number;
  quantity: number;
  description: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  selectedOptions: string;
  name: string;
  attachments: string;
}

export interface Variant_option_values {
  id?: string;
  sku: string;
  weight: number;
  stock: number;
  price: number;
  is_active: boolean;
  variant_optionsId: string[];
  options?: Option[];
}

export interface Option {
  id: string;
  name: string;
}

export interface Variant {
  variantOptions: VariantOption[];
  id?: string;
  name: string;
  productId?: string;
  Variant_options: Variant_options[];
}

export interface Variant_options {
  id?: string;
  name: string;
  Variant_option_values: Variant_option_values[];
  variantId: string;
}

// Example of defining a specific type for variant options
export interface VariantOption {
  id?: string;
  name: string;
  variantId: string;
  values: string[]; // Adjust based on your actual structure
}
