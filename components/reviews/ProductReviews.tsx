import {
  fetchProductRating,
  fetchProductReviews,
  ratingSummary,
} from "@/utils/actions";
import TitelSection from "../global/TitelSection";
import ReviewCard from "./ReviewCard";
import RatingsReviews from "../singel-product/RatingsReviews";

async function ProductReviews({ productId }: { productId: string }) {
  const { reviews, totalReviews } = await fetchProductReviews(productId);
  const { rating } = await fetchProductRating(productId);
  const Reating = await ratingSummary(productId);
  return (
    <div className="mt-16">
      <TitelSection text="Ratings and reviews" />
      <div className="grid md:grid-cols-2 gap-8 my-8">
        <RatingsReviews
          overallRating={+rating}
          totalRatings={totalReviews}
          ratingBreakdown={Reating}
        />
        {reviews.map((review) => {
          const { comment, rating, authorName, createdAt } = review;
          const reviewInfo = {
            comment,
            rating,
            authorName,
            createdAt,
          };
          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
}
export default ProductReviews;
