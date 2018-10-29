
import React from 'react';
import { Modal, StyleSheet } from 'react-native';

import { ConfirmPage } from './components/actionUI/ConfirmPage.js';

export class GotoFailedModal extends React.Component {
  render() {
    return (
        <Modal
          animationType: 'none'
          transparent: {true}
          visible: {true}
          presentationStyle: 'overFullScreen'
          style={styles.modal.gotoFailed.container}
        >
          <ConfirmPage title="There isn't a stored location to go to" />
        </Modal>
    );
  };
}

const styles = StyleSheet.create({
  modal: {
    gotoFailed: {
      container: {
        backgroundColor: '#a0a0a0',
      },
    },
  },
});
