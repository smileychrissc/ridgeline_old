/*
 * Copyright 2018 Chris Schnaufer All Rights Reserved
 * Permissions are granted under: GNU Affero General Public License v3.0.
 * The contents of this file heading may not be modified and must be included
 * in full with any and all distributions of this file and any derived product
 * regardless of any other modifications.
 * Use of this file or derived products in any form for illegal activities or
 * for purposes that can reflect negatively on the original copyright holder(s)
 * are prohibited.
 */
import React from 'react';
import { Modal, StyleSheet } from 'react-native';

import { LocksPage } from './LocksPage.js';

/*
 * Allows the user to manage their locks
 * Props:
 *  locks - Callback for retrieving array of locks as LockInfo objects (and derived instances)
 */
export class ManageModal extends React.Component {
  /*
   * The UI
   */
  render() {
    return (
        <Modal
          animationType='none'
          transparent={true}
          visible={true}
          presentationStyle='overFullScreen'
          style={styles.container}
        >
          <LocksPage locks={this.props.locks}
                     prev={this.props.prev}
                     next={this.props.next}
                     cancel={this.props.cancel} />
        </Modal>
    );
  };
}

/*
 * The styles for this window
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a0a0a0',
  },
});
