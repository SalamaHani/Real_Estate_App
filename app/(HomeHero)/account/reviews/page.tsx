import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContener";
import Continer from "@/components/global/Continer";
import TitelSection from "@/components/global/TitelSection";
import { MotionDiv } from "@/components/motindev";
import ReviewCard from "@/components/reviews/ReviewCard";
import { deleteReview, fetchlistingReviewsByUser } from "@/utils/actions";
import React from "react";

async function page() {
  const reviews = await fetchlistingReviewsByUser();
  if (reviews.length == 0)
    return <TitelSection text="you have no reviews yet" />;
  return (
    <Continer className="mt-20">
      <TitelSection text="Your Reviews" />
      <section className="grid md:grid-cols-2 gap-8 pt-12">
        {reviews.map((review) => {
          const { comment, rating, authorName, createdAt } = review;
          const reviewInfo = { comment, rating, authorName, createdAt };
          return (
            <MotionDiv
              key={review.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ReviewCard reviewInfo={reviewInfo}>
                <DeleteReview reviewId={review.id} />
              </ReviewCard>
            </MotionDiv>
          );
        })}
      </section>
    </Continer>
  );
}
const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  return (
    <FormContainer className="" action={deleteReview}>
      <input type="text" readOnly hidden name="reviewId" value={reviewId} />
      <IconButton actionType="delete" />
    </FormContainer>
  );
};

export default page;
