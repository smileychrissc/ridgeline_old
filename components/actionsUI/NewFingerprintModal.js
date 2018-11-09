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
import { Modal, StyleSheet } from 'react-native';

import Config from '../../Config.js';

import { FingerprintCapturePage } from './FingerprintCapturePage.js';
import { YesNoCancelModal } from './YesNoCancelModal.js';

/*
 * Fingerprint capturing UI
 */
export class NewFingerprintModal extends React.Component {
  /*
   * Prepares instance
   */
  constructor(props) {
    super(props);
    
    let cancelMessage = this.props.cancelMessage ||
                                 "Are you sure you want to cancel registering a print";
    
    this.state = {
      captured: 0,
      confirmCancel: false,
      cancelMessage
    };
    
    this.abandonCancel = this.abandonCancel.bind(this);
    this.confirmCancel = this.confirmCancel.bind(this);
    this.haveFingerprint = this.haveFingerprint.bind(this);
    this.performCancel = this.performCancel.bind(this);
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
   * Function used to confirm the user wants to cancel
   */
  confirmCancel() {
    this.setState({confirmCancel: true});
  }
  /*
   * Called when the user really wants to cancel
   */
  performCancel() {
    this.props.cancel(this.props.lockID);
  }
  /*
   * Called when the user doesn't really want to cancel fingerprint capture
   */
  abandonCancel() {
    this.setState({confirmCancel: false});
  }
  /*
   * UI rendering function
   */
  render() {
    let cancel = this.state.captured < Config.fingerprintCaptureCount ? this.confirmCancel : undefined;
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
        {
          (!this.state.confirmCancel) &&
            <FingerprintCapturePage captured={this.state.captured}
                                fingerprints={Config.fingerprintCaptureCount}
                                next={next}
                                cancel={cancel} />
        }
        {
          (this.state.confirmCancel) &&
            <YesNoCancelModal message={this.state.cancelMessage}
                              yes={this.performCancel}
                              no={this.abandonCancel} />
        }
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
