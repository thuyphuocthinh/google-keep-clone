export const dateString = () => {
  let dtToday = new Date();
  let month: number | string = dtToday.getMonth() + 1;
  let day: number | string = dtToday.getDate();
  let year: number | string = dtToday.getFullYear();
  if (month < 10) {
    month = "0" + month.toString();
  }
  if (day < 10) {
    day = "0" + day.toString();
  }
  let maxDate = year + "-" + month + "-" + day;
  return maxDate;
};

