import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { NewActivity, Modal as ModalLayout } from '../../Common';
import { useModalContext } from '../../../Providers';
import { default as Statistics } from './Content';

interface ModalContentSizeType {
  height: number;
  width: number;
}

const Modal: React.FC = () => {
  const [modalContentSize, setModalContentSize] =
    useState<ModalContentSizeType>({ height: 0, width: 0 });
  const { state, actions } = useModalContext();

  return (
    <ModalLayout
      active={state.modalActive !== null}
      close={actions.closeModal}
      contentSize={modalContentSize}
      accentColor={state.selectedGroup?.color}
    >
      <View
        onLayout={(event) =>
          setModalContentSize({
            height: event.nativeEvent.layout.height,
            width: event.nativeEvent.layout.width,
          })
        }
      >
        {state.modalActive === 'CREATE' && (
          <NewActivity
            modalActive={state.modalActive === 'CREATE'}
            closeModal={actions.closeModal}
          />
        )}
        {state.modalActive === 'STATISTICS' && (
          <Statistics
            modalActive={state.modalActive === 'STATISTICS'}
            closeModal={actions.closeModal}
            selectedGroup={state.selectedGroup}
          />
        )}
      </View>
      <View style={styles.modalContentPadding} />
    </ModalLayout>
  );
};

export default Modal;

const styles = StyleSheet.create({
  modalContentPadding: {
    height: '100%',
  },
  scrollZindex: {
    position: 'relative',
    zIndex: -100,
  },
  container: {
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 36,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 6,
  },
  spacer: {
    marginBottom: 19,
  },
});
