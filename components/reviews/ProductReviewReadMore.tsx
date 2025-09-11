"use client";
import { Review } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ReviewCard from "./ReviewCard";
import { fetchReivewsReadMore } from "@/utils/actions";
import LodingReadMore from "./Lodingmor";
let Page = 2;
function ProductReviewReadMore({
  productId,
  reviews,
}: {
  productId: string;
  reviews: Review[];
}) {
  const [data, setData] = useState<Review[]>(reviews);
  const { ref, inView } = useInView();
  const [hasNext, setHasNext] = useState(true);
  const loadReviews = async () => {
    if (!hasNext) return;
    const reviews = await fetchReivewsReadMore({ productId, Page });
    setData([...data, ...reviews]);
    Page++;
    setHasNext(reviews.length != 0 && hasNext);
  };
  useEffect(() => {
    if (inView && hasNext) {
      loadReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNext]);
  return (
    <div className="grid md:grid-cols-1 gap-4 mt-2">
      {data.map((review) => {
        const { comment, rating, authorName, createdAt } = review;
        const reviewInfo = {
          comment,
          rating,
          authorName,
          createdAt,
        };
        return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
      })}
      {hasNext && (
        <div ref={ref} className="text-center text-sm text-gray-500 py-4">
          <LodingReadMore />
        </div>
      )}
    </div>
  );
}

export default ProductReviewReadMore;
