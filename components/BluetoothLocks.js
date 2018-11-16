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
        locks.forEach((val) => {
          let passcodeNeeded = true;
          // TODO: Find the lock and try to confirm code
          found.push(Object.assign({'needPasscode': (passcodeNeeded ? true : false)},val));
        });
        resolve(found);
      } catch (except) {
        // TODO: Report error
        reject(except.toString());
      }
    })})(locks);
  }
  
  confirmNearby(lockID: string) {
    // Returns whether the lock identified by the string is close enough to the phone
    return true;
  }
  
  bindToDevice(lockID: string, lockName: string, phoneID: string, passcode: string) {
    return new Promise((resolve, reject) => {
      resolve({lockID, lockName, phoneID, passcode, securityCode: 'a', fingerprintCounts: 0});
    });
  }
  
  setPasscode(lockID: string, passcode: string) {
    // Sends the passcode to the lock
    return true;
  }
  
  beginFingerprintCapture(lockID: string) {
  
  }
  
  cancelFingerprintCapture(lockID: string) {
  
  }
  
  captureFingerprint(lockID: string) {
  
  }
  
  keepFingerprint(lockID: string) {
  
  }
  
  unlock(lockID: string, password: string) {
  
  }
  
  resetLock(lockID: string, password: string) {
  
  }
}
