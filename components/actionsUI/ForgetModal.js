import React from 'react';
import { Modal, StyleSheet } from 'react-native';

import { ConfirmPage } from './components/actionUI/ConfirmPage.js';

export class ForgetModal extends React.Component {
  
  forgetLock() {
    // TODO: Forget the lock
  }
  
  render() {
    return (
        <Modal
          animationType: 'none'
          transparent: {true}
          visible: {true}
          presentationStyle: 'overFullScreen'
          style={styles.modal.reset.container}
        >
          <ConfirmPage next={this.forgetLock.bind(this)} title="Press next to forget this lock" />
        </Modal>
    );
  };
}

const styles = StyleSheet.create({
  modal: {
    forget: {
      container: {
        backgroundColor: '#a0a0a0',
      },
    },
  },
});


