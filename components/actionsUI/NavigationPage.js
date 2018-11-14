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
import { StyleSheet, Text, View } from 'react-native';

import { Language } from '../Language';
import { NavigationButton } from './NavigationButton.js';

/*
 * General navigation page that embeds child controls
 */
export class NavigationPage extends React.Component {
  /*
   * Initialize instance
   */
  constructor(props) {
    super(props);
    
    this.strings = Language.strings();
  }
  /*
   * The UI
   */
  render() {
    return (
      <View style={styles.view}>
        {
          this.props.title && <Text style={styles.title}>{this.props.title}</Text>
        }
        <View style={styles.centerView}>
          {
            this.props.prev &&
              <NavigationButton source={require('../../assets/prev.gif')}
                                title={this.strings.title.previous}
                                action={this.props.prev} />
          }
          {
            this.props.children
          }
          {
            this.props.next &&
              <NavigationButton source={require('../../assets/next.gif')}
                                title={this.strings.title.next}
                                direction='left'
                                action={this.props.next} />
          }
        </View>
        {
          this.props.cancel &&
              <NavigationButton source={require('../../assets/cancel.gif')}
                                title={this.strings.title.navCancel}
                                action={this.props.cancel} />
        }
      </View>
    );
  }
}

/*
 * Styles for navigation controls
 */
const styles = StyleSheet.create({
  view: {
    backgroundColor: '#e0e0e0',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  centerView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
