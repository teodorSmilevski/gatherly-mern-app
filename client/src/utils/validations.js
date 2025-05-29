export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isValidPassword = (password) => password.length >= 8;

export const isValidUsername = (username) =>
  username.trim().length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
