import { useFetch } from "./base";
import { GET_ALL_PEOPLE } from "./queries";

export const getAllPeople = () => {
  const {
    data: { allPeople },
    loading,
    error,
  } = useFetch(GET_ALL_PEOPLE);
  return { allPeople, loading, error };
};
