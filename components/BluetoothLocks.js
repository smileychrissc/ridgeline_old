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

/*
 * Bluetooth communications interface
 */
export class BluetoothLocks extends React.Component {

  /*
   * Find matches between the passed in locks and what has been found with Bluetooth
   * locks - Array of LockInfo objects to compare with
   * Returns a promise returning an array of LockInfo that match found locks
   */
  find(locks) {
    // Get the locks parameter into a common format
    if (!Array.isArray(locks)) {
      if (typeof locks == 'object')
        locks = [locks];
      else {
        // TODO: Report error
        return undefined;
      }
    }
    
    // Check each lock in array to confirm they have needed information
    if (!locks.every((val) => {
        if ((typeof val != 'object') || (typeof val.id != 'string') || (typeof val.code != 'string'))
          return false;
        return true;
      })) {
      // TODO: Report error
      return undefined;
    }
    
    // Return promise for looking up the locks (encapsulate locks array for safety)
    return ((locks) => {return new Promise((resolve, reject) => {
      var found = [];
      try {
        // Find the lock and try to confirm code
        let knownLocks = bt.getFoundLocks();

        locks.forEach((val) => {
          let passcodeNeeded = true;
          
          // Find matches
          for (let i = 0; i < knownLocks.length; i++) {
            if (knownLocks[i].ID == locks.lockID) {
              found.push(Object.assign({'needPasscode': (passcodeNeeded ? true : false)}, val));
            }
          }
        });
        resolve(found);
      } catch (except) {
        // TODO: Report error
        reject(except.toString());
      }
    })})(locks);
  }
  
  /*
   * Returns whether we know if a lock is nearby
   * lockID - The lock identifier to look for
   * Returns true if the lock is nearby and false if it isn't
   */
  confirmNearby(lockID: string) {
    let knownLocks = bt.getFoundLocks();
    return knownLocks.some((val) => val == lockID);
  }
  /*
   * Establishes a connection to the lock confirming that it's accessible. The connection
   * is immediately dropped after establishing connectivity
   * lockID - the lock identifier to connect to
   * passcode - The passcode to connect to the lock
   * Returns a promise that's used to connect to the lock
   */
  bindToDevice(lockID: string, passcode: string) {
    // 1. BT bind to lock
    // 2. Exchange passcode
    // 3. Confirm secret key (handle missing key; handle wrong key)
    // 4. Release lock to conserve power
    return new Promise((resolve, reject) => {
      let res = bt.connect(lockID, passcode);
      if (res && (typeof res.error == 'undefined')) {
        bt.disconnect(res);
        resolve({lockID, passcode, securityCode: res.code, fingerprintCounts: res.fingerprints});
      } else {
        if (!res) {
          reject("Error connecting to Bluetooth");
        } else {
          reject(res.error);
        }
      }
    });
  }
  /*
   * Sets a new passcode on the lock
   * lockID - the lock identifier to set the passcode
   * oldPasscode - the current passcode
   * securityCode - returned code from the lock
   * newPasscode - The new passcode to set on the lock
   * Returns a promise that's used to set the lock's passcode
   */
  setPasscode(lockID: string, oldPasscode: string, securityCode: string, newPasscode: string) {
    // Sends the passcode to the lock
    // 1. BT bind to lock
    // 2. Confirm passcode
    // 3. Confirm secret key (handle missing key; handle wrong key)
    // 4. Update passcode
    // 5. Update secret key
    // 6. Release lock to conserve power
    return new Promise((resolve, reject) => {
      resolve({result: true, lockID: lockID, securityCode: 'a'});
    });
  }
  /*
   * Begins the process of registering a new fingerprint
   * lockID - the identifier of the lock to set the new fingerprint on
   * passcode - the lock's passcode
   * securityCode - returned code from the lock
   * Returns a promise indicating the lock is ready for fingerprint registration
   */
  beginFingerprintCapture(lockID: string, passcode: string, securityCode: string) {
    // 1. BT bind to lock
    // 2. Confirm passcode
    // 3. Confirm secret key (handle missing key; handle wrong key)
    // 4. Enter new fingerprint capture more
    // 5. Update secret key
    // 6. Release lock to conserve power
    return new Promise((resolve, reject) => {
      resolve({result: true, lockID: lockID, securityCode: 'b'});
    });
  }
  /*
   * Cancels the process of registering a new fingerprint
   * lockID - the identifier of the lock to set the new fingerprint on
   */
  cancelFingerprintCapture(lockID: string) {
    // 1. Confirm BT bind
    // 2. Confirm secret key (must be correct)
    // 3. Cancel fingerprint capture
    // 4. Update secret key
    // 5. Release lock to conserve power
    return new Promise((resolve, reject) => {
      resolve({result: true, lockID: lockID, securityCode: 'b'});
  }
  /*
   * Puts the lock into a state for capturing a fingerprint
   * lockID - the identifier of the lock to set the new fingerprint on
   */
  captureFingerprint(lockID: string) {
    // 1. Confirm BT bind
    // 2. Confirm secret key (must be correct)
    // 3. Have lock capture print
    // 4. Update secret key
    // 5. Release lock to conserve power
    return new Promise((resolve, reject) => {
      resolve({result: true, lockID: lockID, securityCode: 'b'});
  }
  /*
   * Informs the lock to keep a captured fingerprint
   * lockID - the identifier of the lock to set the new fingerprint on
   */
  keepFingerprint(lockID: string) {
    // 1. Confirm BT bind
    // 2. Confirm secret key (must be correct)
    // 3. Have lock save print
    // 4. Update secret key
    // 5. Release lock to conserve power
    return new Promise((resolve, reject) => {
      resolve({result: true, lockID: lockID, securityCode: 'b'});
  }
  /*
   * Informs the lock to keep a captured fingerprint
   * lockID - the identifier of the lock to set the new fingerprint on
   * passcode - the lock's passcode
   * securityCode - returned code from the lock
   */
  unlock(lockID: string, passcode: string, securityCode: string) {
    // 1. BT bind to lock
    // 2. Confirm passcode
    // 3. Confirm secret key (handle missing key; handle wrong key)
    // 4. Send unlock request to lock
    // 5. Update secret key
    // 6. Release lock to conserve power
    return new Promise((resolve, reject) => {
      resolve({result: true, lockID: lockID, securityCode: 'b'});
  }
  /*
   * Informs the lock to keep a captured fingerprint
   * lockID - the identifier of the lock to set the new fingerprint on
   * passcode - the lock's passcode
   * securityCode - returned code from the lock
   */
  resetLock(lockID: string, passcode: string, securityCode: string) {
    // 1. BT bind to lock
    // 2. Confirm passcode
    // 3. Confirm secret key (handle missing key; handle wrong key)
    // 4. Send reset request
    // 5. Confirm reset request
    // 6. Release lock to conserve power
    return new Promise((resolve, reject) => {
      resolve({result: true, lockID: lockID, securityCode: 'b'});
  }
}
