import PublicHero from "../components/PublicHero";
import RecentListings from "../components/RecentListings";
import RecentBlogs from "../components/RecentBlogs";

export default function HomePage() {
  return (
    <>
      <PublicHero />
      <RecentListings />
      <RecentBlogs />
    </>
  );
}
