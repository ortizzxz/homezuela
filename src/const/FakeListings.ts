export interface Listing {
  id: number;
  title: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  city: string;
  neighborhood: string;
  imageUrl?: string;
  imageFiles?: File[]
  isNew: boolean;
  type: string;   
}


export const fakeListings: Listing[] = [
  { id: 1, title: "Modern apartment in Caracas", price: 85000, beds: 3, baths: 2, sqft: 120, city: "Caracas", neighborhood: "La Castellana", imageUrl: "https://ap.rdcpix.com/841a2256fb3041ecde48c0cfbf9f4898l-m659683295rd-w480_h360.webp", isNew: true , type: "SFH"},
  { id: 2, title: "Cozy family home", price: 65000, beds: 4, baths: 3, sqft: 180, city: "Valencia", neighborhood: "El Viñedo", imageUrl: "https://ap.rdcpix.com/79cb7f489f916f49de6695d0191506c5l-m3962923836rd-w480_h360.webp", isNew: false, type: "SFH" },
  { id: 3, title: "Investment apartment", price: 48000, beds: 2, baths: 2, sqft: 90, city: "Maracaibo", neighborhood: "Bella Vista", imageUrl: "https://ap.rdcpix.com/841a2256fb3041ecde48c0cfbf9f4898l-m659683295rd-w480_h360.webp", isNew: true, type: "SFH"},
  { id: 4, title: "Penthouse with view", price: 150000, beds: 3, baths: 3, sqft: 200, city: "Caracas", neighborhood: "Altamira", imageUrl: "https://ap.rdcpix.com/79cb7f489f916f49de6695d0191506c5l-m3962923836rd-w480_h360.webp", isNew: true, type: "SFH"},
  { id: 1, title: "Modern apartment in Caracas", price: 85000, beds: 3, baths: 2, sqft: 120, city: "Caracas", neighborhood: "La Castellana", imageUrl: "https://ap.rdcpix.com/841a2256fb3041ecde48c0cfbf9f4898l-m659683295rd-w480_h360.webp", isNew: false, type: "SFH"},
  { id: 2, title: "Cozy family home", price: 26000, beds: 4, baths: 3, sqft: 180, city: "Valencia", neighborhood: "El Viñedo", imageUrl: "https://ap.rdcpix.com/79cb7f489f916f49de6695d0191506c5l-m3962923836rd-w480_h360.webp", isNew: true, type: "SFH"},
  { id: 3, title: "Investment apartment", price: 21000, beds: 2, baths: 2, sqft: 90, city: "Maracaibo", neighborhood: "Bella Vista", imageUrl: "https://ap.rdcpix.com/841a2256fb3041ecde48c0cfbf9f4898l-m659683295rd-w480_h360.webp", isNew: false, type: "SFH"},
  { id: 4, title: "Penthouse with view", price: 14000, beds: 3, baths: 3, sqft: 200, city: "Caracas", neighborhood: "Altamira", imageUrl: "https://ap.rdcpix.com/79cb7f489f916f49de6695d0191506c5l-m3962923836rd-w480_h360.webp", isNew: false, type: "SFH"},
  { id: 1, title: "Modern apartment in Caracas", price: 85000, beds: 3, baths: 2, sqft: 120, city: "Caracas", neighborhood: "La Castellana", imageUrl: "https://ap.rdcpix.com/841a2256fb3041ecde48c0cfbf9f4898l-m659683295rd-w480_h360.webp", isNew: false, type: "SFH"},
  { id: 2, title: "Cozy family home", price: 26000, beds: 4, baths: 3, sqft: 180, city: "Valencia", neighborhood: "El Viñedo", imageUrl: "https://ap.rdcpix.com/79cb7f489f916f49de6695d0191506c5l-m3962923836rd-w480_h360.webp", isNew: true, type: "SFH"},
  { id: 3, title: "Investment apartment", price: 21000, beds: 2, baths: 2, sqft: 90, city: "Maracaibo", neighborhood: "Bella Vista", imageUrl: "https://ap.rdcpix.com/841a2256fb3041ecde48c0cfbf9f4898l-m659683295rd-w480_h360.webp", isNew: false, type: "SFH"},
  { id: 4, title: "Penthouse with view", price: 14000, beds: 3, baths: 3, sqft: 200, city: "Caracas", neighborhood: "Altamira", imageUrl: "https://ap.rdcpix.com/79cb7f489f916f49de6695d0191506c5l-m3962923836rd-w480_h360.webp", isNew: false, type: "SFH"},
];

