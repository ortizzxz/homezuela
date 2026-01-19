import { Routes, Route } from "react-router-dom";
import Footer from "./layout/Footer";
import PublicNavbar from "./layout/PublicNavbar";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import BuyPage from "./pages/BuyPage";
import SellPage from "./pages/SellPage";
import AdvertisePage from "./pages/AdvertisePage";
function App() {
  return (
    <>
      <PublicNavbar />

      <Routes>
        {/* Home page */}
        <Route path="/" element={<HomePage />} />

        {/* Blog page */}
        <Route path="/buy" element={<BuyPage />} />

        {/* Blog page */}
        <Route path="/blog" element={<BlogPage />} />
        
        {/* Sell page */}
        <Route path="/sell" element={<SellPage />} />
        
        {/* Advertise page */}
        <Route path="/advertise" element={<AdvertisePage />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
