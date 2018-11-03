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

export class ConfirmPage extends React.Component {
  render() {
    return (
      <NavigationPage>
        <View style={styles.container}>
          <Text style={styles.prompt}>{this.props.title}</Text>
          <Text style={styles.hint}>Press next to continue</Text>
        </View>
      </NavigationPage>
    );
  }
}

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
  hint: {
  },
});




