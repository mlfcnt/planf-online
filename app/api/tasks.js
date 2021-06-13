import { useMutation, useQuery, useQueryClient } from 'react-query';
import { defaultFetch } from './base';
import { GET_ALL_TASKS, SAVE_TASK, UPDATE_TASK } from './queries';

export const useAllTasks = () => useQuery('tasks', () => defaultFetch(GET_ALL_TASKS));

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation((variables) => defaultFetch(UPDATE_TASK, variables), {
    onSuccess: () => {
      queryClient.refetchQueries(['tasks']);
    },
  });
};

export const useSaveTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation((variables) => defaultFetch(SAVE_TASK, variables), {
    onSuccess: () => {
      queryClient.refetchQueries(['tasks']);
    },
  });
  return mutation;
};
