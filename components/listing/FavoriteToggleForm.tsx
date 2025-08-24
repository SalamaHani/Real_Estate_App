"use client";
import FormContainer from "../form/FormContener";
import { toggleFavoriteAction } from "@/utils/actions";
import { CardSubmitButton } from "../form/Buttons";
import { usePathname } from "next/navigation";
type FavoriteToggleFormProps = {
  listingId: string;
  favoriteId: string | null;
};

function FavoriteToggleForm({
  listingId,
  favoriteId,
}: FavoriteToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, {
    listingId,
    favoriteId,
    pathname,
  });
  return (
    <FormContainer className="relative" action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
}
export default FavoriteToggleForm;
