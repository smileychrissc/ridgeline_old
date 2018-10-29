import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { NavigationButton } from './components/actionsUI/NavigationButton.js';

export class NavigationPage extends React.Component {
  render() {
    return (
      <View style={styles.navigation.view}>
        {
          this.props.title && <Text style={styles.navigation.title}>{this.props.title}</Text>
        }
        <View style={styles.navigation.centerView}>
          {
            this.props.prev &&
              <NavigationButton source='./assets/prev.gif' title='Prev' />
          }
          {
            {this.props.children}
          }
          {
            this.props.next &&
              <NavigationButton source='./assets/next.gif' title='Next' direction='left' />
          }
        </View>
        {
          <NavigationButton source='./assets/cancel.gif' title='Cancel' />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigation: {
    view: {
      backgroundColor: '#e0e0e0',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    centerView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  },
});
