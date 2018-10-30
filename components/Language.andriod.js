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

import { NativeModules } from 'react-native';

import { LanguageStrings } from './components/LanguageStrings.js';

/*
 * Class that returns language for Andriod OS
 */
export class Language extends LanguageStrings {
  /*
   * Returns the strings associated with the requested language. If a 2 character
   * language is requested, the first match is returned. If the language is not found then
   * an attempt is made to default to en_US.
   * lang - the 2 or 5 character language string. eg: 'en', 'en_US', 'es_US', etc.
   * cb - the callback taking the loaded language and strings as parameters ie: (lang, strings)
   * Returns the loaded strings.
   * Note that if the language is not found, the returned strings are type undefined
   */
  getStrings = (lang, cb) => {
    if (!lang || (typeof lang != 'string') || (lang.length < 2)) {
      lang = NativeModules.I18nManager.localeIdentifier;
    }
    if (!haveLang(lang))
      lang = 'en_US';
    
    let strings = getLangStrings(lang);
    if (!strings && !lang.equals('en_US')) {
      lang = 'en_US';
      strings = getLangString(lang);
    }
    if (typeof cb == 'function') {
      cb(lang, strings);
    }
    
    return strings;
  }
};

