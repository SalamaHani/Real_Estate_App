import AgentHero from "@/components/agents/AgentHero";
import ListingOfagent from "@/components/agents/ListingOfagent";
import Continer from "@/components/global/Continer";
import TitelSection from "@/components/global/TitelSection";
import Footer from "@/components/home/Footer";
import { fetshAgentlisting, ListingOfAgents } from "@/utils/actions";
import React from "react";
type ProductEditPageProps = {
  params: Promise<{
    name: string;
  }>;
};
async function page({ params }: ProductEditPageProps) {
  const resolvedParams = await params;
  const { name } = resolvedParams;
  const agent = await fetshAgentlisting({ name });
  const email = agent?.email ?? "";
  const llistingofAgent = await ListingOfAgents({ email });
  console.log(llistingofAgent);
  return (
    <Continer>
      <AgentHero Agent={agent} />
      <TitelSection text={`${agent?.first_name} Recent Active Listings`} />
      <ListingOfagent listing={llistingofAgent} />
      <Footer />
    </Continer>
  );
}

export default page;
