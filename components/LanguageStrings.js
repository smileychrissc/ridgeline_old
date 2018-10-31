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
 * Class for handling strings associated with a language
 */
export class LanguageStrings {
  /*
   * Checks for an existing language. If a two character language is specified, the first
   * language found starting with those two characters is used as confirmation.
   * lang - the 2 or 5 character language string. eg: 'en', 'en_US', 'es_US', etc.
   * Returns true if a match is found and false if not
   */
  haveLang = (lang) => {
    let major = lang;
    let minor = undefined;
    if (major.indexOf('_') >= 0) {
      [major, minor] = major.split('_');
    }
    
    // This next code is weird because we use reverse logic here. The loop 'break's on
    // false and we want to break when we find a match. So we need to return false
    // upon a match and return true on non-matches inside of the loop. We also need
    // to swap the return logic so the caller gets what's expected
    return !strings.each((strings, tag) => {
        if ((tag.length <= 5) && (tag.startsWith(major))) {
          if ((!minor) || (minor && (tag.endsWith(minor)))) {
            // If the user only specified a major language, or we have a complete
            // match then we've found what we want
            return false;
          }
        }
        return true;
      });
  }
  
  /*
   * Returns the strings associated with the requested language.  If a two character
   * language is specified, the first language found starting with those two characters
   * is returned.
   * lang - the 2 or 5 character language string. eg: 'en', 'en_US', 'es_US', etc.
   * The strings associated with the language, or undefined if the language is not found
   */
  getLangStrings = (lang) => {
    let major = lang;
    let minor = undefined;
    let count = strings.length;
    
    if (major.indexOf('_') >= 0) {
      [major, minor] = major.split('_');
    }
    
    for (tag in strings) {
      if ((tag.length <= 5) && (tag.startsWith(major))) {
        if ((!minor) || (minor && (tag.endsWith(minor)))) {
          // If the user only specified a major language, or we have a complete
          // match then we've found what we want
          return strings[tag];
        }
      }
    }
    
    return undefined;
  }
}

const en_US = require('../assets/lang/en_US');

const strings = [
  // This is the default language and always needs to be defined
  'en_US': en_US,
]
