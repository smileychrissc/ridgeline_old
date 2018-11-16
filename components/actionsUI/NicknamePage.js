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
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { Language } from '../Language';
import { NavigationPage } from './NavigationPage.js';

/*
 * Page for specifying the user's nickname
 * Props:
 *  nickname - The existing nickname used to pre-populate the control. Can be left undefined
 *  prev - Callback for the previous button press. Can be undefined
 *  next - Callback for the next button press. Can be undefined
 *  cancel - Callback for the cancel button press. Can be undefined
 *  update - Callback for the user entered value. Called as text is changed
 */
export class NicknamePage extends React.Component {
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
    let curNickname = this.props.nickname;
    if ((typeof curNickname != 'string') || (curNickname.length <= 0))
      curNickname = undefined;
    
    return (
      <NavigationPage prev={this.props.prev} next={this.props.next} cancel={this.props.cancel} >
        <View style={styles.container}>
          <Text style={styles.prompt}>{this.strings.prompt.enterNickname}</Text>
          <TextInput style={styles.nickname}
                     autoFocus={true}
                     defaultValue={curNickname}
                     placeholder={this.strings.placeholder.nickname}
                     onChangeText={this.props.update}/>
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
    fontStyle: 'normal',
  },
  nickname: {
    width: 150,
    height: 25,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#808080',
  },
});
