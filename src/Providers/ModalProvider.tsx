import React, { createContext, useContext, useState } from 'react';
import { GroupSummaryWithName, TaskDataWithMarginAndWidth } from '../types';

export interface SelectedGroupState {
  group: GroupSummaryWithName & { dateRange: string };
  prevGroup: GroupSummaryWithName & { dateRange: string };
}

interface ProviderValue {
  state: {
    selectedGroup: SelectedGroupState | null;
    selectedTask: TaskDataWithMarginAndWidth | null;
    modalActive: ModalActiveType;
  };
  actions: {
    closeModal: () => void;
    openCreateModal: () => void;
    openStatisticsModal: ({ group, prevGroup }: SelectedGroupState) => void;
    openUpdateModal: (task: TaskDataWithMarginAndWidth) => void;
  };
}

const ModalContext = createContext<ProviderValue | null>(null);

/**
 *
 * @returns {object} {@link ProviderValue}
 *
 * @description Context hook for Modal context. Provides the state of the modal and the currently selected task, and actions to update that state.
 */
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error('useModalContext must be used within a ModalProvider');
  return context;
};

enum ModalActiveEnum {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  STATISTICS = 'STATISTICS',
}
type ModalActiveType = ModalActiveEnum | null;

/**
 *
 * @param props.children
 * @returns Context Provider for CreateUpdateModalContext
 */
export const ModalProvider: React.FC = ({ children }) => {
  const [selectedTask, setSelectedTask] =
    useState<TaskDataWithMarginAndWidth | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<SelectedGroupState | null>(
    null
  );
  const [modalActive, setModalActive] = useState<ModalActiveType>(null);

  const openUpdateModal = (task: TaskDataWithMarginAndWidth) => {
    setSelectedTask(task);
    setModalActive(ModalActiveEnum.UPDATE);
  };
  const openCreateModal = () => {
    setModalActive(ModalActiveEnum.CREATE);
  };
  const openStatisticsModal = ({ group, prevGroup }: SelectedGroupState) => {
    setSelectedGroup({ group, prevGroup });
    setModalActive(ModalActiveEnum.STATISTICS);
  };
  const closeModal = () => {
    setSelectedTask(null);
    setSelectedGroup(null);
    setModalActive(null);
  };

  const value: ProviderValue = {
    state: {
      selectedGroup,
      selectedTask,
      modalActive,
    },
    actions: {
      closeModal,
      openCreateModal,
      openStatisticsModal,
      openUpdateModal,
    },
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
