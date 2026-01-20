export interface Listing {
  id: string; // Changed to string (UUID)
  agent_id: string;
  title: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  city: string;
  neighborhood: string;
  listing_type: 'house' | 'apartment' | 'land' | 'other';
  listing_status: 'buy' | 'rent';
  images: { url: string; is_main: boolean }[]; // Array of image objects
  isNew: boolean;
  createdAt: string;
}