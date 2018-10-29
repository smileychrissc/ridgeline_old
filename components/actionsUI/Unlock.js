import React from 'react';
import { Button, StyleSheet } from 'react-native';

export class Unlock extends React.Component {
  render() {
    return (
        <Button title={this.props.title}
            accessibilityLabel={this.props.accessibilityLabel}
            onPress={this.props.onPress}
        />
    );
  }
}
