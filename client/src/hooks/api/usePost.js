import { useCallback } from "react";
import { useState } from "react";
import axiosInstance from "../../utils/api";

export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = useCallback(async (url, payload) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(url, payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postData, loading, error };
};
