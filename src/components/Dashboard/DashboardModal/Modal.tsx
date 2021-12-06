import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Modal as ModalLayout } from '../../Layouts';
import { NewActivity, UpdateActivity } from '../../Common';
import { useCreateUpdateModalContext } from '../../../Providers';

interface ModalContentSizeType {
  height: number;
  width: number;
}

const Modal: React.FC = () => {
  const [modalContentSize, setModalContentSize] =
    useState<ModalContentSizeType>({ height: 0, width: 0 });
  const { state, actions } = useCreateUpdateModalContext();

  return (
    <ModalLayout
      active={state.modalActive !== null}
      close={actions.closeModal}
      contentSize={modalContentSize}
      accentColor={state.selectedTask?.color}
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
        {state.modalActive === 'UPDATE' && (
          <UpdateActivity
            modalActive={state.modalActive === 'UPDATE'}
            closeModal={actions.closeModal}
            selectedTask={state.selectedTask}
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
});
