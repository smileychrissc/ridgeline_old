import React from 'react';
import { Modal, StyleSheet } from 'react-native';

import { ConfirmPage } from './components/actionUI/ConfirmPage.js';

export class ResetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: "Continue to clear all information on the lock"};
  }
  
  wipeLock() {
    // TODO: Wipe the lock
    this.setState({message: "Lock has been cleared"});
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
          <ConfirmPage next={this.wipeLock.bind(this)} title={this.state.message} />
        </Modal>
    );
  };
}

const styles = StyleSheet.create({
  modal: {
    reset: {
      container: {
        backgroundColor: '#a0a0a0',
      },
    },
  },
});

