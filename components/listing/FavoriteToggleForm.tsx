"use client";
import FormContainer from "../form/FormContener";
import { toggleFavoriteAction } from "@/utils/actions";
import { CardSubmitButton } from "../form/Buttons";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
type FavoriteToggleFormProps = {
  classname?: boolean;
  listingId: string;
  favoriteId: string | null;
};

function FavoriteToggleForm({
  classname,
  listingId ,
  favoriteId,
}: FavoriteToggleFormProps) {
  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, {
    listingId,
    favoriteId,
    pathname,
  });
  return (
    <FormContainer
      className={cn(`${classname ? `relative` : ``}`)}
      action={toggleAction}
    >
      <CardSubmitButton
        classname={classname}
        isFavorite={favoriteId ? true : false}
      />
    </FormContainer>
  );
}
export default FavoriteToggleForm;
