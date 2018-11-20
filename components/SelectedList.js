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
 *  index - The numerical index used for alternating row colors
 *  title - The display text for an item
 *  selected - Optional flag indicating the item is selected (useful in multi-row selection)
 *  alternateColors - Optional flag indicating alternate row coloring scheme is to be used
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
    this.props.onPress(this.props.itemID);
  }
  /*
   * The UI
   */
  render() {
    let viewStyle = (this.props.alternateColors && (index & 1)) ?
                                    styles.alternateBackground : styles.normalBackground;
    let textStyle = this.props.selected ? styles.selectedRow : styles.normalRow;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={viewStyle}>
          <Text style={textStyles}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

/*
 * Displays a selectable list
 * Props:
 *  data - The object data array for the list. Elements must contain fields named 'id' and 'title' for a
 *    unique identifier and display string repectively
 *  alternateColors - Optional flag indicating alternating row colors are to be used when set.
 */
export class SelectionList extends React.Component {
  state = {
    selected: (new Map(): Map<string, boolean>)
  };

  /*
   * Returns the key of an item for the FlatList control
   */
  getKey(item, index) {
    return item.id;
  }
  /*
   * Handles the press on the items list
   */
  onPress(id: string) {
    this.setState((state) => {
      // Copy the map rather than modifying state
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id));
      return {selected};
    });
  };
  /*
   * Returns the UI for an item
   */
  renderItem({item, index: number}) {
    return (
      <ListItem
        index={index}
        itemID={item.id}
        onPress={this.onPress}
        selected={!!this.state.selected.get(item.id)}
        title={item.title}
        alternateColors={this.props.alternateColors}
      />
    );
  }
  /*
   * The UI
   */
  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this.getKey}
        renderItem={this.renderItem}
      />
    );
  }
}

/*
 * The styles for control
 */
const styles = StyleSheet.create({
  alternateBackground: {
    color: 'grey',
  },
  normalBackground: {
    color: 'lightgrey',
  },
  selectedRow: {
    fontSize: 24,
    color: 'darkgrey',
    fontWeight: 'bold',
  },
  normalRow: {
    fontSize: 24,
    color: 'darkgrey',
    fontWeight: 'normal',
  },
});
