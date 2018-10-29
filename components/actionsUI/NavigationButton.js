import React from 'react'

import { Image, StyleSheet, Text } from 'react-native';

export class NavigationButton extends React.Component {
  render() {
    {
      this.props.title && this.props.direction && (this.props.direction == 'left') &&
          <Text style={styles.navigation.pageButton}>{this.props.title}</Text>
    }
    <Image source={require({this.props.source})}) />
    {
      this.props.title && (!this.props.direction || (this.props.direction != 'left') &&
          <Text style={styles.navigation.pageButton}>{this.props.title}</Text>
    }
  }
}

const styles = StyleSheet.create( {
  navigation: {
    pageButton: {
      color: '#808080',
      fontSize: 12,
      fontWeight: 'normal',
      fontStyle: 'normal',
    }
  }
});
