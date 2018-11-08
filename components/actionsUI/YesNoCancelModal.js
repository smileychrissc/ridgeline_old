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
import { Modal, StyleSheet, View, Text } from 'react-native';

import { NavigationButton } from './NavigationButton.js';

/*
 * Modal for presenting a yes, no, cancel choice
 */
export class YesNoCancelModal extends React.Component {
  /*
   * Prepares instance
   */
  constructor(props) {
    super(props);
    
    let cancelMessage = this.props.cancelMessage || "Do you want to continue";
    
    this.state = {
      cancelMessage
    };
  }
  /*
   * UI rendering function
   */
  render() {
    return (
      <Modal
        animationType='none'
        transparent={true}
        visible={true}
        presentationStyle='overFullScreen'
        style={styles.yesNoCancelModal}
      >
      <View style={styles.topView} >
        <Text style={styles.message}>{this.state.cancelMessage}</Text>
        <View style={styles.buttonsView}>
          {
            this.props.yes &&
                <NavigationButton title="Yes"
                                  source={require('../../assets/next.gif')}
                                  action={this.props.yes} />
          }
          {
            this.props.no &&
                <NavigationButton title="No"
                                  source={require('../../assets/prev.gif')}
                                  action={this.props.no} />
          }
          {
            this.props.cancel &&
                <NavigationButton title="Cancel"
                                  source={require('../../assets/cancel.gif')}
                                  action={this.props.cancel} />
          }
        </View>
      </View>
      </Modal>
    );
  }
}

/*
 * Styles for this modal
 */
const styles = StyleSheet.create({
  yesNoCancelModal: {
    backgroundColor: '#ff8484',
  },
  topView: {
    backgroundColor: '#e0e0e0',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    backgroundColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
