import React from "react";
import TitelSection from "../global/TitelSection";
// import imgese from "../../public/imges/pexels-pixabay-280229.jpg";
import ContenerListing from "../listings/ContenerListing";
function Communities() {
  return (
    <section className="mt-23">
      <TitelSection text={"Featured Communities"} />
      <div className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ContenerListing />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ContenerListing />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ContenerListing />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ContenerListing />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ContenerListing />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ContenerListing />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ContenerListing />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ContenerListing />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ContenerListing />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <ContenerListing />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Communities;
