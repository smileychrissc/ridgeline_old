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
 * Displays the number of locks registered
 * Props:
 *  count - The lock count to display. Will default to 'no' if not specified
 */
export class LocksRegisteredText extends React.Component {
  /*
   * The UI
   */
  render() {
    // TODO: format text
    let numLocks = (this.props.count ? '' + this.props.count : 'no');
    return (
      <Text style={styles.registered}>{numLocks} locks registered</Text>
    );
  }
}

/*
 * Styles for the control
 */
const styles = StyleSheet.create({
  registered: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
