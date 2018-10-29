import React from 'react';
import { StyleSheet, Text } from 'react-native';

export class LocksRegisteredText extends React.Component {
  render() {
    let numLocks = (this.props.count ? '' + this.props.count : 'no');
    return (
      <Text style={styles.registered}>{numLocks} locks registered</Text>
    );
  }
}

const styles = StyleSheet.create({
  registered: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
