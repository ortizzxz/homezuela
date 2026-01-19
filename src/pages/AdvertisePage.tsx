import { CreateListingForm } from "../components/CreateListingForm";
import type { Listing } from "../const/FakeListings";

  const handleCreateListing = async (data: Omit<Listing, "id" | "isNew">) => {
  };

export default function AdvertisePage() {
  return (
    <>
        <CreateListingForm onSubmit={handleCreateListing}/>
    </>
  );
}
