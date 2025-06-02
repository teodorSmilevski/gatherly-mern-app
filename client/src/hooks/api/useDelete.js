import axios from "axios";
import { useState, useCallback } from "react";

export const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = useCallback(async (url) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(url, {
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

  return { deleteData, loading, error };
};
