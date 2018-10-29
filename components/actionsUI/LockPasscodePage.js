import React from 'react';

import { StyleSheet, Text } from 'react-native';

import { NavigationPage } from './components/actionUI/NavigationPage.js';

export class LockPasscodePage extends NavigationPage {
  render() {
    return (
      <NavigationPage>
        <View style={styles.pages.lockpasscode.container}>
          <Text style={styles.pages.lockpasscode.prompt}>Enter an optional password for this lock</Text>
          <TextInput style={styles.pages.lockpasscode.passcode} placeholder="Password" />
          <TextInput style={styles.pages.lockpasscode.passcode} placeholder="Confirm password" />
        </View>
      </NavigationPage>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    lockpasscode: {
      container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      prompt: {
        color: '#202020',
        fontSize: 16,
        fontStyle: 'italic',
      },
      passcode: {
      }
    },
  },
});


