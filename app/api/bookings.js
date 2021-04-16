import { useMutation, useQuery, useQueryClient } from "react-query";
import { defaultFetch } from "./base";
import {
  DELETE_BOOKING,
  GET_ALL_BOOKINGS,
  SAVE_BOOKING,
  UPDATE_BOOKING,
} from "./queries";

export const useAllBookings = () =>
  useQuery("bookings", () => defaultFetch(GET_ALL_BOOKINGS));

export const useSaveBooking = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (variables) => defaultFetch(SAVE_BOOKING, variables),
    {
      onSuccess: () => {
        queryClient.refetchQueries(["bookings"]);
      },
    }
  );
  return mutation;
};

export const useUpdateBooking = (isDelete = false) => {
  const queryClient = useQueryClient();
  return useMutation(
    (variables) =>
      defaultFetch(isDelete ? DELETE_BOOKING : UPDATE_BOOKING, variables),
    {
      onSuccess: () => {
        queryClient.refetchQueries(["bookings"]);
      },
    }
  );
};
