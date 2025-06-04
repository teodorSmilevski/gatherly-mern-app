import { useState, useEffect } from "react";
import axiosInstance from "../../utils/api";

export const useGet = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(url);

        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const refetch = async () => {
    try {
      const res = await axiosInstance.get(url);

      setData(res.data);
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  return { data, loading, error, refetch };
};
