import { Routes, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import PublicNavbar from "./layout/PublicNavbar";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import BuyPage from "./pages/BuyPage";
import SellPage from "./pages/SellPage";
import AdvertisePage from "./pages/AdvertisePage";
import RentPage from "./pages/RentPage";
import BlogDetail from "./components/BlogDetail";

function App() {
  return (
    <>
      <PublicNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/buy" element={<BuyPage />} />
        <Route path="/rent" element={<RentPage />} />
        
        {/* Main Blog List */}
        <Route path="/blog" element={<BlogPage />} />
        
        <Route path="/blog/:slug" element={<BlogDetail />} />
        
        <Route path="/sell" element={<SellPage />} />
        <Route path="/advertise" element={<AdvertisePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;