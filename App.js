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
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { AsyncStorage } from 'react-native';

import { WelcomeText } from './components/WelcomeText.js';
import { Language } from './components/Lanugage.js';
import { LocksRegisteredText } from './components/LocksRegisteredText.js';
import { LocksNearbyText } from './components/LocksNearbyText.js';
import { WifiLocks } from './components/WifiLocks.js';

import { Unlock } from './components/actionsUI/Unlock.js';
import { NewLock } from './components/actionsUI/NewLock.js';

import { NewLockModal } from './components/actionsUI/NewLockModal.js';
import { NewFingerprintModal } from './components/actionsUI/NewFingerprintModal.js';
import { UnlockModal } from './components/actionsUI/UnlockModal.js';
import { LocationModal } from './components/actionsUI/LocationModal.js';
import { GotoFailedModal } from './components/actionsUI/GotoFailedModal.js';
import { ManageModal } from './components/actionsUI/ManageModal.js';
import { ResetModal } from './components/actionsUI/ResetModal.js';
import { ForgetModal } from './components/actionsUI/ForgetModal.js';
import { SettingsModal } from './components/actionsUI/SettingsModal.js';
import { ProblemModal } from './components/actionsUI/ProblemModal.js';

const NEW_LOCK_MODAL = 'lock.new_lock_modal';
const NEW_FINGERPRINT_MODAL = 'lock.new_fingerprint_modal';
const UNLOCK_MODAL = 'lock.unlock_modal';
const LOCATION_MODAL = 'lock.location_modal';
const GOTO_FAILED_MODAL = 'lock.goto_failed_modal';
const MANAGE_MODAL = 'lock.manage_modal';
const RESET_MODAL = 'lock.reset_modal';
const FORGET_MODAL = 'lock.forget_modal';
const SETTINGS_MODAL = 'lock.settings_modal';
const PROBLEM_MODAL = 'lock.problem_modal';
const PRIVACY_MODAL = 'lock.privacy_modal';

const DEFAULT_LANGUAGE = 'en_US';
/*
 * Main class
 */
export default class App extends React.Component {
  