export const fakeRentals: Listing[] = [
  {
    id: 1,
    title: "Downtown modern studio",
    price: 950,
    beds: 1,
    baths: 1,
    sqft: 55,
    city: "Caracas",
    neighborhood: "Altamira",
    imageUrl: "https://images.adsttc.com/media/images/5ecd/b4af/b357/65c6/7300/002c/large_jpg/IMG_9107_(Alta).jpg?1590539403",
    isNew: true,
    type: "condo",
  },
  {
    id: 2,
    title: "Bright apartment with balcony",
    price: 1200,
    beds: 2,
    baths: 1,
    sqft: 75,
    city: "Valencia",
    neighborhood: "El Parral",
    imageUrl: "https://image.wasi.co/eyJidWNrZXQiOiJzdGF0aWN3Iiwia2V5IjoiaW5tdWVibGVzXC9ncl9jYXNhX2VuX3ZlbnRhX2NvbGluYXNfZGVsX3RhbWFfMTY5NjUzODI2OC0wMzg1XzQzMTUuanBnIiwiZWRpdHMiOnsibm9ybWFsaXNlIjp0cnVlLCJyb3RhdGUiOjAsInJlc2l6ZSI6eyJ3aWR0aCI6OTc5LCJoZWlnaHQiOjc0MywiZml0IjoiY29udGFpbiIsImJhY2tncm91bmQiOnsiciI6MjU1LCJnIjoyNTUsImIiOjI1NSwiYWxwaGEiOjF9fX19",
    isNew: false,
    type: "SFH",
  },
  {
    id: 3,
    title: "Family rental house with garden",
    price: 1500,
    beds: 3,
    baths: 2,
    sqft: 140,
    city: "Maracaibo",
    neighborhood: "La Lago",
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_959292-MLV106756375852_022026-O.webp",
    isNew: true,
    type: "SFH",
  },
  {
    id: 4,
    title: "Luxury penthouse rental",
    price: 2400,
    beds: 3,
    baths: 3,
    sqft: 210,
    city: "Caracas",
    neighborhood: "La Castellana",
    imageUrl: "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/88E0/production/_127904053_img-1289.jpg.webp",
    isNew: true,
    type: "condo",
  },
  {
    id: 5,
    title: "Compact city studio",
    price: 780,
    beds: 1,
    baths: 1,
    sqft: 45,
    city: "Valencia",
    neighborhood: "Prebo",
    imageUrl: "https://image.wasi.co/eyJidWNrZXQiOiJzdGF0aWN3Iiwia2V5IjoiaW5tdWVibGVzXC9ncl9jYXNhX2VuX3ZlbnRhX2xvc19uYXJhbmpvc19kZWxfMTcxNTI3NDkyNS01MDEyXzQ5NTUuanBlZyIsImVkaXRzIjp7Im5vcm1hbGlzZSI6dHJ1ZSwicm90YXRlIjowLCJyZXNpemUiOnsid2lkdGgiOjk3OSwiaGVpZ2h0Ijo3NDMsImZpdCI6ImNvbnRhaW4iLCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfX19fQ==",
    isNew: false,
    type: "apartment",
  },
  {
    id: 6,
    title: "Spacious family apartment",
    price: 1350,
    beds: 3,
    baths: 2,
    sqft: 125,
    city: "Maracaibo",
    neighborhood: "Bella Vista",
    imageUrl: "https://cdn.21online.lat/venezuela/cache/awsTest1/rc/fhovSdRP/uploads/66/propiedades/40856/686d497af1b7f.jpg",
    isNew: true,
    type: "apartment",
  },
  {
    id: 7,
    title: "Townhouse near downtown",
    price: 1700,
    beds: 3,
    baths: 2,
    sqft: 160,
    city: "Caracas",
    neighborhood: "Los Palos Grandes",
    imageUrl: "https://image.wasi.co/eyJidWNrZXQiOiJzdGF0aWN3Iiwia2V5IjoiaW5tdWVibGVzXC9ncjg3NTc4MTIwMjMxMjA4MDg0MDU5LmpwZWciLCJlZGl0cyI6eyJub3JtYWxpc2UiOnRydWUsInJvdGF0ZSI6MCwicmVzaXplIjp7IndpZHRoIjo5NzksImhlaWdodCI6NzQzLCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MX19fX0=",
    isNew: false,
    type: "condo",
  },
  {
    id: 8,
    title: "Modern loft apartment",
    price: 1100,
    beds: 2,
    baths: 1,
    sqft: 90,
    city: "Valencia",
    neighborhood: "El Viñedo",
    imageUrl: "https://cdn.yumblin.com/images/classifieds/medium/vendo-amplia-casa-en-prados-del-este-846863-461617509-rp.webp",
    isNew: true,
    type: "apartment",
  }
];