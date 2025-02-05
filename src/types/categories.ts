export interface Categories {
  id: string;
  name: string;
  parentId: string;
  parent: Categories;
  children: Categories;
}

// Tipe data sesuai schema Prisma
export interface Category {
  id: string;
  name: string;
  parentId: string | null;
  parent?: Category;
  children: Category[];
  createdAt: string;
  updatedAt: string;
}

// Tipe untuk response API
export interface CategoryResponse {
  messages: string;
  categories: Category[];
}

// Tipe untuk tampilan di dropdown
export interface CategoryDisplay {
  id: string;
  name: string;
  subCategories: {
    id: string;
    name: string;
  }[];
}
