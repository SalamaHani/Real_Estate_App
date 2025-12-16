import React from "react";
import TitelSection from "../global/TitelSection";
import { fetshAraeacuntry } from "@/utils/actions";
import Contenerlisting from "../listings/Contenerlisting";
//fvdecfrvd
async function Communities() {
  const cuntty = await fetshAraeacuntry();
  return (
    <section className="mt-23">
      <TitelSection text={"Featured Communities"} />
      <div className="mt-12 mx-auto">
        <div className="grid sm:grid-cols-12 gap-4">
          {cuntty.map((item) => {
            return (
              <div
                key={item.id}
                className="col-span-12 sm:col-span-6 md:col-span-4"
              >
                <Contenerlisting cuntryar={item} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Communities;