  // Constructor defines basic state and gets promises for basic information
  constructor(props) {
    super(props);
    this.state = {
      newUser: true,         // Convenience flag for first time user
      nickname: undefined,   // The user's nickname
      deviceInfo: undefined, // Information on device we're running on
      activeLock: undefined, // The lock we're currently working on
      lockCount: 0,          // Convenience variable for number of registered locks
      locks: undefined,      // Array of lock information
      locksNearbyCount: 0,   // Convenience variable for number of detected registered locks
      locksNearby: undefined,// Array of registered locks detected to be nearby
      locksNearbyChecking: false, // Flags when we're looking for nearby locks
      modalName: undefined,  // The current modal window to show
      language: undefined,   // The current language
      strings: undefined,    // The list of loaded strings
    };
    this.findLocksHandle = undefined;
    this.lockIDs = undefined;
    
    // Get the language from the system and then look for a stored setting
    // This may cause a UI change if the promises aren't executed immediately in
    // future.
    getLanguageAndStrings();
    
    // Check if there is a nickname registered
    this.fromKey('nickname')
      .then((name) => {this.setState({
                                'nickname': name,
                                'newUser': (name ? false : true)});
                      })
      .catch((error) => {/*TODO: handle error */});

    // Load all configured locks
    this.fromKeyJSON('locks')
      .then((locks) => {if (Array.isArray(locks)) {
                          this.setState({'lockCount': locks.size, 'locks': locks});
                          if (this.findLocksHandle) {
                            clearTimeout(this.findLocksHandle);
                            this.findLocksHandle = undefined;
                          }
                          this.findLocksHandle = setTimeout(this.findLocks.bind(this), 500);
                      } else {
                        let newState = {'locksNearbyChecking': false};
                        if (this.state.lockCount) {
                          newState = Object.assign({'lockCount': 0,
                                                    'locks': undefined
                                                   }, newState);
                        }
                        this.setState(newState);
                      }
                    })
      .catch((error) => {/*TODO: handle error */});
  }
  /*
   * Function that reteieves the OS language and subsequently
   * loads a stored UI Language string if it's been overridden
   * The state gets updated with the language and its strings
   */
  getLanguageAndStrings() {
    this.fromKey('language')
      .then((language) => {
          if ((typeof language != 'string') || (language.length < 2)) {
            language = this.state.language;
          }
          Language.getStrings(language || DEFAULT_LANGUAGE,
                              (language, strings) => this.setState(language, strings););
        })
      .catch((error) => {/*TODO: handle error*/});
  }
  /*
   * Function to load a key from AsyncStorage
   * key - The key to lookup
   * Returns the value associated with the key, or undefined
   */
  async fromKey(key: string) {
    try {
      const data = await AsyncStorage.getItem(key);
      return data;
    } catch (error) {
      // TODO: Handle error
    }
    return undefined;
  }
  /*
   * Function to load a key from AsyncStorage and return a JSON decoded value
   * key - The key to lookup
   * Returns the decoded JSON value associated with the key,or undefined
   */
  fromKeyJSON(key: string) {
    return new Promise((resolve,reject) => {
      try {
        const data = this.fromKey(key);
        if (typeof data == 'string')
          resolve(JSON.parse(data));
      } catch (error) {
        reject(error);
      }
      resolve(undefined);
    });
  }
  /*
   * Function to store a value into AsyncStorage
   * key - The key to store
   * value - The value assciated with the key
   */
  async setKey(key: string, value: string) {
    try {
      await AsyncStorage.putItem(key, value);
    } catch (error) {
      // TODO: Handle error
    }
  }
  /*
   * Function to find nearby locks
   */
  findLocks() {
    // Do nothing if we don't have any locks
    if (!this.state.locks) {
      if (this.state.locksNearbyChecking) {
        this.setState({'locksNearbyChecking': false});
      }
      return;
    }
    
    // Set the state to indicate we're looking for locks
    if (!this.state.locksNearbyChecking) {
      this.setState({'locksNearbyChecking': true});
    }
    
    // Find any nearby locks that are registered
    WifiLocks.find(this.state.locks)
      .then((found) => {if (Array.isArray(found)) {
                this.setState({'locksNearbyCount': found.size,
                               'locksNearby': found,
                               'locksNearbyChecking': false
                              });
              } else {
                if (this.state.locksNearbyCount)
                  this.setState({'locksNearbyCount': 0,
                                 'locksNearby': undefined,
                                 'locksNearbyChecking': false
                                });
              }
            })
      .catch((error) => {
        this.setState({'locksNearbyChecking': false});
        /*TODO: handle error */
      });
  }
  /*
   * Updates the user's nickname in the store
   */
  updateNickname(nickname: string) {
    this.setKey('nickname', nickname);
  }
  /*
   * Used to register a new lock on this device
   * lockInfo - The user entered information on the new lock
   */
  newLockRegister(lockInfo) {
    let newState = {};
    
    // Update the user's nickname if they've added/changed one
    if (typeof lockInfo.nickname == 'string') {
      updateNickname(lockInfo.nickname);
      newState.newUser = false;
      newState.nickname = lockInfo.nickname;
    }
    // If the lock is still nearby, we bind it and our device
    if (WifiLocks.confirmNearby(lockInfo.lockID)) {
      let locks = this.state.locks;
      let passcode = lockInfo.passcode || '';
      WifiLocks.bindToDevice(lockInfo.lockID, lockInfo.lockName, passcode)
        .then((lock) => {locks.push(lock);
                         newState.lockCount = locks.size;
                         newState.locks = locks;
                         newState.modalName = NEW_FINGERPRINT_MODAL;
                         newState.activeLock = lock.size - 1;
                        })
        .catch((error) => {/* TODO: handle error */});
    } else {
      // TODO: Handle error
    }
    
    // Update our state if we have something to update
    if (newState.keys().size > 0) {
      this.setState(newState);
    }
  }
  /*
   * Indicates that we're updated a fingerprint on the device
   */
  newFingerprint() {
    if (this.state.modalName)
      this.setState({modalName: undefined});
    
    if (this.state.activeLock == undefined) {
      // TODO: Report error
      return;
    }
    if ((this.state.activeLock < 0) || (this.state.activeLock >= this.state.locks.size)) {
      // TODO: Report error
      return;
    }
  }
  
  unlock() {
    // Unlock the lock
  }

  onPressUnlock() {
    this.setState({modalName: UNLOCK_MODAL});
  }
  
  /*
   * Handle the user wanting to add a new lock
   */
  onPressNewLock()
  {
    // Get a list of registered locks so that we don't re-add an existing lock
    let lockIDs = '';
    if (Array.isArray(locks)) {
      locks.forEach((val) => {lockIDs += ',' + val.lockID});
      lockIDs = lockIDs.substr(1);
    }
    this.lockIDs = lockIDs;
    
    // Begin the new lock process
    this.setState({modalName: NEW_LOCK_MODAL});
  }
  
  onPressRemember()
  {
    // TODO: Get location
    let loc = "this is my location";
    this.setKey('location',loc);
    this.setState({modalName: LOCATION_MODAL});
  }
  
  onPressGoto() {
    let loc = this.getKey('location');
    if (loc) {
      // TODO: show location on map
    } else {
      this.setState({modalName: GOTO_FAILED_MODAL});
    }
  }
  
  onPressManage() {
    this.setState({modalName: MANAGE_MODAL});
  }
  
  onPressResetLock() {
    this.setState({modalName: RESET_MODAL});
  }
  
  onPressForgetLock() {
    this.setState({modalName: FORGET_MODAL});
  }
  
