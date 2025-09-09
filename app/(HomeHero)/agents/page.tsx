import AgentsContenrr from "@/components/agents/AgentsContenrr";
import Continer from "@/components/global/Continer";
import PaginationListing from "@/components/global/Pgenation";
import Footer from "@/components/home/Footer";
import { FetshAllAgents } from "@/utils/actions";
import React from "react";
type ListingsPageProps = {
  searchParams: {
    Page?: string;
    limit?: string;
  };
};
async function page({ searchParams }: ListingsPageProps) {
  const Page = parseInt(searchParams.Page ?? "1");
  const AgentData = await FetshAllAgents({ Page });
  return (
    <Continer>
      <div>
        <AgentsContenrr Agent={AgentData.Agents} />
        <PaginationListing
          Page={Page}
          pathe="agents"
          metadata={AgentData.metadata}
        />
      </div>
      <Footer />
    </Continer>
  );
}

export default page;
