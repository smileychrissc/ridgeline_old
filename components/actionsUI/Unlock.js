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
import { Button, StyleSheet } from 'react-native';

/*
 * The UI control for unlocking locked locks
 */
export class Unlock extends React.Component {
  /*
   * The UI
   */
  render() {
    return (
        <Button title={this.props.title}
            accessibilityLabel={this.props.accessibilityLabel}
            onPress={this.props.onPress}
        />
    );
  }
}
