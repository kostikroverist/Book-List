import { format, toZonedTime } from "date-fns-tz";


export const formatDate = (date: string | number | Date) => {
  if (!date) return "--";
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = toZonedTime(new Date(date), timeZone);
  return format(zonedDate, "yyyy-MM-dd HH:mm:ss", { timeZone });
};
