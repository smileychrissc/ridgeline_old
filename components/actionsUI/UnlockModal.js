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
import { StyleSheet, Text } from 'react-native';

import { ConfirmPage } from './ConfirmPage.js';
import { LockSelectPage } from './LockSelectPage.js';
import { PasscodePage } from './PasscodePage.js';

const UNLOCK_SELECT_PAGE = 'unlock.select';
const UNLOCK_PASSCODE_PAGE = 'unlock.passcode';
const UNLOCK_CONFIRM_PAGE = 'unlock.confirm';

/*
 * Pages we're displaying in the order of display
 */
let pages = [
  UNLOCK_SELECT_PAGE,
  UNLOCK_PASSCODE_PAGE,
  UNLOCK_CONFIRM_PAGE,
];

/*
 * Handles the user wanting to unlock a lock
 */
export class UnlockModule extends React.Component {
  /*
   * Initialize this instance
   */
  constructor(props) {
    let curLock = undefined;
    
    super(props);
    
    if (this.props.lockIDs && (this.props.lockIDs.indexOf(',') == -1))
      curLock = this.props.lockIDs;
    
    this.state = {
      lockID: curLock,      // The lock to unlock
      multiLocks: (curLock == undefined ? true : false), // Convienience variable for when multiple lock IDs are passed in
      passcode: undefined,  // The passcode for the lock
      curPage: (curLock == undefined ? 0 : 1), // Index of unlocking page to show
    }
    
    this.getPasscode = this.getPasscode.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.setLock = this.setLock.bind(this);
    this.unlock = this.unlock.bind(this);
  }
  /*
   * Shows the next page
   */
  nextPage() {
    if (this.state.curPage < pages.length - 1)
      this.setState({curPage: this.state.curPage + 1});
  }
  /*
   * Shows the previous page
   */
  prevPage() {
    if ((this.state.curPage > 1) ||
        ((this.state.curPage == 1) && this.state.multiLocks)) {
      this.setState({curPage: this.state.curPage - 1});
    }
  }
  /*
   * Stores the user entered passcode
   * passcode - the user entered passcode
   */
  setPasscode(passcode) {
    this.setState({passcode});
  }
  /*
   * Sets the user selected lock ID when we have multiple lock IDs
   * lockID - the selected lock ID
   */
  setLock(lockID: string) {
    this.setState({lockID});
  }
  /*
   * Checks the unlock condition before performing the action
   */
  unlock() {
    // TODO: Handle errors
    this.props.update(this.state.lockID, this.state.passcode);
  }
  /*
   * The UI
   */
  render() {
    let curPage = this.state.curPage;
    
    if ((curPage < 0) || (curPage >= pages.length)) {
      // TODO: Report error
      if (curPage < 0) curPage = 0;
      if (curPage >= pages.length) curPage = pages.length - 1;
    }
    
    let pageName = pages[curPage];
    return (
        <Modal
          animationType='none'
          transparent={true}
          visible={true}
          presentationStyle='overFullScreen'
          style={styles.container}
        >
        {
          (pageName == UNLOCK_SELECT_PAGE) &&
              <LockSelectPage next={this.nextPage}
                              update={this.setLock}
                              cancel={this.props.cancel} />
        }
        {
          (pageName == UNLOCK_PASSCODE_PAGE) &&
              <PasscodePage prev={this.state.multiLocks ? this.prevPage : undefined}
                            next={this.nextPage}
                            update={this.setPasscode}
                            cancel={this.props.cancel} />
        }
        {
          (pageName == UNLOCK_CONFIRM_PAGE) &&
              <ConfirmPage title='Press next to unlock'
                           prev={this.prevPage}
                           next={this.unlock}
                           cancel={this.props.cancel} />
        }
      </Modal>
    );
  }
}

/*
 * Styles used by this class
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
