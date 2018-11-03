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
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export class NavigationButton extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.props.action}>
          <View>
            {
              this.props.title && this.props.direction && (this.props.direction == 'left') &&
                  <Text style={styles.pageButton}>this.props.title</Text>
            }
            <Image source={this.props.source} />
            {
              this.props.title && (!this.props.direction || (this.props.direction != 'left')) &&
                  <Text style={styles.pageButton}>{this.props.title}</Text>
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageButton: {
    color: '#808080',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
  }
});
