import axios from "axios";
import { useState, useCallback } from "react";

export const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteData = useCallback(async (url) => {
    setLoading(true);
    try {
      const res = await axios.delete(url);
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
