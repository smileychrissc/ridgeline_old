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
import { Modal, StyleSheet } from 'react-native';

import { ConfirmPage } from './ConfirmPage.js';
import { Language } from '../Language';
import { LockSelectPage } from './LockSelectPage.js';
import { PasscodePage } from './PasscodePage.js';

const RESET_SELECT_PAGE = 'reset.lock_select';
const RESET_PASSCODE_PAGE = 'reset.passcode';
const RESET_CONFIRM_PAGE = 'reset.confirm';

const pages = [
  RESET_SELECT_PAGE,
  RESET_PASSCODE_PAGE,
  RESET_CONFIRM_PAGE,
];

/*
 * Handles the UI for resetting a lock
 *  lockIDs - A comma separated list of known Lock IDs for display
 *  cancel - Callback for when the user cancels
 *  update - Callback for resetting the lock. Receives the lockID and password as separate parameters
 */
export class ResetModal extends React.Component {
  /*
   * Initialize instance
   */
  constructor(props) {
    super(props);

    this.strings = Language.strings();

    this.state = {
      message: this.strings.message.continueClear,
      curPage: 0,
      passcode: undefined,
      lockID: undefined,
    };

    // Bind functions
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.setLock = this.setLock.bind(this);
    this.setPasscode = this.setPasscode.bind(this);
  }
  /*
   * Displays the previous page
   */
  prevPage() {
    if (this.state.curPage > 0)
      this.setState({curPage: this.state.curPage - 1});
  }
  /*
   * Displays the next page
   */
  nextPage() {
    if (this.state.curPage < pages.length - 1)
      this.setState({curPage: this.state.curPage + 1});
  }
  /*
   * Handles setting the lock ID
   */
  setLock(lockID: string) {
    this.setState({lockID});
  }
  /*
   * Handles settings the passcode
   */
  setPasscode(passcode: string) {
    this.setState({passcode});
  }
  /*
   * Handles wiping the lock
   */
  wipeLock() {
    this.props.update(this.state.lockID, this.state.passcode);

    this.setState({message: this.strings.message.lockCleared});
  }
  /*
   * The UI
   */
  render() {
    let curPage = this.state.curPage;
    if (curPage < 0)
      curPage = 0;
    else if (curPage >= pages.length)
      curPage = pages.length - 1;
    
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
            (pageName == RESET_SELECT_PAGE) &&
                <LockSelectPage nextPage={this.nextPage}
                                update={this.setLock}
                                lockIDs={this.props.lockIDs}
                                cancel={this.props.cancel} />
          }
          {
            (pageName == RESET_PASSCODE_PAGE) &&
                <PasscodePage prevPage={this.prevPage}
                              nextPage={this.nextPage}
                              update={this.setPasscode}
                              cancel={this.props.cancel} />
          }
          {
            (pageName == RESET_CONFIRM_PAGE) &&
                <ConfirmPage prev={this.prevPage}
                             next={this.wipeLock.bind(this)}
                             title={this.state.message} />
          }
        </Modal>
    );
  };
}

/*
 * Styles for this window
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#a0a0a0',
  },
});

