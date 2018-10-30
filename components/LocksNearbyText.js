/*
 * Copyright 2018 Chris Schnaufer All Rights Reserved
 * Permissions are granted under: GNU Affero General Public License v3.0.
 * The contents of this file heading may not be modified and must be included
 * in full with any and all distributions of this file and any derived product
 * regardless of any modifications.
 * Use of this file or derived products in any form for illegal activities or
 * for purposes that can reflect negatively on the original copyright holder(s)
 * are prohibited.
 */
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export class LocksNearbyText extends React.Component {
  render() {
    if (this.props.count > 0)
      return (
        <Text style={styles.detected}>{this.props.count} locks are nearby</Text>
      );
    else
      return null;
  }
}

const styles = StyleSheet.create({
  detected: {
    fontSize: 14,
    color: 'orangered',
  },
});
