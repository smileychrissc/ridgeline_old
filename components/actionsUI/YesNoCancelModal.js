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
import { StyleSheet, View, Text } from 'react-native';

import { Language } from '../Language';
import { NavigationButton } from './NavigationButton.js';

/*
 * Modal for presenting a yes, no, cancel choice
 * Props:
 *   message - optional message string to display. If not defined a default message is displayed
 *   yes - callback for used pressing 'yes' button. Button not shown if not specified
 *   no - callback for used pressing 'no' button. Button not shown if not specified
 *   cancel - callback for used pressing 'cancel' button. Button not shown if not specified
 */
export class YesNoCancelModal extends React.Component {
  /*
   * Prepares instance
   */
  constructor(props) {
    super(props);
    
    this.strings = Language.strings();

    let cancelMessage = this.props.message || this.strings.message.defaultContinue;
    
    this.state = {
      cancelMessage
    };
  }
  /*
   * UI rendering function
   */
  render() {
    return (
        <View style={styles.topView} >
          <Text style={styles.message}>{this.state.cancelMessage}</Text>
          <View style={styles.buttonsView}>
            {
              this.props.yes &&
                (<View style={styles.firstButton}>
                  <NavigationButton
                                  title={this.strings.title.yes}
                                  source={require('../../assets/next.gif')}
                                  action={this.props.yes} />
                </View>)
            }
            {
              this.props.no &&
                  <NavigationButton title={this.strings.title.no}
                                  source={require('../../assets/prev.gif')}
                                  action={this.props.no} />
            }
            {
              this.props.cancel &&
                (<View style={styles.lastButton}>
                  <NavigationButton
                                  title={this.strings.title.cancel}
                                  source={require('../../assets/cancel.gif')}
                                  action={this.props.cancel} />
                </View>)
           }
          </View>
        </View>
    );
  }
}

/*
 * Styles for this modal
 */
const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#e0e0e0',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
  },
  firstButton: {
    marginRight: 20,
  },
  lastButton: {
    marginLeft: 20,
  },
});
