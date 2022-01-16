import moment from "moment";

const strToDate = (str) => moment(str);

const getDuration = (start, end) => end.diff(start, "days");

const isBetween = (item, dateOne, dateTwo) => {
  if (dateOne.isBefore(dateTwo)) {
    return item.isBetween(dateOne, dateTwo);
  } else {
    return item.isBetween(dateTwo, dateOne);
  }
};

const getMin = (dateOne, dateTwo) => {
  if (dateOne.isBefore(dateTwo)) {
    return dateOne;
  } else {
    return dateTwo;
  }
};

const getMax = (dateOne, dateTwo) => {
  if (dateOne.isBefore(dateTwo)) {
    return dateTwo;
  } else {
    return dateOne;
  }
};

const isOlder = (dateOne, dateTwo) => dateOne.isSameOrBefore(dateTwo);

const isNewer = (dateOne, dateTwo) => dateOne.isSameOrAfter(dateTwo);

const dateService = {
  strToDate,
  getDuration,
  isBetween,
  getMin,
  getMax,
  isOlder,
  isNewer,
};

export default dateService;
