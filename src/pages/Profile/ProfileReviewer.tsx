import { useState } from "react";
import { Button, Rater } from "../../components";
import { Review } from "../../types";
import { getAverageRate } from "../../utils";
import { motion } from "motion/react";

const ProfileReviewer = ({ reviews }: { reviews: Review[] }) => {
  const [currentReviews, setCurrentReviews] = useState<number>(3);
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);

  const handleExpandMore = () => {
    setCurrentReviews((prev) => Math.min(prev + 3, reviews.length));
  };

  const toggleExpand = (index: number) => {
    setExpandedReviews((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const averageRate = getAverageRate(reviews);

  return (
    <div className="w-full flex flex-col gap-4">
      {reviews.length > 0 && <Rater rate={averageRate} />}
      <div className="w-full flex flex-col gap-8">
        {reviews.slice(0, currentReviews).map((review, index) => {
          const isExpanded = expandedReviews.includes(index);

          return (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", delay: index * 0.1 }}
              className="w-full flex flex-col gap-4 p-4 border border-[#c4f70f] shadow-lg rounded-xl bg-black/10 backdrop-blur-sm"
            >
              <div
                className={`w-full flex flex-row items-start gap-8 transition-all duration-300 ease-in-out ${
                  isExpanded ? "h-[150px]" : "h-[100px] overflow-hidden"
                }`}
              >
                <img
                  src={review.reviewer.avatar ?? ""}
                  alt={review.reviewer.name ?? ""}
                  className="w-[100px] h-[100px] rounded-full object-cover object-center"
                />
                <div className="flex flex-1 w-full flex-col items-start gap-2">
                  <Rater rate={review.rate} />
                  <p
                    className={`text-sm text-black w-full ${
                      isExpanded && "overflow-auto"
                    }`}
                  >
                    {review.description}
                  </p>
                </div>
              </div>
              <Button
                type="transparent"
                label={isExpanded ? "Collapse" : "Expand"}
                width="full"
                onClick={() => toggleExpand(index)}
              />
            </motion.div>
          );
        })}
      </div>

      {currentReviews < reviews.length && (
        <Button
          type="transparent"
          label="Expand More"
          width="full"
          onClick={handleExpandMore}
        />
      )}
    </div>
  );
};

export default ProfileReviewer;
