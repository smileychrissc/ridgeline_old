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

/*
 * Used to create a lockInfo instance with required fields
 */
export default class LockInfo {
  /*
   * Static function for creating an instance
   * name - The name of the lock
   * lockID - The ID of the lock
   * passcode - The secure password associated with the lock
   * Returns a new object with the required fields
   */
  static create(name: string, lockID: string, passcode: string) {
    let info = {
        name,
        lockID,
        passcode,
    };
    
    return info;
  }
};
