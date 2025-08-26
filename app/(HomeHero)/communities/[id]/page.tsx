import React from "react";
type ProductEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};
async function page({ params }: ProductEditPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}

export default page;
