import { fetchFavoriteId } from "@/utils/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";
async function FavoriteToggleButton({ listingId }: { listingId: string }) {
  const favoriteId = await fetchFavoriteId({ listingId });
  return <FavoriteToggleForm favoriteId={favoriteId} listingId={listingId} />;
}
export default FavoriteToggleButton;
