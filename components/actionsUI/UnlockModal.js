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
import { StyleSheet, Text } from 'react-native';

import { ConfirmPage } from './ConfirmPage.js';
import { PasscodePage } from './PasscodePage.js';

export class UnlockModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passcode: undefined,
    }
  }
  
  unlockCheck() {
  }
  
  setPasscode(newPasscode) {
    this.setState({passcode: newPasscode});
  }
  
  getPasscode() {
    this.setState({passcode: undefined});
  }
  
  unlock() {
    if ((this.props.passcode) && (!this.state.passcode)) {
      // TODO Handle error
      return;
    }
    // TODO: perform unlock
  }
  
  render() {
    let getPasscode = ((typeof this.props.passcode != 'undefined') && (!this.state.passcode));
    return (
        <Modal
          animationType='none'
          transparent={true}
          visible={true}
          presentationStyle='overFullScreen'
          style={styles.container}
        >
        {
          getPasscode && (<PasscodePage next={this.unlockCheck.bind(this)}
                            update={this.setPasscode.bind(this)} />)
        }
        {
          !getPasscode && (<ConfirmPage title='Press next to unlock'
                             prev={this.state.passcode ? this.getPasscode.bind(this) : undefined}
                             next={this.unlock.bind(this)} />)
        }
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
