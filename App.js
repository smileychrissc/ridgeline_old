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
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { AsyncStorage } from 'react-native';

import Config from './Config.js';
import { WelcomeText } from './components/WelcomeText.js';
import { Language } from './components/Language';
import LockInfo from '../../LockInfo.js';
import { LocksRegisteredText } from './components/LocksRegisteredText.js';
import { LocksNearbyText } from './components/LocksNearbyText.js';
import { BluetoothLocks } from './components/BluetoothLocks.js';

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

const defaultStrings = Language.loadStrings(DEFAULT_LANGUAGE);

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
      activeLock: undefined, // The nearby lock we're currently working on
      lockCount: 0,          // Convenience variable for number of registered locks
      locks: undefined,      // Array of lock information
      locksNearbyCount: 0,   // Convenience variable for number of detected registered locks
      locksNearby: undefined,// Array of registered locks detected to be nearby
      locksNearbyAreLocked: false,//Flag for indicating at least one nearby lock is locked
      locksNearbyChecking: false, // Flags when we're looking for nearby locks
      modalName: undefined,  // The current modal window to show
      language: undefined,   // The current language
      strings: defaultStrings,    // The list of loaded strings
    };
    
    this.findLocksHandle = undefined;
    this.lockIDs = undefined;
    this.settings = new SettingsInfo.create(false);
    this.lockComms = new BluetoothLocks();
    
    // Perform function bindings
    this.cancelModal = this.cancelModal.bind(this);
    this.cancelFingerprint = this.cancelFingerprint.bind(this);
    this.captureFingerprint = this.captureFingerprint.bind(this);
    this.findLocks = this.findLocks.bind(this);
    this.forgetLock = this.forgetLock.bind(this);
    this.getLocks = this.getLocks.bind(this);
    this.newFingerprint = this.newFingerprint.bind(this);
    this.newLockRegister = this.newLockRegister.bind(this);
    this.newLockRegisterFinished = this.newLockRegisterFinished.bind(this);
    this.onPressUnlock = this.onPressUnlock.bind(this);
    this.resetLock = this.resetLock.bind(this);
    this.unlock = this.unlock.bind(this);
    
    // Load defined settings
    this.fromKeyJSON('settings')
      .then((settings) => {
                            // Assign settings
                            if (settings.autosaveLocation) {
                              this.settings.autosaveLocation = settings.autosaveLocation;
                            }
                          })
      .catch((error) => {/*TODO: handle error */});

    // Get the language from the system and then look for a stored setting
    // This may cause a UI change if the promises aren't executed immediately in
    // future.
    this.loadLanguageAndStrings();
    
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
                          this.setState({'lockCount': locks.length, 'locks': locks});
                          if (this.findLocksHandle) {
                            clearTimeout(this.findLocksHandle);
                            this.findLocksHandle = undefined;
                          }
                          this.findLocksHandle = setTimeout(this.findLocks, Config.findLocksDelayMs);
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
  loadLanguageAndStrings() {
    this.fromKey('language')
      .then((language) => {
          if ((typeof language != 'string') || (language.length < 2)) {
            language = this.state.language;
          }
          Language.loadStrings(language || DEFAULT_LANGUAGE,
                              (language, strings) => this.setState({language, strings}));
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
    this.lockComms.find(this.state.locks)
      .then((found) => {
              if (Array.isArray(found)) {
                // Check if we found any locked locks
                let haveLockedLocks = false;
                for (let ii = 0; ii < found.length; ii++) {
                  if (!lock.unlocked) {
                    haveLockedLocks = true;
                    break;
                  }
                }
                // Update our state
                this.setState({'locksNearbyCount': found.length,
                               'locksNearby': found,
                               'locksNearbyChecking': false,
                               'locksNearbyAreLocked': haveLockedLocks,
                              });
              } else {
                // Nothing nearby. Update the state
                if (this.state.locksNearbyCount)
                  this.setState({'locksNearbyCount': 0,
                                 'locksNearby': undefined,
                                 'locksNearbyChecking': false,
                                 'locksNearbyAreLocked': false,
                                });
              }
            })
      .catch((error) => {
        this.setState({'locksNearbyChecking': false});
        /*TODO: handle error */
      });
  }
  /*
   * Returns the array of known locks
   */
  getLocks() {
    return this.state.locks;
  }
  /*
   * Used to cancel any modal window shown
   */
  cancelModal() {
    if (this.state.modalName)
      this.setState({modalName: undefined});
  }
  /*
   * Updates the user's nickname in the store
   */
  updateNickname(nickname: string) {
    this.setKey('nickname', nickname);
  }
  /*
   * Makes the identified lock the active lock
   */
  updateActiveLock(lockID: string) {
    let activeLock = undefined;
    
    for (let ii = 0; ii < this.state.locksNearby.length; ii++) {
      if (this.state.locksNearby[ii].lockID.equals(lockID)) {
        activeLock = ii;
        break;
      }
    }
    
    if (active == undefined) {
      // TODO: shouldn't happen, handle error
    }
    
    this.setState({activeLock});
  }
  /*
   * Used to register a new lock on this device
   * lockInfo - The user entered information on the new lock
   */
  newLockRegister(lockInfo) {
    // Update the user's nickname if they've added/changed one
    if (typeof lockInfo.nickname == 'string') {
      updateNickname(lockInfo.nickname);
      this.setState({newUser: false, nickname: lockInfo.nickname});
    }
    
    // TODO: Make sure we're not registering a lock twice
    
    // If the lock is still nearby, we bind it and our device
    if (this.lockComms.confirmNearby(lockInfo.lockID)) {
      var locks = this.state.locks || [];
      var nearby = this.state.locksNearby || [];
      var finishedFn = this.newLockRegisterFinished;
      var stateUpdate = (s) => this.setState(s);
      let passcode = lockInfo.passcode || '';
      
      this.lockComms.bindToDevice(lockInfo.lockID, lockInfo.name, passcode)
        .then((lock) => {
                         locks.push(lock);
                         nearby.push(lock);
              
                         stateUpdate({lockCount: locks.length,
                                      locks: locks,
                                      locksNearby: nearby,
                                      activeLock: nearby.length - 1});
 
                         setTimeout(() => finishedFn(lockInfo.lockID),
                                    Config.newLockFingerprintDelayMs);
              
                         // TODO: Store our updated locks
            })
        .catch((error) => {console.log(error);/* TODO: handle error */});
    } else {
      // TODO: Handle error
    }
  }
  /*
   * Function to set begin the fingerprint registration after a new lock is registered
   * lockID - the ID of the registered lock
   */
  newLockRegisterFinished(lockID) {
    this.setState({modalName: NEW_FINGERPRINT_MODAL,
                   fingerprintCancelMessage: this.state.strings.message.newLockCancelFingerprint});
    this.lockComms.beginFingerprintCapture(lockID);
  }
  /*
   * Cause the lock to capture a fingerprint
   * lockID - the ID of the lock to capture a fingerprint on
   * cb - callback function for when a capture is done
   */
  captureFingerprint(lockID: string, cb) {
    cb(this.lockComms.captureFingerprint(lockID));
  }
  /*
   * Indicates that we're updated a fingerprint on the device
   * lockID - the ID of the lock to capture a fingerprint on
   */
  newFingerprint(lockID: string) {
    this.lockComms.keepFingerprint(lockID);
  
    if (this.state.modalName)
      this.setState({modalName: undefined});
    
    this.updateActiveLock(lockID);
  }
  /*
   * Cancel the fingerprint capturing discarding the new fingerprint
   * lockID - the ID of the lock to capture a fingerprint on
   */
  cancelFingerprint(lockID: string) {
    this.lockComms.cancelFingerprintCapture(lockID);
    this.cancelModal();
  }
  /*
   * Unlocks a lock that's locked
   */
  unlock(lockID: string, passcode: string) {
    // Unlock the lock
    // TODO: handle errors
    this.lockComms.unlock(lockID, passcode);
    
    // Make this lock the active lock
    this.updateActiveLock(lockID);
  }
  /*
   * Resets a lock back to a clean slate
   */
  resetLock(lockID: string, passcode: string) {
    // Reset the lock
    // TODO: handle errors
    this.lockComms.resetLock(lockID, passcode);
    
    setTimeout(() => this.setState({modalName: undefined}), 1000);
  }
  /*
   * Removes the lock from our list of known locks
   */
  forgetLock(lockID: string) {
    // TODO: what do we do if the user if removing a lock that's nearby? (not cleared yet)
    let index = undefined;
    if (!Array.isArray(this.state.locks)) {
      // TODO: Report error
      return;
    }
    
    for (let ii = 0; ii < this.state.locks.length; ii++) {
      if (this.state.locks[ii].lockID.equals(lockID)) {
        index = ii;
        break;
      }
    }
    if (index != undefined) {
      let locks = this.state.locks.splice(index, 1);
      
      // Save updated locks
      this.setState({locks});
    }
    
    // Look for nearby locks
    if (Array.isArray(this.state.locksNearby)) {
      index = undefined;
      for (let ii = 0; ii < this.state.locksNearby.length; ii++) {
        if (this.state.locksNearby[ii].lockID.equals(lockID)) {
          index = ii;
          break;
        }
      }
    
      if (index != undefined) {
        let locks = this.state.locksNearby.splice(index, 1);
        this.setState({locksNearby});
      }
    }
  }
  /*
   * Returns the current settings information in a SettingsInfo object
   */
  getSettings() {
   return this.settings;
  }
  /*
   * Updates the current settings
   *  settings - instance of SettingsInfo with the new settings
   */
  updateSettings(newSettings) {
    if (newSettings instanceof SettingsInfo) {
      this.settings = newSettings;
    }
  }
  /*
   * Handle the user wanting to unlock using their phone
   */
  onPressUnlock() {
    // Get a list of registered locks that are locked
    let lockIDs = '';
    if (Array.isArray(this.state.locks)) {
      this.state.locks.forEach((lock) => {if (!lock.unlocked) lockIDs += ',' + lock.lockID});
      lockIDs = lockIDs.substr(1);
    }
    this.lockIDs = lockIDs;

    this.setState({modalName: UNLOCK_MODAL});
  }
  /*
   * Handle the user wanting to add a new lock
   */
  onPressNewLock()
  {
    // Get a list of registered locks so that we don't re-add an existing lock
    let lockIDs = '';
    if (Array.isArray(this.state.locks)) {
      this.state.locks.forEach((lock) => {lockIDs += ',' + lock.lockID});
      lockIDs = lockIDs.substr(1);
    }
    this.lockIDs = lockIDs;
    
    // Begin the new lock process
    this.setState({modalName: NEW_LOCK_MODAL});
  }
  /*
   * Handles the user wanting to remember a location
   */
  onPressRemember()
  {
    // TODO: Get location and active lock and store multiple lock entries
    let loc = "this is my location";
    this.setKey('location',loc);
    this.setState({modalName: LOCATION_MODAL});
  }
  /*
   * Show the saved location on a map
   */
  onPressGoto() {
    let loc = this.getKey('location');
    if (loc) {
      // TODO: show location on map
    } else {
      this.setState({modalName: GOTO_FAILED_MODAL});
    }
  }
  /*
   * The user wants to manage their locks
   */
  onPressManage() {
    this.setState({modalName: MANAGE_MODAL});
  }
  /*
   * The user is resetting a lock
   */
  onPressResetLock() {
    // Get a list of nearby locks
    let lockIDs = '';
    if (Array.isArray(this.state.locks)) {
      this.state.locksNearby.forEach((lock) => {lockIDs += ',' + locksNearby.lockID});
      lockIDs = lockIDs.substr(1);
    }
    this.lockIDs = lockIDs;

    this.setState({modalName: RESET_MODAL});
  }
  
  onPressForgetLock() {
    // Get a list of registered locks
    let lockIDs = '';
    if (Array.isArray(this.state.locks)) {
      this.state.locks.forEach((lock) => {lockIDs += ',' + lock.lockID});
      lockIDs = lockIDs.substr(1);
    }
    this.lockIDs = lockIDs;

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
                <Text style={styles.nearbyCheckingText}>{this.state.strings.status.lockSearching}</Text>
              </View>)
          }
          {
            this.state.locksNearbyCount && this.state.locksNearbyAreLocked &&
                <Unlock title={this.state.strings.title.unlock}
                        accessibilityLabel={this.state.string.label.unlockLock}
                        onPress={this.onPressUnlock}
                        />
           }
          <NewLock title={this.state.strings.title.newLock}
            accessibilityLabel={this.state.string.label.newLock}
            onPress={this.onPressNewLock.bind(this)}
            />
        </View>
        <View>
          {
            this.state.locksNearbyCount &&
                <Button title={this.state.strings.title.rememberLocation}
                  accessibilityLabel={this.state.string.label.saveLocation}
                  onPress={this.onPressRemember.bind(this)}
                  />
          }
          {
            this.state.lockCount &&
                <Button title={this.state.strings.title.gotoLocation}
                  accessibilityLabel={this.state.string.label.gotoLocation}
                  onPress={this.onPressGoto.bind(this)}
                  />
          }
        </View>
        <View>
          {
            this.state.lockCount && <Button title={this.state.strings.title.allMyLocks}
                                     accessibilityLabel={this.state.string.label.manageLocks}
                                     onPress={this.onPressManage.bind(this)}
                                     />
          }
          {
            this.state.lockCount && <Button title={this.state.strings.title.wipeLock}
                                     accessibilityLabel={this.state.string.label.resetLock}
                                     onPress={this.onPressResetLock.bind(this)}
                                     />
          }
          {
            this.state.lockCount && <Button title={this.state.strings.title.forgetLock}
                                     accessibilityLabel={this.state.string.label.forgetLock}
                                     onPress={this.onPressForgetLock.bind(this)}
                                     />
          }
        </View>
        <View style={styles.containerFooter}>
          <Button title={this.state.strings.title.settings}
            accessibilityLabel={this.state.string.label.settings}
            onPress={this.onPressSettings.bind(this)}
          />
          <Button visible={false} title={this.state.strings.title.logs}
            accessibilityLabel={this.state.string.label.logs}
            onPress={this.onPressLogs.bind(this)}
          />
          <Button title={this.state.strings.title.problems}
            accessibilityLabel={this.state.string.label.problems}
            onPress={this.onPressProblems.bind(this)}
          />
          <Button title={this.state.strings.title.privacy}
            accessibilityLabel={this.state.string.label.privacy}
            onPress={this.onPressPrivacy.bind(this)}
          />
        </View>
        {
         (this.state.modalName == NEW_LOCK_MODAL) &&
             <NewLockModal nickname={this.state.nickname}
                           lockIDs={this.lockIDs}
                           update={this.newLockRegister}
                           cancel={this.cancelModal}
                           />
        }
        {
          (this.state.modalName == NEW_FINGERPRINT_MODAL) &&
              <NewFingerprintModal lockID={this.state.locksNearby[this.state.activeLock].lockID}
                                   capture={this.captureFingerprint}
                                   update={this.newFingerprint}
                                   cancel={this.cancelFingerprint}
                                   cancelMessage={this.state.fingerprintCancelMessage}
                                    />
        }
        {
          (this.state.modalName == UNLOCK_MODAL) &&
              <UnlockModal lockIDs={this.lockIDs}
                           update={this.unlock}
                           cancel={this.cancelModal} />
        }
        {
          (this.state.modalName == LOCATION_MODAL) &&
              <LocationModal update={this.cancelModal} />
        }
        {
          (this.state.modalName == GOTO_FAILED_MODAL) &&
              <GotoFailedModal />
        }
        {
          (this.state.modalName == MANAGE_MODAL) &&
              <ManageModal locks={this.getLocks} />
        }
        {
          (this.state.modalName == RESET_MODAL) &&
              <ResetModal lockIDs={this.lockIDs}
                          update={this.resetLock}
                          cancel={this.cancelModal} />
        }
        {
          (this.state.modalName == FORGET_MODAL) &&
              <ForgetModal lockIDs={this.lockIDs}
                           update={this.forgetLock}
                           cancel={this.cancelModal} />
        }
        {
          (this.state.modalName == SETTINGS_MODAL) &&
              <SettingsModal lockIDs={this.lockIDs}
                             settings={this.getSettings}
                             update={this.updateSettings}
                             cancel={this.cancelModal} />
        }
        {
          (this.state.modalName == PROBLEM_MODAL) &&
              <ProblemModal cancel={this.cancelModal} />
        }
        {
          (this.state.modalName == PRIVACY_MODAL) &&
              <PrivacyModal cancel={this.cancelModal} />
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
  containerFooter: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
