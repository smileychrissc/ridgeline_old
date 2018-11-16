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

import { Language } from '../Language';
import { ConfirmPage } from './ConfirmPage.js';

/*
 * For when the user wants to remove a lock
 */
export class ForgetModal extends React.Component {
  /*
   * Initialize instance
   */
  constructor(props) {
    super(props);
    
    this.strings = Language.strings();
  }
  /*
   * Performs the forgetting lock action
   */
  forgetLock() {
    // TODO: Forget the lock
  }
  
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
          <ConfirmPage next={this.forgetLock.bind(this)}
                       title={this.strings.message.pressNextForgetLock} />
        </Modal>
    );
  };
}

/*
 * Styles for the UI
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a0a0a0',
  },
});


