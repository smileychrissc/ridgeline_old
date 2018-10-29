import React from 'react';

import { Modal, StyleSheet, View } from 'react-native';

import { FingerprintCapturePage } from './components/actionUI/FingerprintCapturePage.js';

export class NewFingerprintModal extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    // Register to get fingerprint events
    
    // Begin capture events
  }
  
  componentWillUnmount() {
    // Unregister from fingerprint events
  }
  
  render() {
    return (
      <Modal
        animationType: 'none'
        transparent: {true}
        visible: {true}
        presentationStyle: 'overFullScreen'
        style={styles.newFingerprintModal}
      >
        <FingerprintCapturePage fingerprints=3 />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  newFingerprintModal: {
    backgroundColor: '#ffe4e4',
  }
});
