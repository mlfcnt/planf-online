import { useState, useMemo } from "react";

export const defaultFetch = (query, variables = {}) => {
  return fetch("/admin/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      variables,
      query,
    }),
  });
};

export const useFetch = (query, variables = {}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  useMemo(async () => {
    try {
      const res = await defaultFetch(query, variables);
      const { data = {} } = await res.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  return {
    loading,
    data,
    error,
  };
};
