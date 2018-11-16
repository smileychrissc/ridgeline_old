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
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Language } from '../Language';

/*
 * Basic interface for capturing fingerprints
 * Props:
 *  instructions - Directions for the user. Default instructions will be used if not specified
 *  prompt - Prompting text for user for current stage of fingerprint capture
 *  captured - Flag used to indicate state of pending fingerprint capture. False indicates not captured yet
 *  message - Optional message to display for the user
 */
export class FingerprintCapture extends React.Component {
  /*
   * Initialize instance
   */
  constructor(props) {
    super(props);
    
    this.strings = Language.strings();
  }
  /*
   * The UI
   */
  render() {
    let instructions = this.props.instructions || this.strings.prompt.fingerOnSensorDefault;
    
    return (
    <View>
      {
        this.props.prompt && <Text style={styles.prompt} >{this.props.prompt}</Text>
      }
      {
        !this.props.captured &&
          (<View>
            <Text style={styles.instructions} >{instructions}</Text>
            <ActivityIndicator size='small' color='#505050' />
           </View>)
      }
      {
        this.props.message && <Text style={styles.message} >{this.props.message}</Text>
      }
      </View>
    );
  }
}

/*
 * Styles for this component
 */
const styles = StyleSheet.create({
  prompt: {
    fontStyle: 'normal',
  },
  instructions: {
    fontStyle: 'normal',
  },
  message: {
    fontStyle: 'normal',
  },
});
