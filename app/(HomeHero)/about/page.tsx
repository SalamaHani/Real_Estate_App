import Continer from "@/components/global/Continer";
import Footer from "@/components/home/Footer";
import React from "react";

function page() {
  const photi =
    "https://ik.imagekit.io/virtualresults/vrwp-sites/tr:di-noimage.png,t-true,f-auto,pr-true/app%2Fuploads%2Fsites%2Floftway%2F2024%2F08%2FDALL%C2%B7E-2024-01-13-16.10.29-A-modern-light-colored-unfurnished-loft-with-a-minimalist-and-contemporary-design.-The-room-is-completely-empty-without-any-furniture-or-decoration.png";
  return (
    <div>
      <section
        className="relative h-[68vh] w-full bg-cover bg-center flex items-center justify-center object-cover "
        style={{
          backgroundImage: `url(${photi})`,
        }}
      >
        <div className="absolute flex items-center justify-center inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white max-w-2xl">
          <h1 className="text-5xl italic md:text-6xl font-medium mb-6">
            {"LOFTWAY"}
          </h1>
          <p className="text-md md:text-xl mb-8">
            {"Why hang art when you can live in it!"}
          </p>
          <div></div>
        </div>
      </section>
      <Continer>
        <div className="">
          <div className=" px-4 xl:px-0 py-10 lg:pt-20  mx-auto">
            <h2 className=" font-semibold italic text-2xl md:text-4xl md:leading-tight">
              LOFTWAY
            </h2>
            <div className="w-full mb-10 lg:mb-14">
              <p className="mt-1 text-neutral-400">
                {
                  " was founded by Christiano Sampaio in 2003, built on the principles of customization and personalized service. Since then, we have been dedicated to serving loft dwellers with a unique approach that sets us apart from the typical real estate giants. We prioritize local expertise and exceptional marketing over corporate franchising, allowing us to stay nimble and adapt to the ever-changing market without missing a beat."
                }
              </p>
              <p className="mt-3 text-neutral-400">
                {
                  "We are honored by the opportunity to serve you and take pride in the qualities that make LOFTWAY stand out: honesty, loyalty, understanding, accountability, and creativity."
                }
              </p>
              <p className="mt-3 text-neutral-400">
                {
                  "Our offices in Downtown and West LA assist buyers, sellers, landlords, renters, and developers with their loft, condo, and architectural needs throughout Los Angeles. Our reach spans from Marina Del Rey to Pasadena, covering everything from starter lofts to million-dollar architectural homes and multi-unit loft developments."
                }
              </p>
              <p className="mt-3 text-neutral-400">
                {
                  "We are currently seeking experienced agents who share our passion for lofts and architectural homes. Additionally, we’re looking for partners interested in opening a LOFTWAY office in other areas. We provide comprehensive training, support, and systems to ensure a successful venture. With our proven formula, low startup costs, and unlimited income potential, LOFTWAY can be replicated anywhere."
                }
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </Continer>
    </div>
  );
}

export default page;
