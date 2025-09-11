import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Rating from "./Rating";
import Comment from "./Comment";
import imgUser from "../../public/imges/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.avif";
import { Calendar } from "lucide-react";
type ReviewCardProps = {
  reviewInfo: {
    comment: string;
    rating: number;
    createdAt: Date;
    authorName: string;
  };
  children?: React.ReactNode;
};
function ReviewCard({ reviewInfo, children }: ReviewCardProps) {
  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center">
          <Image
            src={imgUser}
            alt={reviewInfo.authorName}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-4">
            <h3 className="text-sm font-bold capitalize mb-1">
              {reviewInfo.authorName}
            </h3>
            <Rating rating={reviewInfo.rating} />
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <span className=" flex  mt-1 items-center gap-1">
                <Calendar className="h-3 w-3" />
                {reviewInfo.createdAt.toISOString()}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment comment={reviewInfo.comment} />
      </CardContent>
      <div className="absolute top-3 right-3">{children}</div>
    </Card>
  );
}
export default ReviewCard;
