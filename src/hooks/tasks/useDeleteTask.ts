import { useMutation } from '@apollo/client';
import {
  DeleteTaskMutation,
  DeleteTaskMutationArgs,
  DeleteTaskMutationRes,
} from '../../graphql/mutations';

interface CacheObjectRef {
  __ref: string;
}

const useDeleteTask = () => {
  const [deleteTaskMutation] = useMutation<
    DeleteTaskMutationRes,
    DeleteTaskMutationArgs
  >(DeleteTaskMutation, {
    refetchQueries: ['scopedTasks'],
    update: (cache, { data }) => {
      const id = data?.deleteTask.id;
      cache.modify({
        fields: {
          tasks: (existingTasks = []) => {
            return existingTasks.filter(
              (ref: CacheObjectRef) => ref.__ref !== `Task:${id}`
            );
          },
        },
      });
    },
  });

  const deleteTask = async (id: string | undefined) => {
    if (!id) return;
    await deleteTaskMutation({
      variables: { id },
    });
    return;
  };

  return {
    deleteTask,
  };
};

export default useDeleteTask;
