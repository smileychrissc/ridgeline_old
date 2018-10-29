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
