// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
}

// Category type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    icon?: string;
  };
}

// Product image type
export interface ProductImage {
  url: string;
  imgix_url: string;
}

// Product type
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name: string;
    description?: string;
    price: number;
    sale_price?: number | null;
    sku?: string;
    in_stock?: boolean;
    product_image?: ProductImage;
    gallery?: ProductImage[];
    category?: Category;
  };
}

// Rating type
export interface Rating {
  key: string;
  value: string;
}

// Review type
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    reviewer_name: string;
    rating: Rating;
    review_text: string;
    product: Product;
    verified_purchase?: boolean;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}