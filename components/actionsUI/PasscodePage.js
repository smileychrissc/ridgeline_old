import React from 'react';

import { StyleSheet, Text } from 'react-native';

import { NavigationPage } from './components/actionUI/NavigationPage.js';

export class PasscodePage extends NavigationPage {
  render() {
    return (
      <NavigationPage>
        <View style={styles.pages.passcode.container}>
          <Text style={styles.pages.passcode.prompt}>Enter the lock password</Text>
          <TextInput style={styles.pages.passcode.passcode} placeholder="Password" />
        </View>
      </NavigationPage>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    passcode: {
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



