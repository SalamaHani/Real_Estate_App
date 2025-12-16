import React from "react";
import TitelSection from "../global/TitelSection";
import CardAgent from "./CardAgent";
import { fetshAgenys } from "@/utils/actions";
import { ListingAgents } from "@prisma/client";
async function Agents() {
  const Agents = await fetshAgenys();
  const agents: ListingAgents[] = [];
  Agents.map((Agents) => {
    Agents.agents.map((agent) => {
      if (
        !agents.find((a: ListingAgents) => a.email === agent.email) &&
        agents.length < 4
      ) {
        agents.push(agent);
      }
    });
  });
  return (
    <section className="mt-23">
      <TitelSection text={"Agents Specializing in Your Search Areas"} />
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {agents.map((item) => {
            return (
              <div key={item?.first_name}>
                <CardAgent Agent={item} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Agents;
//hi Salama Hani el ejela welcaome https//:Afontstor.shop this web sait e-commers shop launps and abjour elictric fiscal Admin and manger and custamr and ouner rol web sait e-commers