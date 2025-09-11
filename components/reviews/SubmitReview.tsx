import { SubmitButton } from "@/components/form/Buttons";
import { Card } from "@/components/ui/card";
import FormContainer from "../form/FormContener";
import { createReviewAction } from "@/utils/actions";
import RatingInput from "./RatingInput";
import TextAreaInput from "../form/TextAreaInput";
import { getUserFromSession } from "@/lib/auth";
import { cookies } from "next/headers";

async function SubmitReview({ productId }: { productId: string }) {
  const user = await getUserFromSession(await cookies());
  return (
    <div>
      <Card className="p-8 mt-8">
        <FormContainer className="" action={createReviewAction}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="authorName" value={user?.name || "user"} />
          <RatingInput name="rating" />
          <TextAreaInput
            name="comment"
            labelText="feedback"
            defaultValue="Outstanding product!!!"
          />
          <SubmitButton text="Send Review" className="mt-4" />
        </FormContainer>
      </Card>
    </div>
  );
}
export default SubmitReview;
