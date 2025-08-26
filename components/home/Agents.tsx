import React from "react";
import TitelSection from "../global/TitelSection";
import CardAgent from "./CardAgent";
import { fetshAgenys } from "@/utils/actions";
import { Agent } from "@prisma/client";

async function Agents() {
  const Agents = await fetshAgenys();
  const agents: Agent[] = [];
  Agents.map((Agents) => {
    Agents.agents.map((agent) => {
      if (
        !agents.find((a: Agent) => a.email === agent.email) &&
        agents.length < 6
      ) {
        agents.push(agent);
      }
    });
  });
  return (
    <section className="mt-23">
      <TitelSection text={"Barrington GroupFine Properties"} />
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
