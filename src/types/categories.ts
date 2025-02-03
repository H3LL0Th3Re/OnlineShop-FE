export interface Categories {
  id: string;
  name: string;
  parentId: string;
  parent: Categories;
  children: Categories;
}
