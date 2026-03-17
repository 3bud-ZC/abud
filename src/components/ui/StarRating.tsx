"use client";

import { useState } from "react";
import { Star, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn, formatDate } from "@/lib/utils";

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: Date;
  helpful: number;
  notHelpful: number;
  images?: string[];
  verified: boolean;
}

interface StarRatingProps {
  rating: number;
  totalReviews: number;
  reviews?: Review[];
  onRatingSubmit?: (rating: number, comment: string, images?: File[]) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
  showReviews?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export default function StarRating({
  rating,
  totalReviews,
  reviews = [],
  onRatingSubmit,
  readonly = false,
  size = "md",
  showReviews = false,
  className
}: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleRatingClick = (clickedRating: number) => {
    if (readonly) return;
    setSelectedRating(clickedRating);
    setShowReviewForm(true);
  };

  const handleSubmitReview = async () => {
    if (!onRatingSubmit || selectedRating === 0) return;

    setIsSubmitting(true);
    try {
      await onRatingSubmit(selectedRating, comment);
      setSelectedRating(0);
      setComment("");
      setShowReviewForm(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (currentRating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= (interactive ? (hoveredRating || selectedRating) : currentRating);
          return (
            <button
              key={star}
              onClick={() => interactive && handleRatingClick(star)}
              onMouseEnter={() => interactive && setHoveredRating(star)}
              onMouseLeave={() => interactive && setHoveredRating(0)}
              disabled={readonly || !interactive}
              className={cn(
                "transition-all duration-200",
                interactive && !readonly && "hover:scale-110 cursor-pointer",
                readonly && "cursor-default"
              )}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  isFilled
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 hover:text-yellow-200"
                )}
              />
            </button>
          );
        })}
      </div>
    );
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const distribution = getRatingDistribution();

  return (
    <div className={cn("space-y-6", className)}>
      {/* Rating Summary */}
      <div className="flex items-center gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{rating.toFixed(1)}</div>
          {renderStars(rating)}
          <div className="text-sm text-gray-500 mt-1">
            {totalReviews} تقييم
          </div>
        </div>

        {/* Rating Distribution */}
        {showReviews && reviews.length > 0 && (
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2 text-sm">
                <span className="w-8">{stars}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${totalReviews > 0 ? (distribution[stars as keyof typeof distribution] / totalReviews) * 100 : 0}%`
                    }}
                  />
                </div>
                <span className="w-8 text-gray-500">
                  {distribution[stars as keyof typeof distribution]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Rating */}
      {!readonly && onRatingSubmit && (
        <div className="border-t pt-6">
          <h3 className="font-medium mb-4">قيم هذا المنتج</h3>
          <div className="flex items-center gap-4">
            {renderStars(0, true)}
            <span className="text-sm text-gray-600">
              {selectedRating > 0 && `${selectedRating} من 5 نجوم`}
            </span>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 space-y-4"
            >
              <textarea
                placeholder="اكتب تقييمك هنا... (اختياري)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              
              <div className="flex gap-3">
                <button
                  onClick={handleSubmitReview}
                  disabled={isSubmitting || selectedRating === 0}
                  className={cn(
                    "px-6 py-2 rounded-lg font-medium transition-colors",
                    isSubmitting || selectedRating === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  )}
                >
                  {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
                </button>
                
                <button
                  onClick={() => {
                    setShowReviewForm(false);
                    setSelectedRating(0);
                    setComment("");
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Reviews List */}
      {showReviews && reviews.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            التقييمات ({reviews.length})
          </h3>
          
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  {/* User Avatar */}
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    {review.userAvatar ? (
                      <img
                        src={review.userAvatar}
                        alt={review.userName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      review.userName.charAt(0).toUpperCase()
                    )}
                  </div>

                  <div className="flex-1">
                    {/* User Info */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{review.userName}</span>
                      {review.verified && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          مشترٍ موثق
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      {renderStars(review.rating)}
                    </div>

                    {/* Comment */}
                    {review.comment && (
                      <p className="text-gray-700 mb-3 leading-relaxed">
                        {review.comment}
                      </p>
                    )}

                    {/* Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`صورة التقييم ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        ))}
                      </div>
                    )}

                    {/* Helpful Actions */}
                    <div className="flex items-center gap-4 text-sm">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        مفيد ({review.helpful})
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors">
                        <ThumbsDown className="w-4 h-4" />
                        غير مفيد ({review.notHelpful})
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
