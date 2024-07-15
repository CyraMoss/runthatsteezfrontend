export interface Product {
  _id?: string;
  name: string;
  price: number;
  description: string;
  mainImage: string;
  additionalImages: string[];
  category: string;
  brand: string;
  sizes: string[];
  colors: string[];
  material: string;
  stock: number;
  ratings: { userId: string; rating: number; comment: string }[];
  numReviews: number;
  averageRating: number;
  createdAt?: Date;
  updatedAt?: Date;
}
