import { fetchFavoriteId } from "@/utils/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";
async function FavoriteToggleButton({ listingId , classname }: { listingId: string ,classname?:boolean }) {
  const favoriteId = await fetchFavoriteId({ listingId });
  return <FavoriteToggleForm  classname={classname} favoriteId={favoriteId} listingId={listingId} />;
}
export default FavoriteToggleButton;
