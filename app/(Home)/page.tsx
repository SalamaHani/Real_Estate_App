import Continer from "@/components/global/Continer";
import Agents from "@/components/home/Agents";
import Communities from "@/components/home/Communities";
import Featured from "@/components/home/Featured";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/hero";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="h-[200vh]">
      <HeroSection />
      <Suspense>
        <Continer>
          <Featured />
        </Continer>
      </Suspense>
      <Continer>
        <Communities />
      </Continer>
      <Continer>
        <Agents />
      </Continer>
      <Continer>
        <Footer />
      </Continer>
    </div>
  );
}
