import { createContext, useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { usePost } from "../hooks/api/usePost";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const { postData } = usePost();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        localStorage.removeItem("token");
        console.error(err);
        setUser(null);
      }
    }
  }, []);

  const login = useCallback(
    async (credentials) => {
      setLoginError(null);
      setLoginLoading(true);
      try {
        const res = await postData("/api/users/login", credentials);
        if (res.token) {
          localStorage.setItem("token", res.token);
          const decoded = jwtDecode(res.token);
          setUser(decoded);
        } else {
          setLoginError(res.message || "Login failed");
        }
      } catch (err) {
        setLoginError(
          err?.response?.data?.message || "Login failed. Please try again."
        );
      } finally {
        setLoginLoading(false);
      }
    },
    [postData]
  );

  const register = useCallback(
    async (userData) => {
      setLoginError(null);
      setLoginLoading(true);
      try {
        const res = await postData("/api/users/register", userData);

        if (res.token) {
          localStorage.setItem("token", res.token);
          const decoded = jwtDecode(res.token);
          setUser(decoded);
        } else {
          setLoginError(res.message || "Registration failed");
        }
      } catch (err) {
        setLoginError(
          err?.response?.data?.message ||
            "Registration failed. Please try again."
        );
      } finally {
        setLoginLoading(false);
      }
    },
    [postData]
  );

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAuth = !!user;
  const isCreator = user?.role === "creator";
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuth,
        isCreator,
        isAdmin,
        loginError,
        loginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
