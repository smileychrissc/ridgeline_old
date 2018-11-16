/*
 * Copyright 2018 Chris Schnaufer All Rights Reserved
 * Permissions are granted under: GNU Affero General Public License v3.0.
 * The contents of this file heading may not be modified and must be included
 * in full with any and all distributions of this file and any derived product
 * regardless of any other modifications.
 * Use of this file or derived products in any form for illegal activities or
 * for purposes that can reflect negatively on the original copyright holder(s)
 * are prohibited.
 */
import React from 'react';
import { StyleSheet, Text } from 'react-native';

/*
 * Displays welcome text
 * Props:
 *  firstVisit - Flag indicating this is the first visit for the user
 *  user - The known user's name. Can be undefined
 */
export class WelcomeText extends React.Component {
  /*
   * The UI
   */
  render() {
    // TODO: format message
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

/*
 * The styles for control
 */
const styles = StyleSheet.create({
  welcome: {
    fontSize: 24,
    color: '#c53e34',
    fontWeight: 'bold',
  },
});
