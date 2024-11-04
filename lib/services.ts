import { format, formatDistanceToNow } from "date-fns";

export function getDateTime() {
  const today = format(new Date(), "yyyy-MM-dd");
  const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
  return { today, now };
}

export function getLastEditedTime(dateTime: string) {
  const formattedDate = formatDistanceToNow(dateTime, {
    addSuffix: true,
  });

  return formattedDate;
}
