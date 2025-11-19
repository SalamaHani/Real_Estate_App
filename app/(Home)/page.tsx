import Continer from "@/components/global/Continer";
import Agents from "@/components/home/Agents";
import Communities from "@/components/home/Communities";
import Featured from "@/components/home/Featured";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/hero";
import { Suspense, useMemo } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  socket.on("connect", () => {
    console.log("welcome web Socket");
  });
  return (
    <div className="h-[200vh]">
      <HeroSection />
      <Continer>
        <Suspense>
          <Featured />
          <Communities />
          <Agents />
        </Suspense>
        <Footer />
      </Continer>
    </div>
  );
}
