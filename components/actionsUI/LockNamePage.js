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
 * Page for naming a lock
 */
export class LockNamePage extends React.Component {
  /*
   * Initialize instance
   */
  constructor(props) {
    super(props);
    
    this.strings = Language.strings();
  }
  /*
   * The UI
   */
  render() {
    let curName = this.props.name;
    if ((typeof curName != 'string') || (curName.length <= 0))
      curName = undefined;
    
    return (
      <NavigationPage prev={this.props.prev} next={this.props.next} cancel={this.props.cancel} >
        <View style={styles.container}>
          <Text style={styles.prompt}>{this.strings.prompt.lockName}</Text>
          <TextInput style={styles.name}
                     autoFocus={true}
                     defaultValue={curName}
                     placeholder={this.strings.placeholder.lockName}
                     onChangeText={this.props.update} />
        </View>
      </NavigationPage>
    );
  }
}

/*
 * Styles for this page
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
});