  onPressSettings() {
    this.setState({modalName: SETTINGS_MODAL});
  }
  
  onPressLogs() {}

  onPressProblems() {
    this.setState({modalName: PROBLEM_MODAL});
  }
  
  onPressPrivacy() {
    this.setState({modalName: PRIVACY_MODAL});
  }
  
  render() {
    // TODO: Pre-bind functions to 'this'
    return (
      <View style={styles.containerTop}>
        <WelcomeText firstVisit={this.state.newUser} user={this.state.nickname}/>
        <View>
          <LocksRegisteredText count={this.state.lockCount}/>
          {
            this.state.locksNearbyCount && <LocksNearbyText count={this.state.locksNearbyCount} />
          }
        </View>
        <View>
          {
            this.state.locksNearbyChecking &&
              (<View style={styles.containerNearbyCheck}>
                <ActivityIndicator size="small" color='#b0b0b0' />
                <Text style={styles.nearbyCheckingText}>Looking for locks</Text>
              </View>)
          }
          {
            this.state.locksNearbyCount && <Unlock title="Unlock"
                                     accessibilityLabel="Unlock the closed lock"
                                     onPress={this.onPressUnlock.bind(this)}
                                     />
           }
          <NewLock title="New Lock!"
            accessibilityLabel="Prepare your new lock"
            onPress={this.onPressNewLock.bind(this)}
            />
        </View>
        <View>
          {
            this.state.locksNearbyCount && <Button title="Remember Location"
              accessibilityLabel="Save the current location of this lock"
              onPress={this.onPressRemember.bind(this)}
              />
          }
          {
            this.state.lockCount && <Button title="Goto Lock Location"
              accessibilityLabel="Show me the last known location of this lock"
              onPress={this.onPressGoto.bind(this)}
              />
          }
        </View>
        <View>
          {
            this.state.lockCount && <Button title="All Of Mine"
                                     accessibilityLabel="Manage all my locks"
                                     onPress={this.onPressManage.bind(this)}
                                     />
          }
          {
            this.state.lockCount && <Button title="Wipe Lock"
                                     accessibilityLabel="Reset lock by clearing fingerprints and other data"
                                     onPress={this.onPressResetLock.bind(this)}
                                     />
          }
          {
            this.state.lockCount && <Button title="Forget lock"
                                     accessibilityLabel="I no longer have this lock"
                                     onPress={this.onPressForgetLock.bind(this)}
                                     />
          }
        </View>
        <View>
          <Button title="Settings"
            accessibilityLabel="Configure location auto saving and other features"
            onPress={this.onPressSettings.bind(this)}
          />
          <Button visible={false} title="Logs"
            accessibilityLabel="View lock logs"
            onPress={this.onPressLogs.bind(this)}
          />
          <Button title="Problems"
            accessibilityLabel="I'm having problems with my lock"
            onPress={this.onPressProblems.bind(this)}
          />
          <Button title="Privacy"
            accessibilityLabel="Our Privacy Policies"
            onPress={this.onPressPrivacy.bind(this)}
          />
        </View>
        {
         (this.state.modalName == NEW_LOCK_MODAL) &&
             <NewLockModal nickname={this.state.nickname}
                           lockIDs={this.state.lockIDs}
                           update={this.newLockRegister.bind(this)} />
        }
        {
          (this.state.modalName == NEW_FINGERPRINT_MODAL) &&
              <NewFingerprintModal lockID={this.state.locks[this.state.activeLock].lockID}
                                   update={this.newFingerprint.bind(this)} />
        }
        {
          (this.state.modalName == UNLOCK_MODAL) &&
              <UnlockModal lockID={this.state.locks[this.state.activeLock].lockID}
                                   update={this.unlock.bind(this)} />
        }
        {
          (this.state.modalName == LOCATION_MODAL) &&
              <LocationModal />
        }
        {
          (this.state.modalName == GOTO_FAILED_MODAL) &&
              <GotoFailedModal />
        }
        {
          (this.state.modalName == MANAGE_MODAL) &&
              <ManageModal locks={this.getLocks.bind(this)} />
        }
        {
          (this.state.modalName == RESET_MODAL) &&
              <ResetModal lockID={this.state.locks[this.state.activeLock].lockID} />
        }
        {
          (this.state.modalName == FORGET_MODAL) &&
              <ForgetModal lockID={this.state.locks[this.state.activeLock].lockID} />
        }
        {
          (this.state.modalName == SETTINGS_MODAL) &&
              <SettingsModal lockID={this.state.locks[this.state.activeLock].lockID} />
        }
        {
          (this.state.modalName == PROBLEM_MODAL) &&
              <ProblemModal />
        }
        {
          (this.state.modalName == PRIVACY_MODAL) &&
              <PrivacyModal />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerTop: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  containerNearbyCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nearbyCheckingText: {
    color: '#b0b0b0',
    fontSize: 12,
    marginLeft: 10
  },
});
