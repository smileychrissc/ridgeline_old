import React from 'react';

import { StyleSheet, View } from 'react-native';

import { FingerprintCapture } from './components/actionsUI/FingerprintCapture.js'
import { NavigationButton } from './components/actionsUI/NavigationButton.js'

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
      <View style={styles.pages.fingerprintCapture.container}>
        <FingerprintCapture captured=false
                         prompt={prompt}
                         instructions={instructions}
                         message={this.state.message} />
        <NavigationButton source='./assets/cancel.gif' title='Cancel' />
      </View>
   );
  }
}

const styles = StyleSheet.create({
  pages: {
    fingerprintCapture: {
      container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
