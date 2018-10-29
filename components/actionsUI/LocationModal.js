import React from 'react';
import { Modal, StyleSheet } from 'react-native';

import { ConfirmPage } from './components/actionUI/ConfirmPage.js';

export class LocationModal extends React.Component {
  render() {
    return (
        <Modal
          animationType: 'none'
          transparent: {true}
          visible: {true}
          presentationStyle: 'overFullScreen'
          style={styles.modal.location.container}
        >
          <ConfirmPage title="Lock location saved!" />
        </Modal>
    );
  };
}

const styles = StyleSheet.create({
  modal: {
    location: {
      container: {
        backgroundColor: '#e4ffe4',
      },
    },
  },
});
