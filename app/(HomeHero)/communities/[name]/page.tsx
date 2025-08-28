import { MotionDiv, Motionh1, MotionP } from "@/components/motindev";
import { Button } from "@/components/ui/button";
import { fetsharyacuntryname } from "@/utils/actions";
import React, { useState } from "react";
type ProductEditPageProps = {
  params: Promise<{
    name: string;
  }>;
};
async function page({ params }: ProductEditPageProps) {
  const handelmap = ()=>{
  }
  const resolvedParams = await params;
  const { name } = resolvedParams;
  const aereacuntry = await fetsharyacuntryname({ name });
  console.log(name);
  console.log(aereacuntry);
  const imgese = aereacuntry?.photos[0];
  return (
    <section
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center object-cover "
      style={{
        backgroundImage: `url(${imgese})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <MotionDiv
        className="relative z-10 text-center text-white max-w-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Motionh1
          className="text-5xl md:text-6xl font-bold mb-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {aereacuntry?.name}
        </Motionh1>
        <MotionP
          className="text-lg md:text-xl mb-8"
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
          <div className=" flex  justify-center  items-center">
            <Button onClick={handelmap} size="lg">View Map</Button>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24847758.17819165!2d-75.4035089991047!3d40.51565371979575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3cf078e32ecb3%3A0x24e4402cc03423a7!2z2YXZgtin2LfYudipINmF2YjZhtmF2YjYq9iMINmG2YrZiCDYrNmK2LHYs9mK2Iwg2KfZhNmI2YTYp9mK2KfYqiDYp9mE2YXYqtit2K_YqQ!5e0!3m2!1sar!2s!4v1756390258322!5m2!1sar!2s"
              width="100%"
              height="100vh"
              style="border:0;"
              loading="lazy"
            ></iframe>
          </div>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
}

export default page;
