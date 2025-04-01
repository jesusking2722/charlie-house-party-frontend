import { Review } from "../types";

export const getAverageRate = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rate, 0);
  return Number((total / reviews.length).toFixed(2));
};
