import { PageHeaderLoading, FormLoading } from "@/components/ui/loading-skeletons";

export default function CreateListingLoading() {
    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <PageHeaderLoading />
            <FormLoading />
        </div>
    );
}
