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
 * Select a lock to work on
 */
export class LockSelectPage extends React.Component {
  /*
   * initialize instance
   */
  constructor(props) {
    super(props);
    
    let locks = (props.lockIDs ? props.lockIDs.split(',') : []);
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
        {
          <FlatList data={this.state.locks}
                    renderItem={(item)=>(<Text style={styles.lockID}>{item}</Text>)}
          />
        }
        </View>
      </NavigationPage>
    );
  }
}

/*
 * Styles for the UI
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockID: {
    color: '#303030',
    fontSize: 16,
    fontStyle: 'normal',
  },
});
