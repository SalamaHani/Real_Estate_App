import React from "react";
import Avrgcntry from "./Avrgcntry";
import { Areacuntry } from "@prisma/client";
import { Button } from "../ui/button";
import { Phone } from "lucide-react";

function Stepcontry({ cuntryprparty }: { cuntryprparty: Areacuntry | null }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
      <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
        <Avrgcntry cuntryprparty={cuntryprparty} />
      </div>
      <div>
        <div className="mb-4">
          <h3 className="text-[#070705] text-xs font-medium uppercase">
            Steps
          </h3>
        </div>

        <div className="flex gap-x-5 ms-1">
          <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
            <div className="relative z-10 size-8 flex justify-center items-center">
              <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800  font-semibold text-xs uppercase rounded-full">
                1
              </span>
            </div>
          </div>

          <div className="flex pt-0.5 pb-8 sm:pb-12">
            <p className="text-sm lg:text-base text-neutral-400">
              <span className="text-black dark:text-white">
                Market Research and Analysis:
              </span>
              Identify your target audience and understand their needs,
              preferences, and behaviors.
            </p>
          </div>
        </div>

        <div className="flex gap-x-4 ms-1">
          <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
            <div className="relative z-10 size-8 flex justify-center items-center">
              <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800  font-semibold text-xs uppercase rounded-full">
                2
              </span>
            </div>
          </div>

          <div className="grow pt-0.5 pb-8 sm:pb-12">
            <p className="text-sm lg:text-base text-neutral-400">
              <span className="text-black dark:text-white">
                Product Development and Testing:
              </span>
              Develop digital products or services that address the needs and
              preferences of your target audience.
            </p>
          </div>
        </div>

        <div className="flex gap-x-4 ms-1">
          <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
            <div className="relative z-10 size-8 flex justify-center items-center">
              <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800  font-semibold text-xs uppercase rounded-full">
                3
              </span>
            </div>
          </div>

          <div className="grow pt-0.5 pb-8 sm:pb-12">
            <p className="text-sm md:text-base text-neutral-400">
              <span className="text-black dark:text-white">
                Marketing and Promotion:
              </span>
              Develop a comprehensive marketing strategy to promote your digital
              products or services.
            </p>
          </div>
        </div>

        <div className="flex gap-x-4 ms-1">
          <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
            <div className="relative z-10 size-8 flex justify-center items-center">
              <span className="flex shrink-0 justify-center items-center size-8 border border-neutral-800  font-semibold text-xs uppercase rounded-full">
                4
              </span>
            </div>
          </div>

          <div className="grow pt-0.5 pb-8 sm:pb-12">
            <p className="text-sm md:text-base text-neutral-400">
              <span className="text-black dark:text-white">
                Launch and Optimization:
              </span>
              Launch your digital products or services to the market, closely
              monitoring their performance and user feedback.
            </p>
          </div>
        </div>

        <Button className="group inline-flex items-center gap-x-2 py-2 px-3  font-medium text-sm rounded-full focus:outline-hidden">
          <Phone />
          Schedule a call Agent
        </Button>
      </div>
    </div>
  );
}

export default Stepcontry;
