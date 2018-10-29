import React from 'react';
import { StyleSheet, Text } from 'react-native';

export class WelcomeText extends React.Component {
  render() {
    let msg = "Welcome";
    if (!this.props.firstVisit)
      msg += " back";
    if (this.props.user)
      msg += " " + this.props.user;
    msg += "!";
    return (
        <Text style={styles.welcome}>{msg}</Text>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 24,
    color: '#c53e34',
    fontWeight: 'bold',
  },
});
