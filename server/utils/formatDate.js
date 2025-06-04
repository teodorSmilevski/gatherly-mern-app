export const formatDate = (date) => {
  const d = new Date(date);
  const pad = (n) => n.toString().padStart(2, "0");
  const day = pad(d.getUTCDate());
  const month = pad(d.getUTCMonth() + 1);
  const year = d.getUTCFullYear();
  const hours = pad(d.getUTCHours());
  const minutes = pad(d.getUTCMinutes());
  return `${day}/${month}/${year}, ${hours}:${minutes}`;
};
