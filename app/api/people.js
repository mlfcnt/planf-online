import { useQuery } from "react-query";
import { defaultFetch } from "./base";
import { GET_ALL_PEOPLE } from "./queries";

export const useAllPeople = () =>
  useQuery("people", () => defaultFetch(GET_ALL_PEOPLE));
