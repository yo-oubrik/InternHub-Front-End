import moment from "moment";

export const formatDates = (date: Date) => {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");;
};
