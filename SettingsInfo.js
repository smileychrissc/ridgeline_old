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

/*
 * Used to create a SettingsInfo instance with required fields
 */
export default class SettingsInfo {
  /*
   * Static function for creating an instance
   * autosaveLocation - Flag for automatically saving a lock's location
   * Returns a new object with the required fields
   */
  static create(autosaveLocation: boolean) {
    let info = {
        autosaveLocation,
    };
    
    return info;
  }
};
