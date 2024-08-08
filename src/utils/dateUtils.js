export const getMonthNumber = (monthName) => {
  const months = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  const monthNumber = months[monthName];
  console.log("Getting month number for:", monthName, "Result:", monthNumber);
  return monthNumber;
};

export const formatXAxis = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getUTCHours()}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
};