/*
 * Copyright 2018 Chris Schnaufer All Rights Reserved
 * Permissions are granted under: GNU Affero General Public License v3.0.
 * The contents of this file heading may not be modified and must be included
 * in full with any and all distributions of this file and any derived product
 * regardless of any modifications.
 * Use of this file or derived products in any form for illegal activities or
 * for purposes that can reflect negatively on the original copyright holder(s)
 * are prohibited.
 */
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { FingerprintCapturePage } from './FingerprintCapturePage.js';

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
        animationType='none'
        transparent={true}
        visible={true}
        presentationStyle='overFullScreen'
        style={styles.newFingerprintModal}
      >
        <FingerprintCapturePage fingerprints="3" />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  newFingerprintModal: {
    backgroundColor: '#ffe4e4',
  }
});
