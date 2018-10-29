import React from 'react';

import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { NavigationPage } from './components/actionUI/NavigationPage.js';

export class NewLockFinishPage extends NavigationPage {
  render() {
    return (
      <NavigationPage>
        <View style={styles.pages.newlockfinish.container}>
          {
            (!this.props.finished) &&
              (<Text style={styles.pages.newlockfinish.prompt}>Preparing your new lock</Text>
               <ActivityIndicator size="large" color='#505050' />
              )
          }
          {
           (this.props.finished) &&
              (<Text style={styles.pages.newlockfinish.success}>Success!</Text>
               <Text style={styles.pages.newlockfinish.nextStep}>You will now register a fingerprint for unlocking</Text>
              )
          }
        </View>
      </NavigationPage>
    );
  }
}

const styles = StyleSheet.create({
  pages: {
    newlockfinish: {
      container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      prompt: {
        color: '#202020',
        fontSize: 20,
        fontStyle: 'normal',
      },
      success: {
        color: '#207f20',
        fontSize: 24,
        fontStyle: 'normal',
      }
    },
  },
});



