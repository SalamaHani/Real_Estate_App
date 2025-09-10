import Continer from "@/components/global/Continer";
import Footer from "@/components/home/Footer";
import { AccordionDemo } from "@/components/sell/ArcdtionListign";
import Hdentitel from "@/components/sell/Hdentitel";
import HeroSection from "@/components/sell/HeroSection";
import React from "react";

function page() {
  return (
    <div>
      <HeroSection />
      <Continer>
        <Hdentitel />
        <AccordionDemo />
        <Footer />
      </Continer>
    </div>
  );
}

export default page;
