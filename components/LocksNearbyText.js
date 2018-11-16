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
 * Displays the number of nearby locks
 * Props:
 *  count - The number of locks nearby
 */
export class LocksNearbyText extends React.Component {
  /*
   * The UI
   */
  render() {
    // TODO: format text
    if (this.props.count > 0)
      return (
        <Text style={styles.detected}>{this.props.count} locks are nearby</Text>
      );
    else
      return null;
  }
}

/*
 * Styles for this control
 */
const styles = StyleSheet.create({
  detected: {
    fontSize: 14,
    color: 'orangered',
  },
});
