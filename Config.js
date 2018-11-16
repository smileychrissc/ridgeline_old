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
 * Application level configurations
 */
let config = {
  fingerprintCaptureCount: 3,    // The number of times to set a fingerprint before it's registered (kept)
  findLocksDelayMs: 500,         // Number of milliseconds to wait before finding locks
  newLockFingerprintDelayMs: 1000, // Number of milliseconds to wait after a new lock is registered before starting the fingerprint registration
  
  uri: {
    'privacyPolicy': 'https://github.com/facebook/react-native', // Page for privacy policy
    'problemReport': 'https://github.com/facebook/react-native', // Page for entering a problem report
  },
};

export default config;
