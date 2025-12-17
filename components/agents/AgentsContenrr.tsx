import React from "react";
import CardAgent from "../home/CardAgent";
import TitelSection from "../global/TitelSection";
import { ListingAgents } from "@prisma/client";



// Define Agent type based on database schema


function AgentsContenrr({ Agent }: { Agent: ListingAgents[] }) {
  return (
    <section className="mt-23">
      <TitelSection text="Here are a few agents that might fit your needs." />
      <div className="max-w-340 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {Agent.map((item) => {
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

export default AgentsContenrr;
