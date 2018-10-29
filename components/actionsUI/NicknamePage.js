import React from 'react';

import { StyleSheet, Text } from 'react-native';

import { NavigationPage } from './components/actionUI/NavigationPage.js';

export class NicknamePage extends NavigationPage {
  render() {
    return (
      <NavigationPage>
        <View style={styles.pages.nickname.container}>
          <Text style={styles.pages.nickname.prompt}>Enter your nickname</Text>
          <TextInput style={styles.pages.nickname.nickname} placeholder="Your nickname" />
        </View>
      </NavigationPage>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    nickname: {
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
      }
    },
  },
});
