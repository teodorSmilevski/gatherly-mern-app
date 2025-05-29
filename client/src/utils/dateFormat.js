export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-GB");

export const formatTime = (dateStr) =>
  new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
