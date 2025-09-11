import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import RatingsReviews from "../singel-product/RatingsReviews";
import {
  fetchProductRating,
  fetchProductReviews,
  ratingSummary,
} from "@/utils/actions";
import ProductReviewReadMore from "./ProductReviewReadMore";
import { Separator } from "@radix-ui/react-dropdown-menu";
// import { Separator } from "@radix-ui/react-separator";

async function ReviewsDiloge({ productId }: { productId: string }) {
  const { count, rating } = await fetchProductRating(productId);
  const Reating = await ratingSummary(productId);
  const { reviews } = await fetchProductReviews(productId);
  return (
    <Dialog>
      <DialogTrigger asChild>
        
        <Button className="text-sm" variant="outline">
          Read More Reviews
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px] pt-5 pl-5 pr-0 pb-5">
        <DialogHeader>
          <DialogTitle>Ratings and reviews</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto pr-5  max-h-[60vh] w-full">
          <RatingsReviews
            overallRating={+rating}
            totalRatings={count}
            ratingBreakdown={Reating}
            className={"flex-col items-center gap-1  border-0 "}
          />
          <Separator className="mt-5 bg-amber-400 mb-5" />
          <DialogHeader>
            <DialogTitle>Reviews ({reviews.length})</DialogTitle>
          </DialogHeader>
          <ProductReviewReadMore productId={productId} reviews={reviews} />
        </div>
        <DialogFooter>{/* <SubmitButton text="Send Review" /> */}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewsDiloge;
