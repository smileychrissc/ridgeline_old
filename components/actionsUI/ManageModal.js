import React from 'react';
import { Modal, StyleSheet } from 'react-native';

import { LocksPage } from './components/actionUI/LocksPage.js';

export class ManageModal extends React.Component {
  render() {
    return (
        <Modal
          animationType: 'none'
          transparent: {true}
          visible: {true}
          presentationStyle: 'overFullScreen'
          style={styles.modal.manage.container}
        >
          <LocksPage locks={this.props.locks} />
        </Modal>
    );
  };
}

const styles = StyleSheet.create({
  modal: {
    manage: {
      container: {
        backgroundColor: '#a0a0a0',
      },
    },
  },
});
