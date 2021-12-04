import { useMutation } from '@apollo/client';
import {
  DeleteTaskMutation,
  DeleteTaskMutationArgs,
  DeleteTaskMutationRes,
} from '../../graphql/mutations';
import { TaskAPIResponse } from '../../types';

const useDeleteTask = () => {
  const [deleteTask] = useMutation<
    DeleteTaskMutationRes,
    DeleteTaskMutationArgs
  >(DeleteTaskMutation, {
    update: (cache, { data }) => {
      const taskId = data?.deleteTask.id;
      cache.modify({
        fields: {
          findTasks: (existingTasks = []) => {
            return existingTasks.filter(
              (task: TaskAPIResponse) => task.id !== taskId
            );
          },
        },
      });
    },
  });

  return {
    deleteTask,
  };
};

export default useDeleteTask;
export interface DeleteVariables {
  id: string;
}
