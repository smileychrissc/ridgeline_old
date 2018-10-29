import React from 'react';

import { StyleSheet, Text } from 'react-native';

import { NavigationPage } from './components/actionUI/NavigationPage.js';

export class ConfirmPage extends NavigationPage {
  render() {
    return (
      <NavigationPage>
        <View style={styles.pages.confirm.container}>
          <Text style={styles.pages.confirm.prompt}>{this.props.title}</Text>
          <Text style={styles.pages.confirm.hint>}>Press next to continue</Text>
        </View>
      </NavigationPage>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    confirm: {
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
      }
    },
  },
});




