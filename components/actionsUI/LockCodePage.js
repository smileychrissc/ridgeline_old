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
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Language } from '../Language';
import { NavigationPage } from './NavigationPage.js';

/*
 * Class for allowing the user to enter a lock code
 */
export class LockCodePage extends React.Component {
  /*
   * Initialize instance
   */
  constructor(props) {
    super(props);
    
    this.state = {message: undefined};
    
    // Make the strings locally available instead of method calls
    this.strings = Language.strings();
    this.code = undefined;
    
    // Bind functions
    this.codeUpdate = this.codeUpdate.bind(this);
    this.checkCode = this.checkCode.bind(this);
  }
  /*
   * Keeps track of the new code
   */
  codeUpdate(newCode: string) {
    this.code = newCode;
    if (this.state.message) {
      this.setState({message: undefined});
    }
  }
  /*
   * Verifies the new code
   */
  checkCode() {
    // TODO: Expand code validation
    if ((typeof this.code == 'string') && (this.code.length >= 4)) {
      this.props.update(this.code);
      this.props.next();
    } else {
      this.setState({message: this.strings.message.enterCode});
    }
  }
  /*
   * The UI
   */
  render() {
    return (
      <NavigationPage prev={this.props.prev} next={this.checkCode} cancel={this.props.cancel} >
        <View style={styles.container}>
          {
            this.state.message && <Text style={styles.message}>{this.state.message}</Text>
          }
          <Text style={styles.prompt}>{this.strings.prompt.enterCode}</Text>
          <TextInput style={styles.name}
                     placeholder={this.strings.placeholder.lockCode}
                     onChangeText={this.codeUpdate} />
        </View>
      </NavigationPage>
    );
  }
}

/*
 * Styles for the UI
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
  name: {
    width: 150,
    height: 25,
    marginTop: 10,
    borderWidth: 1,
  },
  message: {
    color: 'red',
    fontSize: 16,
    fontStyle: 'normal',
  },
});


