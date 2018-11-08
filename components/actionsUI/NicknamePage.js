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

import { NavigationPage } from './NavigationPage.js';

/*
 * Page for specifying the user's nickname
 */
export class NicknamePage extends React.Component {
  /*
   * The UI
   */
  render() {
    return (
      <NavigationPage prev={this.props.prev} next={this.props.next} cancel={this.props.cancel} >
        <View style={styles.container}>
          <Text style={styles.prompt}>Enter your nickname</Text>
          <TextInput style={styles.nickname} placeholder="Your nickname" onChangeText={this.props.update}/>
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
    color: '#202020',
    fontSize: 16,
    fontStyle: 'normal',
  },
  nickname: {
  },
});
