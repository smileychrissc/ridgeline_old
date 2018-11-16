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
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/*
 * Button used for navigation displaying an image and text
 * Props:
 *  action - Callback for when the button is pressed
 *  title - The text to display near the image
 *  direction - Displays to the left of the image if 'left' specified. Will have no result
 *              on left-to-right languages
 *  source - The source URI of the image
 */
export class NavigationButton extends React.Component {
  /*
   * The UI
   */
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.props.action}>
          <View style={styles.button} >
            {
              this.props.title && this.props.direction && (this.props.direction == 'left') &&
                  <Text style={styles.pageButton}>{this.props.title}</Text>
            }
            <Image source={this.props.source} style={styles.image} />
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

/*
 * Styles for the control
 */
const styles = StyleSheet.create({
  pageButton: {
    color: '#808080',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginLeft: 5,
    marginRight: 5,
  },
});
