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
import { Modal, StyleSheet, WebView } from 'react-native';

import Config from '../../Config.js';
import { NavigationPage } from './NavigationPage.js';

/*
 * Privacy policy
 */
export class PrivacyModal extends React.Component {
  /*
   * The UI
   */
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
            <WebView style={styles.prompt}
                     source={{uri: Config.uri.privacyPolicy}} />
          </NavigationPage>
        </Modal>
    );
  };
}

/*
 * Styles for the UI
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a0a0a0',
  },
  prompt: {
    fontStyle: 'normal',
  },
});


