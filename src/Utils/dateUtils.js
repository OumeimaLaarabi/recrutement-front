import {
  parseISO,
  format,
  isToday,
  isYesterday,
  formatDistanceToNow,
} from "date-fns";

export const formatDate = (isoDate) => {
  const date = parseISO(isoDate);
  if (isToday(date)) {
    return `Posted ${formatDistanceToNow(date)} ago`;
  } else if (isYesterday(date)) {
    return "Posted yesterday";
  } else {
    return `Posted on ${format(date, "MMM dd, yyyy")}`;
  }
};

export const forDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Change the format as needed
};
