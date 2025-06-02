export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isValidPassword = (password) => password.length >= 8;

export const isValidUsername = (username) =>
  username.trim().length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);

export const validateEvent = (formData) => {
  const newErrors = {};
  if (!formData.title) newErrors.title = "Title is required.";
  if (!formData.description) newErrors.description = "Description is required.";
  if (!formData.date) newErrors.date = "Date and time are required.";
  if (!formData.location) newErrors.location = "Location is required.";
  if (!formData.categoryId) newErrors.categoryId = "Category is required.";
  return newErrors;
};
