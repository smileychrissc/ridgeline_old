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

import { NavigationPage } from './NavigationPage.js';

/*
 * Handles the user entering and confirming a password
 */
export class LockPasscodePage extends React.Component {
  /*
   * Initializes instance
   */
  constructor(props) {
    super(props);
    
    this.state = {pw1: undefined, pw2: undefined, error: undefined};
    
    this.checkPassword =  this.checkPassword.bind(this);
    this.password = this.password.bind(this);
    this.passwordConfirm = this.passwordConfirm.bind(this);
  }
  /*
   * Stores the password
   */
  password(password) {
    this.setState({pw1: password, error: undefined});
  }
  /*
   * Stores the password confirmation
   */
  passwordConfirm(password) {
    this.setState({pw2: password, error: undefined});
  }
  /*
   * Checks the passcodes are the same before allowing the user to continue
   */
  checkPassword() {
    if (this.state.pw1.equals(this.state.pw2)) {
      this.props.next(this.state.pw1);
    }
    this.setState({error: 'Passwords need to match'});
  }
  /*
   * The UI
   */
  render() {
    // Add a red border when the passcodes don't match (we don't signal a bad passcode
    // when the first few characters are entered on the confirmation, but let the user
    // get a few characters in)
    let style1 = styles.passcode;
    let style2 = styles.passcode;
    if (this.state.pw1.equals(this.state.pw2)) {
      style1 = passcodeMatch;
      style2 = passcodeMatch;
    } else if (this.state.pw2 && !this.state.pw1.equals(this.state.pw2) &&
        ((this.state.pw2.length >= this.state.pw1.length) || (this.state.pw2.length > 3))) {
      style2 = styles.passcodeMismatch;
    }
    
    return (
      <NavigationPage next={this.checkPasswords}>
        <View style={styles.container}>
          <Text style={styles.prompt}>Enter an optional password for this lock</Text>
          <TextInput style={style1}
                     placeholder="Password"
                     onChangeText={this.props.password} />
          <TextInput style={style2}
                     placeholder="Confirm password"
                     onChangeText={this.props.passwordConfirm} />
          {
            this.state.error &&
                <Text style={styles.errorMessage}>{this.state.error}</Text>
          }
        </View>
      </NavigationPage>
    );
  }
}

/*
 * The styles for this page
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prompt: {
    color: '#202020',
    fontSize: 16,
    fontStyle: 'italic',
  },
  passcode: {
  },
  passcodeMismatch: {
    borderColor: 'red',
    borderWidth: 1
  },
  passcodeMatch: {
    borderColor: 'green',
    borderWidth: 1
  },
  errorMessage: {
    fontSize: 18,
    fontStyle: 'normal',
    color: 'red'
  }
});
