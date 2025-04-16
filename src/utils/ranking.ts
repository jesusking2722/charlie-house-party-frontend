import { Applicant } from "../types";

export const getApplicantScore = (applicant: Applicant | null): number => {
  if (!applicant) return 0;
  const totalStickerValue = applicant.stickers.reduce(
    (acc, sticker) => acc + sticker.price,
    0
  );
  const rate = applicant.applier.rate ?? 0;

  const appliedAt = applicant.appliedAt
    ? new Date(applicant.appliedAt).getTime()
    : 0;
  const now = new Date().getTime();
  const timeDiff = now - appliedAt;

  return totalStickerValue * 3 + rate * 2 - timeDiff / 10000000;
};
