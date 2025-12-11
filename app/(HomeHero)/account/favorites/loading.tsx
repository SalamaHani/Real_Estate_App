import { GridLoading } from "@/components/ui/loading-skeletons";

export default function FavoritesLoading() {
  return (
    <div className="container mx-auto p-6">
      <GridLoading count={6} />
    </div>
  );
}
