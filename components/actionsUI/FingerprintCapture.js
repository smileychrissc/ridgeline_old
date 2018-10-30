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
import { ActivityIndicator, StyleSheet, Text } from 'react-native';

export class FingerprintCapture extends React.Component {
  render() {
    let instructions = this.props.instructions || 'Place finger on sensor to capture';
    
    return (
    <View>
      {
        this.props.prompt && <Text style={styles.prompt} >this.props.prompt</Text>
      }
      {
        !this.props.captured &&
          (<View>
            <Text style={styles.instructions} >{instructions}</Text>
            <ActivityIndicator size="medium" color='#505050' />
           </View>)
      }
      {
        this.props.message && <Text style={styles.message} >{this.props.message}</Text>
      }
      </View>
    );
  }
}

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
