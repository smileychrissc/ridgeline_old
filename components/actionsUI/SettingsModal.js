
import React from 'react';
import { Modal, StyleSheet, Switch, Text } from 'react-native';

import { NavigationPage } from './components/actionUI/NavigationPage.js';

export class SettingsModal extends React.Component {
  setAutoLocation(value) {
    //TODO: Set the auto location value
  }
  
  render() {
    return (
        <Modal
          animationType: 'none'
          transparent: {true}
          visible: {true}
          presentationStyle: 'overFullScreen'
          style={styles.modal.settings.container}
        >
          <NavigationPage>
            <Text style={styles.modal.settings.prompt}>Automatically save last location on detected locking</Text>
            <Switch onValueChange={(value) => this.setAutoLocation(value)} />
          </NavigationPage>
        </Modal>
    );
  };
}

const styles = StyleSheet.create({
  modal: {
    settings: {
      container: {
        backgroundColor: '#a0a0a0',
      },
      prompt: {
        fontStyle: 'normal',
      },
    },
  },
});
