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

import { NicknamePage } from './NicknamePage.js';
import { LockSelectPage } from './LockSelectPage.js';
import { LockNamePage } from './LockNamePage.js';
import { LockPasscodePage } from './LockPasscodePage.js';
import { NewLockFinishPage } from './NewLockFinishPage.js';

const NICKNAME_PAGE        = 'lock.nickname';
const LOCK_SELECT_PAGE     = 'lock.select';
const LOCK_NAME_PAGE       = 'lock.name';
const LOCK_PASSCODE_PAGE   = 'lock.passcode';
const NEW_LOCK_FINISH_PAGE = 'lock.newFinish';

const page = [
  NICKNAME_PAGE,
  LOCK_SELECT_PAGE,
  LOCK_NAME_PAGE,
  LOCK_PASSCODE_PAGE,
  NEW_LOCK_FINISH_PAGE,
];

export class NewLockModal extends React.Component {

  constructor(props) {
    super(props);
    
    let errorMsg = undefined;
    if (typeof props.update != 'function') {
      // TODO: Report error
      errorMsg = 'Internal Error';
    }
    
    this.state = {
      curPage: ((typeof this.props.nickname == 'string') && (this.props.nickname.length > 0)) ? 1 : 0,
      nickname: this.props.nickname,
      finished: false,
      errorMsg,
    };
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    // Only update if we're changing visibility state or we're visible and have a new page
    return (this.props.visible != nextProps.visible) ||
           (nextProps.visible && (
                                  (this.state.nextPage != nextState.nextPage) ||
                                  (this.state.finished != nextState.finished)
            ));
  }
  
  prevPage() {
    let curPage = this.state.curPage;
    
    if (curPage > 0)
      this.setState({curPage: curPage - 1});
  }
  
  nextPage() {
    let curPage = this.state.curPage;

    if (curPage < pages.size - 1)
      this.setState({curPage: curPage + 1});
  }
  
  updateNickname(nickname: string) {
    this.setState({nickname});
    return true;
  }
  
  updateLockID(lockID: string) {
    this.setState({lockID});
    return true;
  }
  
  updateLockName(lockName: string) {
    this.setState({lockName});
    return true;
  }
  
  updateLockPasscode(passcode: string) {
    this.setState({passcode});
    return true;
  }

  finished(save: boolean) {
    // Gather the information and register the new lock
    let newLockInfo = {'lockID': this.state.lockID,
                       'lockName': this.state.lockName};
    
    if ((typeof this.state.nickname == 'string') && (this.state.nickname != this.props.nickname))
      newLockInfo.nickname = this.state.nickname;
    if (typeof this.state.passcode == 'string')
      newLockInfo.passcode = this.state.passcode;

    this.props.update(newLockInfo);
    
    this.setState({finished: true});
  }
  
  render() {
    let curPage = this.state.curPage;
    
    if ((curPage < 0) || (curPage >= pages.size)) {
      // TODO: Report error
      if (curPage < 0) curPage = 0;
      if (curPage >= pages.size) curPage = pages.size - 1;
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
                <NicknamePage next={this.nextPage.bind(this)} update={this.updateNickname.bind(this)}/>
          }
          {
            (pageName == LOCK_SELECT_PAGE) &&
                <LockSelectPage lockIDs={this.props.lockIDs}
                                prev={this.prevPage.bind(this)}
                                next={this.nextPage.bind(this)}
                                update={this.updateLockID.bind(this)} />
          }
          {
            (pageName == LOCK_NAME_PAGE) &&
                <LockNamePage prev={this.prevPage.bind(this)}
                              next={this.nextPage.bind(this)}
                              update={this.updateLockName.bind(this)} />
          }
          {
            (pageName == LOCK_PASSCODE_PAGE) &&
                <LockPasscodePage prev={this.prevPage.bind(this)}
                              next={this.nextPage.bind(this)}
                              update={this.updateLockPasscode.bind(this)} />
          }
          {
            (pageName == NEW_LOCK_FINISH_PAGE) &&
                <NewLockFinishPage prev={this.prevPage.bind(this)}
                                   next={this.state.finished ? this.finished.bind(this) : undefined}
                                   finished={this.state.finished} />
          }
        </Modal>
    );
  }
}

const styles = StyleSheet.create({
  newLockModal: {
    backgroundColor: '#a0a0a0',
  },
});
