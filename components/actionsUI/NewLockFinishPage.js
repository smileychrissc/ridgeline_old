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
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Language } from '../Language';
import { NavigationPage } from './NavigationPage.js';

/*
 * Page for confirming that data for a new lock was entered
 * Props:
 *  finished - Set if the lock has finished being added
 *  prev - Callback for the previous button press. Can be undefined
 *  next - Callback for the next button press. Can be undefined
 *  cancel - Callback for the cancel button press. Can be undefined
 */
export class NewLockFinishPage extends React.Component {
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
      <NavigationPage prev={this.props.prev} next={this.props.next} cancel={this.props.cancel} >
        <View style={styles.container}>
          {
            !this.props.finished &&
              (<View>
                 <Text style={styles.prompt}>{this.strings.prompt.newLockFinish}</Text>
                 <ActivityIndicator size="large" color='#505050' />
               </View>
              )
          }
          {
           this.props.finished &&
              (<View>
                 <Text style={styles.success}>{this.strings.prompt.success}</Text>
                 <Text style={styles.nextStep}>{this.strings.prompt.newLockFingerprints}</Text>
               </View>
              )
          }
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
  prompt: {
    color: '#303030',
    fontSize: 20,
    fontStyle: 'normal',
  },
  success: {
    color: '#207f20',
    fontSize: 24,
    fontStyle: 'normal',
  },
});



