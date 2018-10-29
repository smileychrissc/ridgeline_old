import React from 'react';

import { StyleSheet, Text } from 'react-native';

import { NavigationPage } from './components/actionUI/NavigationPage.js';

export class LockNamePage extends NavigationPage {
  render() {
    return (
      <NavigationPage>
        <View style={styles.pages.lockname.container}>
          <Text style={styles.pages.lockname.prompt}>Enter an optional name for this lock</Text>
          <TextInput style={styles.pages.lockname.name} placeholder="Lock name" />
        </View>
      </NavigationPage>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    lockname: {
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
      name: {
      }
    },
  },
});

