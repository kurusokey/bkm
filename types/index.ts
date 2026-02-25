export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_cents: number;
  alcohol_degree: number | null;
  volume_ml: number | null;
  flavor: string | null;
  image_url: string | null;
  stock_quantity: number;
  is_active: boolean;
    is_featured?: boolean;
    tagline?: string;
    ingredients?: string[];
    tasting_tips?: string;
    category?: 'punch' | 'coffret';
    pack_contents?: string[];
    price?: number;
  volume?: string;
  created_at: string;
}

export interface CartItem extends Product {
  quantity: number;
}
