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
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/*
 * Displays a list item and reacts to a touch/press event
 * Props:
 *  onPress - Callback for when the user presses on the item. The itemID is passed as  parameter
 *  itemID - The ID of this particular item
 *  title - The display text for an item
 *  selected - Flag indicating the item is selected
 */
class ListItem extends React.Component {
  /*
   * Initialize instance
   */
  constructor(props) {
    super(props);
    
    this.onPress = this.onPress.bind(this);
  }
  /*
   * Callback for when the user presses on our control. Calls the regstered callback
   */
  onPress() {
    this.props.onPressItem(this.props.itemID);
  }
  /*
   * The UI
   */
  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={}>
          <Text style={}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

/*
 * Displays a selectable list
 */
export class SelectionList extends React.Component {
  /*
   * The UI
   */
  render() {
  }
}

/*
 * The styles for control
 */
const styles = StyleSheet.create({
  highlight: {
    fontSize: 24,
    color: '#c53e34',
    fontWeight: 'bold',
  },
  normal: {
    fontSize: 24,
    color: '#c53e34',
    fontWeight: 'bold',
  },
});
