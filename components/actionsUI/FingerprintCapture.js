import React from 'react';

import { ActivityIndicator, StyleSheet, Text } from 'react-native';

export class FingerprintCapture extends React.Component {
  render() {
    let instructions = this.props.instructions || 'Place finger on sensor to capture';
    
    return (
      {
        this.props.prompt && <Text style={styles.fingerprintCapture.prompt} >{this.props.prompt}</Text>
      }
      {
        !this.props.captured &&
          (<Text style={styles.fingerprintCapture.instructions} >{instructions}</Text>
           <ActivityIndicator size="medium" color='#505050' />)
      }
      {
        this.props.message && <Text style={styles.fingerprintCapture.message} >{this.props.message}</Text>
      }
    );
  }
}

const styles = StyleSheet.create({
  fingerprintCapture: {
    prompt: {
      textStyle: 'normal',
    },
    instructions: {
      textStyle: 'normal',
    },
    message: {
      textStyle: 'normal',
    },
  },
});
