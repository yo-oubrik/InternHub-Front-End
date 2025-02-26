import moment from "moment";

export const formatDates = (date: Date) => {
  return moment(date).format("DD MMMM YYYY HH:mm");;
};
