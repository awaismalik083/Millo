import Image from "next/image";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Cards from "./Cards";
import Footer from "./Footer";
export default function Home() {
  
  return (
    <div className=" ">
      <Navbar />
      <Hero />
      <Cards />
      <Footer />
    </div>
  );
}
