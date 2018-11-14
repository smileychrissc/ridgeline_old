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

import { Language } from '../Language';
import { FingerprintCapture } from './FingerprintCapture.js';
import { NavigationPage } from './NavigationPage.js';

/*
 * Page for capturing fingerprints
 */
export class FingerprintCapturePage extends React.Component {
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
    // TODO: Formatting strings
    let prompt = 'Capturing ' + (this.props.captured + 1) + ' out of ' + this.props.fingerprints;
    let instructions = (this.props.captured == 0) ?
                            this.strings.prompt.fingerOnSensor :
                                            this.strings.prompt.fingerOnSensorAgain;
    return (
      <NavigationPage prev={this.props.prev} next={this.props.next} cancel={this.props.cancel} >
        <FingerprintCapture prompt={prompt}
                         instructions={instructions} />
      </NavigationPage>
   );
  }
}
