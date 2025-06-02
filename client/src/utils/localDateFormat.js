export const localDateFormat = (localDateString) => {
  const date = new Date(localDateString);
  return date.toISOString();
};

export const formatForInput = (utcDate) => {
  if (!utcDate) return "";
  const date = new Date(utcDate);
  if (isNaN(date.getTime())) return "";
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date - tzOffset).toISOString().slice(0, 16);
};
