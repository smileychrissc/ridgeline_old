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
import { Modal, StyleSheet, Switch, Text } from 'react-native';

import { NavigationPage } from './NavigationPage.js';

export class SettingsModal extends React.Component {
  setAutoLocation(value) {
    //TODO: Set the auto location value
  }
  
  render() {
    return (
        <Modal
          animationType='none'
          transparent={true}
          visible={true}
          presentationStyle='overFullScreen'
          style={styles.container}
        >
          <NavigationPage>
            <Text style={styles.prompt}>Automatically save last location on detected locking</Text>
            <Switch onValueChange={(value) => this.setAutoLocation(value)} />
          </NavigationPage>
        </Modal>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a0a0a0',
  },
  prompt: {
    fontStyle: 'normal',
  },
});
