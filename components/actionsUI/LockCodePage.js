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
import { Utils } from '../../Utils';

/*
 * Class for allowing the user to enter a lock code
 */
export class LockCodePage extends React.Component {
  /*
   * Initialize instance
   */
  constructor(props) {
    super(props);
    
    this.state = {error: undefined};
    
    // Make the strings locally available instead of method calls
    this.strings = Language.strings();
    this.code = this.props.defaultID;
    
    // Bind functions
    this.checkCode = this.checkCode.bind(this);
    this.codeUpdate = this.codeUpdate.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }
  /*
   * Keeps track of the new code
   */
  codeUpdate(newCode: string) {
    this.code = newCode;
    if (this.state.error) {
      this.setState({error: undefined});
    }
  }
  /*
   * Verifies the new code
   */
  checkCode() {
    // TODO: Expand code validation
    if ((typeof this.code != 'string') || (this.code.length < 4)) {
      this.setState({error: this.strings.message.codeEnter});
      return;
    }
    // Basic check: look for the code in the list of IDs passed in
    if (Utils.findInList(this.code, this.props.lockIDs)) {
      this.setState({error: this.strings.message.codeDuplicate});
      return;
    }
    // We're good
    this.props.update(this.code);
    this.props.next();
  }
  /*
   * Stores the code for later retrieval
   */
  prevPage() {
    this.props.update(this.code);
    this.props.prev();
  }
  /*
   * The UI
   */
  render() {
    let curCode = this.code;
    if ((typeof curCode != 'string') || (curCode.length <= 0))
      curCode = undefined;
    
    return (
      <NavigationPage prev={this.prevPage} next={this.checkCode} cancel={this.props.cancel} >
        <View style={styles.container}>
          <Text style={styles.prompt}>{this.strings.prompt.enterCode}</Text>
          <TextInput style={styles.name}
                     autoFocus={true}
                     defaultValue={curCode}
                     placeholder={this.strings.placeholder.lockCode}
                     onChangeText={this.codeUpdate} />
        {
          this.state.error && <Text style={styles.error}>{this.state.error}</Text>
        }
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
    color: '#303030',
    fontSize: 16,
    fontStyle: 'italic',
  },
  name: {
    width: 150,
    height: 25,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#808080',
  },
  error: {
    color: 'red',
    fontSize: 14,
    fontStyle: 'normal',
    marginTop: 10,
  },
});


