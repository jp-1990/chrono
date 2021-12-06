import React, { createContext, useContext, useState } from 'react';
import { TaskDataWithMarginAndWidth } from '../types';

interface ProviderValue {
  state: {
    selectedTask: TaskDataWithMarginAndWidth | null;
    modalActive: ModalActiveType;
  };
  actions: {
    closeModal: () => void;
    openCreateModal: () => void;
    openUpdateModal: (task: TaskDataWithMarginAndWidth) => void;
  };
}

const CreateUpdateTaskContext = createContext<ProviderValue | null>(null);

/**
 *
 * @returns {object} {@link ProviderValue}
 *
 * @description Context hook for CreateUpdateModal context. Provides the state of the modal and the currently selected task, and actions to update that state.
 */
export const useCreateUpdateModalContext = () => {
  const context = useContext(CreateUpdateTaskContext);
  if (!context)
    throw new Error(
      'useCreateUpdateTaskContext must be used within a CreateUpdateModalProvider'
    );
  return context;
};

enum ModalActiveEnum {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}
type ModalActiveType = ModalActiveEnum | null;

/**
 *
 * @param props.children
 * @returns Context Provider for CreateUpdateModalContext
 */
export const CreateUpdateModalProvider: React.FC = ({ children }) => {
  const [selectedTask, setSelectedTask] =
    useState<TaskDataWithMarginAndWidth | null>(null);
  const [modalActive, setModalActive] = useState<ModalActiveType>(null);

  const openUpdateModal = (task: TaskDataWithMarginAndWidth) => {
    setSelectedTask(task);
    setModalActive(ModalActiveEnum.UPDATE);
  };
  const openCreateModal = () => setModalActive(ModalActiveEnum.CREATE);
  const closeModal = () => {
    setSelectedTask(null);
    setModalActive(null);
  };

  const value: ProviderValue = {
    state: {
      selectedTask,
      modalActive,
    },
    actions: {
      closeModal,
      openCreateModal,
      openUpdateModal,
    },
  };
  return (
    <CreateUpdateTaskContext.Provider value={value}>
      {children}
    </CreateUpdateTaskContext.Provider>
  );
};
