import { createContext, useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { usePost } from "../hooks/api/usePost";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const { postData } = usePost();
  const [initializing, setInitializing] = useState(true);

  const fetchUserByUsername = async (username) => {
    try {
      const res = await fetch(`/api/users/${username}`);
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to fetch user by username", err);
      setUser(null);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.userId) {
          if (decoded.username) {
            fetchUserByUsername(decoded.username).finally(() =>
              setInitializing(false)
            );
          } else {
            setUser(null);
            setInitializing(false);
          }
        } else {
          setUser(null);
          setInitializing(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
        console.error("Invalid token", err);
        setUser(null);
        setInitializing(false);
      }
    } else {
      setUser(null);
      setInitializing(false);
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
          if (res.user) {
            setUser(res.user);
          } else {
            const decoded = jwtDecode(res.token);
            if (decoded && decoded.username) {
              await fetchUserByUsername(decoded.username);
            } else {
              setUser(null);
            }
          }
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
        if (res.token && res.user) {
          localStorage.setItem("token", res.token);
          setUser(res.user);
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
        initializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
