import Continer from "@/components/global/Continer";
import Footer from "@/components/home/Footer";
import ContenerListing from "@/components/listings/ContenerListing";
import { fetshAraeacuntry } from "@/utils/actions";
import React from "react";

async function page() {
  const cuntty = await fetshAraeacuntry();
  return (
    <Continer>
      <section className="mt-23 mb-23">
        <div className=" mb-10 lg:mb-14 flex-col justify-center items-center">
          <h2 className=" text-center font-semibold text-4xl md:text-4xl ">
            Our Communities
          </h2>
          <p className="mt-1  text-center text-neutral-400">
            There is nothing more defining than the place you come from, where
            you lay down your roots and return to nest. Your neighborhood shapes
            who you are and defines your identity in the world. We are here to
            help you discover YOUR neighborhood.
          </p>
        </div>

        <div className="mt-12 mx-auto">
          <div className="grid sm:grid-cols-12 gap-8">
            {cuntty.map((item) => {
              return (
                <div
                  key={item.id}
                  className="col-span-12 sm:col-span-8 md:col-span-6"
                >
                  <ContenerListing cuntryar={item} />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </Continer>
  );
}

export default page;
