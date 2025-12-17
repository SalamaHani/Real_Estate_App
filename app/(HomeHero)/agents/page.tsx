import AgentsContenrr from "@/components/agents/AgentsContenrr";
import Continer from "@/components/global/Continer";
import PaginationListing from "@/components/global/Pgenation";
import Footer from "@/components/home/Footer";
import { FetshAllAgents } from "@/utils/actions";
import { ListingAgents } from "@/utils/Tayp";
import React from "react";
interface PageProps {
  // Use a specific type instead of 'any' for better type safety
  searchParams:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | undefined;
  // If you also use 'params', it needs to be a Promise too
  params?: Promise<{ [key: string]: string | string[] }>;
}
async function page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const Page = resolvedSearchParams?.page
    ? parseInt(resolvedSearchParams.page as string, 10)
    : 1;
  const AgentData = await FetshAllAgents({ Page });
  return (
    <Continer>
      <div>
        <AgentsContenrr Agent={AgentData.Agents as ListingAgents[] } />
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
