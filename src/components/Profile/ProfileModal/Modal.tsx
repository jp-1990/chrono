import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { NewActivity, Modal as ModalLayout } from '../../Common';
import { useModalContext } from '../../../Providers';

interface ModalContentSizeType {
  height: number;
  width: number;
}

const Modal = () => {
  const [modalContentSize, setModalContentSize] =
    useState<ModalContentSizeType>({ height: 0, width: 0 });
  const { state, actions } = useModalContext();

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
