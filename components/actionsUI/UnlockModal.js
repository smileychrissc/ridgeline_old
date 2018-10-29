import React from 'react';

import { StyleSheet, Text } from 'react-native';

import { ConfirmPage } from './components/actionsUI/ConfirmPage.js
import { PasscodePage } from './components/actionsUI/PasscodePage.js

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
          animationType: 'none'
          transparent: {true}
          visible: {true}
          presentationStyle: 'overFullScreen'
          style={styles.modal.unlock.container}
        >
        {
          getPasscode && (<PasscodePage next={this.unlockCheck.bind(this)
                            update={this.setPasscode.bind(this)}} />)
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
  modal: {
    unlock: {
      container: {
        backgroundColor: '#e0e0e0',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
      },
    },
  },
});
