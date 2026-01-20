export interface Post {
  id: number;
  slug: string; // The filename (e.g., "buying-guide")
  title: string;
  category: "buying" | "selling" | "renting" | "investment" | "market";
  imageUrl: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
}