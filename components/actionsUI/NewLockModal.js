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
import { Modal, StyleSheet } from 'react-native';

import LockInfo from '../../LockInfo.js';

import { NicknamePage } from './NicknamePage.js';
import { LockCodePage } from './LockCodePage.js';
import { LockNamePage } from './LockNamePage.js';
import { LockPasscodePage } from './LockPasscodePage.js';
import { NewLockFinishPage } from './NewLockFinishPage.js';

// Tags for different pages
const NICKNAME_PAGE        = 'lock.nickname';
const LOCK_CODE_PAGE       = 'lock.code';
const LOCK_NAME_PAGE       = 'lock.name';
const LOCK_PASSCODE_PAGE   = 'lock.passcode';
const NEW_LOCK_FINISH_PAGE = 'lock.newFinish';

/*
 * Ordered list of pages to show
 */
const pages = [
  NICKNAME_PAGE,
  LOCK_CODE_PAGE,
  LOCK_NAME_PAGE,
  LOCK_PASSCODE_PAGE,
  NEW_LOCK_FINISH_PAGE,
];

/*
 * Class allowing users to add a new lock to their list of locks
 * Props:
 *   update - Function to call when user has completed entering their data
 *   nickname - The user's nickname
 *   lockIDs - The list of currently known lock IDs
 */
export class NewLockModal extends React.Component {
  /*
   * Initialization of instance
   */
  constructor(props) {
    super(props);
    
    let errorMsg = undefined;
    if (typeof props.update != 'function') {
      // TODO: Report error
      errorMsg = 'Internal Error';
    }
    
    // Setup the state. The first page we show is the user's nickname if we don't have one
    // already
    this.state = {
      curPage: ((typeof this.props.nickname == 'string') && (this.props.nickname.length > 0)) ? 1 : 0,
      nickname: this.props.nickname,
      finished: false,
      errorMsg,
    };
    
    // Bind callback functions
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.registerNewLock = this.registerNewLock.bind(this);
    this.updateLockID = this.updateLockID.bind(this);
    this.updateLockName = this.updateLockName.bind(this);
    this.updateLockPasscode = this.updateLockPasscode.bind(this);
    this.updateNickname = this.updateNickname.bind(this);
  }
  /*
   * Determines when a state change can update the UI
   */
  shouldComponentUpdate(nextProps, nextState) {
    // Only update if we have a new page
    return (
            (this.state.curPage != nextState.curPage) ||
            (this.state.finished != nextState.finished)
           );
  }
  /*
   * Navigate to the previous page
   */
  prevPage() {
    let curPage = this.state.curPage;
    
    if (curPage > 0)
      this.setState({curPage: curPage - 1});
  }
  /*
   * Navigate to the next page
   */
  nextPage() {
    let curPage = this.state.curPage;

    if (curPage < pages.length - 1)
      this.setState({curPage: curPage + 1});
  }
  /*
   * Handles registering the new lock
   */
  registerNewLock() {
    this.setState({finished: false});
    this.nextPage();
    
    // Gather the information and register the new lock
    let newLockInfo = LockInfo.create(this.state.lockID, this.state.lockName, this.state.passcode);
    if ((typeof this.state.nickname == 'string') && (this.state.nickname != this.props.nickname))
      newLockInfo.nickname = this.state.nickname;

    // Delay the update of the lock info so that the UI has a chance to update
    setTimeout(() => {
        this.props.update(newLockInfo);
    
        this.setState({finished: true});
      }, 200);
  }
  /*
   * Update the user's nickname
   */
  updateNickname(nickname: string) {
    this.setState({nickname});
    return true;
  }
  /*
   * Update the lock ID
   */
  updateLockID(lockID: string) {
    this.setState({lockID});
    return true;
  }
  /*
   * Update the lock name
   */
  updateLockName(lockName: string) {
    this.setState({lockName});
    return true;
  }
  /*
   * Update the lock passcode
   */
  updateLockPasscode(passcode: string) {
    this.setState({passcode});
    return true;
  }
  /*
   * The UI to show
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
          style={styles.newLockModal}
        >
          {
            (pageName == NICKNAME_PAGE) &&
                <NicknamePage next={this.nextPage}
                              update={this.updateNickname}
                              cancel={this.props.cancel} />
          }
          {
            (pageName == LOCK_CODE_PAGE) &&
                <LockCodePage lockIDs={this.props.lockIDs}
                                prev={this.prevPage}
                                next={this.nextPage}
                                update={this.updateLockID}
                                cancel={this.props.cancel} />
          }
          {
            (pageName == LOCK_NAME_PAGE) &&
                <LockNamePage prev={this.prevPage}
                              next={this.nextPage}
                              update={this.updateLockName}
                              cancel={this.props.cancel} />
          }
          {
            (pageName == LOCK_PASSCODE_PAGE) &&
                <LockPasscodePage prev={this.prevPage}
                              next={this.registerNewLock}
                              update={this.updateLockPasscode}
                              cancel={this.props.cancel} />
          }
          {
            (pageName == NEW_LOCK_FINISH_PAGE) &&
                <NewLockFinishPage prev={this.prevPage}
                                   finished={this.state.finished}
                                   cancel={this.props.cancel} />
          }
        </Modal>
    );
  }
}

/*
 * Styles for this modal
 */
const styles = StyleSheet.create({
  newLockModal: {
    backgroundColor: '#a0a0a0',
  },
});
