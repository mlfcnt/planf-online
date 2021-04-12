import { defaultFetch, useFetch } from "./base";
import { GET_ALL_BOOKINGS, SAVE_BOOKING } from "./queries";

export const useAllBookings = () => {
  const {
    data: { allBookings },
    loading,
    error,
  } = useFetch(GET_ALL_BOOKINGS);
  return { allBookings, loading, error };
};

export const saveBooking = (variables) => defaultFetch(SAVE_BOOKING, variables);
