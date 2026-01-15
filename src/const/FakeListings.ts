export interface Listing {
  id: number;
  title: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  city: string;
  neighborhood: string;
  imageUrl: string;
  isNew: boolean;
  type: string;   
}


export const fakeListings: Listing[] = [
  { id: 1, title: "Modern apartment in Caracas", price: "$85,000", beds: 3, baths: 2, sqft: 120, city: "Caracas", neighborhood: "La Castellana", imageUrl: "https://ap.rdcpix.com/841a2256fb3041ecde48c0cfbf9f4898l-m659683295rd-w480_h360.webp", isNew: true , type: "Single-Family Home"},
  { id: 2, title: "Cozy family home", price: "$65,000", beds: 4, baths: 3, sqft: 180, city: "Valencia", neighborhood: "El Viñedo", imageUrl: "https://ap.rdcpix.com/79cb7f489f916f49de6695d0191506c5l-m3962923836rd-w480_h360.webp", isNew: false, type: "Single-Family Home" },
  { id: 3, title: "Investment apartment", price: "$48,000", beds: 2, baths: 2, sqft: 90, city: "Maracaibo", neighborhood: "Bella Vista", imageUrl: "https://ap.rdcpix.com/841a2256fb3041ecde48c0cfbf9f4898l-m659683295rd-w480_h360.webp", isNew: true, type: "Single-Family Home"},
  { id: 4, title: "Penthouse with view", price: "$150,000", beds: 3, baths: 3, sqft: 200, city: "Caracas", neighborhood: "Altamira", imageUrl: "https://ap.rdcpix.com/79cb7f489f916f49de6695d0191506c5l-m3962923836rd-w480_h360.webp", isNew: true, type: "Single-Family Home"},
  { id: 1, title: "Modern apartment in Caracas", price: "$85,000", beds: 3, baths: 2, sqft: 120, city: "Caracas", neighborhood: "La Castellana", imageUrl: "https://ap.rdcpix.com/841a2256fb3041ecde48c0cfbf9f4898l-m659683295rd-w480_h360.webp", isNew: false, type: "Single-Family Home"},
  { id: 2, title: "Cozy family home", price: "$26,000", beds: 4, baths: 3, sqft: 180, city: "Valencia", neighborhood: "El Viñedo", imageUrl: "https://ap.rdcpix.com/79cb7f489f916f49de6695d0191506c5l-m3962923836rd-w480_h360.webp", isNew: true, type: "Single-Family Home"},
  { id: 3, title: "Investment apartment", price: "$21,000", beds: 2, baths: 2, sqft: 90, city: "Maracaibo", neighborhood: "Bella Vista", imageUrl: "https://ap.rdcpix.com/841a2256fb3041ecde48c0cfbf9f4898l-m659683295rd-w480_h360.webp", isNew: false, type: "Single-Family Home"},
  { id: 4, title: "Penthouse with view", price: "$14,000", beds: 3, baths: 3, sqft: 200, city: "Caracas", neighborhood: "Altamira", imageUrl: "https://ap.rdcpix.com/79cb7f489f916f49de6695d0191506c5l-m3962923836rd-w480_h360.webp", isNew: false, type: "Single-Family Home"},
  { id: 1, title: "Modern apartment in Caracas", price: "$85,000", beds: 3, baths: 2, sqft: 120, city: "Caracas", neighborhood: "La Castellana", imageUrl: "https://ap.rdcpix.com/841a2256fb3041ecde48c0cfbf9f4898l-m659683295rd-w480_h360.webp", isNew: false, type: "Single-Family Home"},
  { id: 2, title: "Cozy family home", price: "$26,000", beds: 4, baths: 3, sqft: 180, city: "Valencia", neighborhood: "El Viñedo", imageUrl: "https://ap.rdcpix.com/79cb7f489f916f49de6695d0191506c5l-m3962923836rd-w480_h360.webp", isNew: true, type: "Single-Family Home"},
  { id: 3, title: "Investment apartment", price: "$21,000", beds: 2, baths: 2, sqft: 90, city: "Maracaibo", neighborhood: "Bella Vista", imageUrl: "https://ap.rdcpix.com/841a2256fb3041ecde48c0cfbf9f4898l-m659683295rd-w480_h360.webp", isNew: false, type: "Single-Family Home"},
  { id: 4, title: "Penthouse with view", price: "$14,000", beds: 3, baths: 3, sqft: 200, city: "Caracas", neighborhood: "Altamira", imageUrl: "https://ap.rdcpix.com/79cb7f489f916f49de6695d0191506c5l-m3962923836rd-w480_h360.webp", isNew: false, type: "Single-Family Home"},
];
