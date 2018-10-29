
import React from 'react';
import { Modal, StyleSheet, Switch, Text } from 'react-native';

import { NavigationPage } from './components/actionUI/NavigationPage.js';

export class ProblemModal extends React.Component {
  render() {
    return (
        <Modal
          animationType: 'none'
          transparent: {true}
          visible: {true}
          presentationStyle: 'overFullScreen'
          style={styles.modal.problem.container}
        >
          <NavigationPage>
            <WebView style={styles.modal.privacy.prompt}
                     source={{uri: 'https://github.com/facebook/react-native'}} />
          </NavigationPage>
        </Modal>
    );
  };
}

const styles = StyleSheet.create({
  modal: {
    problem: {
      container: {
        backgroundColor: '#a0a0a0',
      },
      prompt: {
        fontStyle: 'normal',
      },
    },
  },
});

