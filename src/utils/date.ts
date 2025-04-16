export const formatDate = (date: Date | string | null): string => {
  if (!date) return "";
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date format");
  }

  const year = parsedDate.getFullYear();
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
  const day = parsedDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getDayAgo = (createdAt: Date) => {
  const now = new Date();
  const createdDate = new Date(createdAt);
  const diffInMs = now.getTime() - createdDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "1 day ago";
  return `${diffInDays} days ago`;
};

export const getTimeAgo = (date: Date | string | number): string => {
  const inputDate = new Date(date);

  if (isNaN(inputDate.getTime())) {
    throw new Error("Invalid date input");
  }

  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - inputDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) return "1 minute ago";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
};

export const getRemainingDays = (openingAt: Date): string => {
  const openingTime = new Date(openingAt).getTime();
  const now = new Date().getTime();
  const remainingTime = openingTime - now;
  const remainingDays = Math.ceil(remainingTime / (1000 * 60 * 60 * 24));
  if (remainingDays > 1) {
    return `${remainingDays} days`;
  } else if (remainingDays === 1) {
    return `${remainingDays} day`;
  }
  return "";
};

export const getRemaningDaysPercent = (
  openingAt: Date,
  createdAt: Date
): number => {
  const now = new Date().getTime();
  const openingTime = new Date(openingAt).getTime();
  const createdTime = new Date(createdAt).getTime();
  const totalDuration = openingTime - createdTime;
  const elapsedTime = now - createdTime;
  const number = Number((elapsedTime / totalDuration) * 100).toFixed(1);
  return Number(number);
};
