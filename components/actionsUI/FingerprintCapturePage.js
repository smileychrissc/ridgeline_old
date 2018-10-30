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
import { StyleSheet, View } from 'react-native';

import { FingerprintCapture } from './FingerprintCapture.js';
import { NavigationButton } from './NavigationButton.js';

export class FingerprintCapturePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numberCaptures: 0,
      message: undefined,
    };
  }
  
  didCapture() {
    let numberCaptures = this.state.numberCaptures + 1;
    this.setState({'numberCaptures': numberCaptures});
  }
  
  setMessage(message: string) {
    if ((typeof message != 'string') || (message.trim().length <= 0)) {
      this.setState({'message': undefined});
    } else {
      this.setState({message});
    }
  }
  
  resetCapture() {
    this.setState({numberCaptures: 0});
  }
  
  render() {
    let prompt = 'Capturing ' + (this.state.numberCaptures + 1) + ' out of ' + this.state.maxCapture;
    let instructions = (this.state.numberCaptures == 0) ?
                            'Place finger on sensor' : 'Place same finger on sensor again';
    return (
      <View style={styles.container}>
        <FingerprintCapture captured={false}
                         prompt={prompt}
                         instructions={instructions}
                         message={this.state.message} />
        <NavigationButton source='./assets/cancel.gif' title='Cancel' />
      </View>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
