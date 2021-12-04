import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import moment from 'moment';

import {
  Header,
  Title,
  DataChart,
  NewActivity,
  UpdateActivity,
  BottomNav,
} from '../Components/Common';
import { TopActivities, TotalTime } from '../Components/Dashboard';
import { Modal } from '../Components/Layouts';
import { useDashboard } from '../hooks';
import { hoursToHoursAndMinutes, durationInHours } from '../utils';
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

  const { tasks, startDate, endDate } = useDashboard();

  // get top 3 activities
  const topActivities = tasks.summary?.slice(0, 3);
  // get total as hours and mins
  const recorded = hoursToHoursAndMinutes(tasks?.totalTime);
  const possible = durationInHours(moment(startDate), moment(endDate));

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
      <ScrollView style={styles.scrollZindex}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Title
              title="dashboard"
              subtitle={`${moment(startDate).format('MMM Do')} - ${moment(
                endDate
              )
                .subtract(1, 'days')
                .format('MMM Do')}`}
            />
          </View>
          <View>
            <DataChart
              style={styles.dataChart}
              data={tasks.data}
              start={startDate}
              end={endDate}
              setSelectedTask={setSelectedTask}
            />
          </View>
          <TopActivities
            style={styles.topActivities}
            title="TOP ACTIVITIES"
            activities={topActivities}
          />

          <TotalTime
            style={styles.totalTime}
            recorded={recorded}
            possible={possible}
          />
        </View>
      </ScrollView>
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
