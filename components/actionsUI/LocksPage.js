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
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { NavigationPage } from './NavigationPage.js';

/*
 * Displays the names of the locks
 */
export class LocksPage extends React.Component {
  /*
   * Initialize instance
   */
  constructor(props) {
    super(props);
    
    // Get the lock names
    let locks = [];
    if (typeof props.locks == "function") {
      let curLocks = props.locks();
      
      curLocks.forEach((lock, index) => {
        if (typeof lock.name == "string") {
          locks.push(lock.name);
        } else if (typeof lock.code == "string" ){
          locks.push(lock.code);
        } else {
          locks.push("Lock " + index);
        }
      });
    }
    
    this.state = {
      locks,
    };
  }
  /*
   * The UI
   */
  render() {
    return (
      <NavigationPage prev={this.props.prev} next={this.props.next} cancel={this.props.cancel} >
        <View style={styles.container}>
          <FlatList data={this.state.locks}
                    render={({item}) => <Text style={styles.lockList}>{item}</Text>} />
        </View>
      </NavigationPage>
    );
  }
}

/*
 * The styles for this page
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockList: {
    fontSize: 18,
  },
});
