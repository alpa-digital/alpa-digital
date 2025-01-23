import { useRef } from "react";
import AwardedWorks from "./sections/AwardedWorks/AwardedWorks";
import Deliver from "./sections/Deliver/Deliver";
import Home from "./sections/Home/Home";
import SelectedWorks from "./sections/SelectedWorks/SelectedWorks";
import CTA from "./sections/CTA/CTA";
import Footer from "./sections/Footer/Footer";

const App = () => {
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

export default App;