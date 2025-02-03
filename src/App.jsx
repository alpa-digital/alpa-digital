import { useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AwardedWorks from "./sections/AwardedWorks/AwardedWorks";
import Deliver from "./sections/Deliver/Deliver";
import Home from "./sections/Home/Home";
import SelectedWorks from "./sections/SelectedWorks/SelectedWorks";
import CTA from "./sections/CTA/CTA";
import Footer from "./sections/Footer/Footer";
import GuiaSetters from "./pages/GuiaSetters";

const MainPage = () => {
  const containerRef = useRef(null);
  return (
    <main className="bg-[#090909]" ref={containerRef}>
      <Home />
      <Deliver />
      <SelectedWorks />
      <AwardedWorks />
      <CTA />
      <Footer />
    </main>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/ia-para-setters" element={<GuiaSetters />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;