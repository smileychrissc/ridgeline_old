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
import { Modal, StyleSheet, Switch, Text } from 'react-native';

import { Language } from '../Language';
import { NavigationPage } from './NavigationPage.js';

/*
 * Settings for the user for all locks
 * Props:
 *  prev - Callback for the previous button press. Can be undefined
 *  next - Callback for the next button press. Can be undefined
 *  cancel - Callback for the cancel button press. Can be undefined
 *  settings - Callback for retrieving the current settings. Callback should return a SettingsInfo instance
 *  update - Callback for receiving the updated settings. Called every time a setting is changed
 */
export class SettingsModal extends React.Component {
  /*
   * Prepares instance
   */
  constructor(props) {
    super(props);
    
    this.settings = this.props.settings();
    
    this.strings = Language.strings();
  }
  /*
   * Updates the auto-save-location value
   */
  setAutoLocation(value) {
    if (value != this.settings.autosaveLocation) {
      this.settings.autosaveLocation = value;
      this.props.update(this.settings);
    }
  }
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
          <NavigationPage prev={this.props.prev} next={this.props.next} cancel={this.props.cancel}>
            <Text style={styles.prompt}>{this.strings.prompt.alwaysSaveLastLocation}</Text>
            <Switch value={this.settings.autosaveLocation}
                    onValueChange={(value) => this.setAutoLocation(value)} />
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
