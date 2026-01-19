import { CreateListingForm } from "../components/CreateListingForm";

  const handleCreateListing = () => {
  };

export default function AdvertisePage() {
  return (
    <>
        <CreateListingForm onSubmit={handleCreateListing}/>
    </>
  );
}
