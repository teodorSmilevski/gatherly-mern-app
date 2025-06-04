import { useState, useCallback } from "react";
import axiosInstance from "../../utils/api";

export const usePut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const putData = useCallback(async (url, payload) => {
    setLoading(true);
    try {
      const res = await axiosInstance.put(url, payload);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { putData, loading, error };
};
