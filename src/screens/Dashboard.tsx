import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import {
  Header,
  NewActivity,
  UpdateActivity,
  BottomNav,
} from '../Components/Common';
import { DashboardData } from '../Components/Dashboard';
import { Modal } from '../Components/Layouts';

import {
  ModalState,
  ModalTypeEnum,
  TaskDataWithMarginAndWidth,
} from '../types';

import { base, screenSize } from '../styles';
const { screen } = base;

const Dashboard = () => {
  const [modalActive, setModalActive] = useState<ModalState>({
    open: false,
    type: undefined,
  });
  const [modalContentSize, setModalContentSize] = useState<{
    height: number;
    width: number;
  }>({ height: 0, width: 0 });
  const [selectedTask, setSelectedTask] =
    useState<TaskDataWithMarginAndWidth>();

  useEffect(() => {
    if (selectedTask !== undefined) handleOpenUpdateModal();
  }, [selectedTask]);
  useEffect(() => {
    if (!modalActive.open) {
      setSelectedTask(undefined);
    }
  }, [modalActive]);

  const handleOpenCreateModal = () => {
    setModalActive({ open: true, type: ModalTypeEnum.CREATE });
  };
  const handleOpenUpdateModal = () => {
    setModalActive({ open: true, type: ModalTypeEnum.UPDATE });
  };

  const handleCloseModal = () => {
    setModalActive({ open: false, type: undefined });
  };

  return (
    <View style={screen}>
      <Header statusBar="light" />
      <DashboardData />
      <Modal
        active={modalActive.open}
        setActive={setModalActive}
        contentSize={modalContentSize}
        accentColor={selectedTask?.color}
      >
        <View
          onLayout={(event) =>
            setModalContentSize({
              height: event.nativeEvent.layout.height,
              width: event.nativeEvent.layout.width,
            })
          }
        >
          {modalActive.type === ModalTypeEnum.CREATE && (
            <NewActivity
              modalActive={modalActive.open}
              closeModal={handleCloseModal}
            />
          )}
          {modalActive.type === ModalTypeEnum.UPDATE && (
            <UpdateActivity
              modalActive={modalActive.open}
              closeModal={handleCloseModal}
              selectedTask={selectedTask}
            />
          )}
        </View>
        <View style={styles.modalContentPadding} />
      </Modal>

      <BottomNav FABAction={handleOpenCreateModal} />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  scrollZindex: { position: 'relative', zIndex: -100 },
  container: {
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 36,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 6,
  },
  FABContainer: {
    position: 'absolute',
    bottom: 16,
    right: 12,
  },
  dataChart: {
    width: screenSize.width - 24,
    marginBottom: 19,
    marginTop: 12,
  },
  topActivities: {
    marginHorizontal: 24,
    marginBottom: 19,
  },
  totalTime: {
    marginHorizontal: 24,
  },
  modalContentPadding: {
    height: '100%',
  },
});
