import Continer from "@/components/global/Continer";
import Footer from "@/components/home/Footer";
import Contatrycont from "@/components/listings/Contatrycont";
import FramMapscuntry from "@/components/listings/FramMapscuntry";
import Stepcontry from "@/components/listings/Stepcontry";
import { MotionDiv, Motionh1, MotionP } from "@/components/motindev";

import { fetsharyacuntryname } from "@/utils/actions";
import React from "react";
type ProductEditPageProps = {
  params: Promise<{
    name: string;
  }>;
};
async function page({ params }: ProductEditPageProps) {
  const resolvedParams = await params;
  const { name } = resolvedParams;
  const aereacuntry = await fetsharyacuntryname({ name });
  const imgese = aereacuntry?.photos[0];
  return (
    <div>
      <section
        className="relative h-[68vh] w-full bg-cover bg-center flex items-center justify-center object-cover "
        style={{
          backgroundImage: `url(${imgese})`,
        }}
      >
        <div className="absolute flex items-center justify-center inset-0 bg-black/40" />
        <MotionDiv
          className="relative z-10 text-center text-white max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Motionh1
            className="text-5xl italic md:text-6xl font-medium mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            {aereacuntry?.name}
          </Motionh1>
          <MotionP
            className="text-md md:text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            {aereacuntry?.description}
          </MotionP>
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <FramMapscuntry Maps={aereacuntry?.Maps ?? ""} />
          </MotionDiv>
        </MotionDiv>
      </section>
      <Continer>
        <div className="">
          <div className=" px-4 xl:px-0 py-10 lg:pt-20 lg:pb-20 mx-auto">
            <div className="max-w-3xl mb-10 lg:mb-14">
              <h2 className=" font-semibold italic text-2xl md:text-4xl md:leading-tight">
                Our Cuntry
                <span className=" underline">{aereacuntry?.name}</span>
              </h2>
              <p className="mt-1 text-neutral-400">
                {aereacuntry?.description}
              </p>
            </div>
            <Stepcontry cuntryprparty={aereacuntry} />
          </div>
        </div>
        <Contatrycont cuntryprparty={aereacuntry} />
        <Footer />
      </Continer>
    </div>
  );
}

export default page;
