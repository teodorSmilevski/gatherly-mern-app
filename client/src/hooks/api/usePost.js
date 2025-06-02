import axios from "axios";
import { useCallback } from "react";
import { useState } from "react";

export const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = useCallback(async (url, payload) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(url, payload, {
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
