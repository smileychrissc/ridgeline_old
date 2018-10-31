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

import { Config } from '../../Config.js';

import { FingerprintCapturePage } from './FingerprintCapturePage.js';

/*
 * Fingerprint capturing UI
 */
export class NewFingerprintModal extends React.Component {
  /*
   * Prepares instance
   */
  constructor(props) {
    super(props);
    
    this.state = {
      captured: 0
    };
    
    this.haveFingerprint.bind(this);
  }
  /*
   * Begin capturing fingerprints
   */
  componentDidMount() {
    // Begin capturing fingerprints
    setTimeout(() => {this.props.capture(this.props.lockID, this.haveFingerprint);}, 100);
  }
  /*
   * Callback for when a fingerprint was captured
   */
  haveFingerprint(success: boolean) {
    if (success) {
      this.setState({captured: (this.state.captured + 1)});
      if (this.state.captured < Config.fingerprintCaptureCount) {
        setTimeout(() => {this.props.capture(this.props.lockID, this.haveFingerprint);}, 100);
      }
    } else {
      // TODO: handle error (ask user or just let them know it failed)
    }
  }
  /*
   * UI rendering function
   */
  render() {
    let cancel = this.state.captured < Config.fingerprintCaptureCount ?
                         () => {this.props.cancel(this.props.lockID)} : undefined;
    let next = this.state.captured >= Config.fingerprintCaptureCount ?
                         () => {this.props.update(this.props.lockID)} : undefined;
    return (
      <Modal
        animationType='none'
        transparent={true}
        visible={true}
        presentationStyle='overFullScreen'
        style={styles.newFingerprintModal}
      >
        <FingerprintCapturePage captured={this.state.captured}
                                fingerprints={Config.fingerprintCaptureCount}
                                next={next}
                                cancel={cancel} />
      </Modal>
    );
  }
}

/*
 * Styles for this modal
 */
const styles = StyleSheet.create({
  newFingerprintModal: {
    backgroundColor: '#ffe4e4',
  }
});
