import { useState, useMemo } from "react";
import { GET_ALL_BOOKINGS, SAVE_BOOKING } from "./queries";

const defaultFetch = (query, variables = {}) => {
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

const useFetch = (query, variables = {}) => {
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

export const getAllBookings = () => {
  const {
    data: { allBookings },
    loading,
    error,
  } = useFetch(GET_ALL_BOOKINGS);
  return { allBookings, loading, error };
};

export const saveBooking = (variables) => defaultFetch(SAVE_BOOKING, variables);
