import dayjs from "dayjs";
import "dayjs/locale/ar";

export function formatDate(date: string) {
  return dayjs(date).locale("ar").format("M MMM YYYY");
}
