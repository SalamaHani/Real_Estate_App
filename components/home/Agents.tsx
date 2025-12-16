import React from "react";
import TitelSection from "../global/TitelSection";
import CardAgent from "./CardAgent";
import { fetshAgenys } from "@/utils/actions";
import { ListingAgents } from "@prisma/client";
async function Agents() {
  const listingsWithAgents = await fetshAgenys();
  const agents: ListingAgents[] = [];
  listingsWithAgents.map((listing) => {
    listing.agents.map((agent) => {
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
      <div className="max-w-340 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {agents.map((item) => {
            return (
              <div key={item.first_name}>
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
