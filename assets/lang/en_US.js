/*
 * Keep all groupings of strings in alphabetic order by tag (left side value)
 * The comments following each string pair is the name of module it's used in
 */
let strings = {
  label: {
    'forgetLock': 'I no longer have this lock',                     // App
    'gotoLocation': 'Show me the last known location of this lock', // App
    'logs': 'View lock logs',                                       // App
    'manageLocks': 'Manage all my locks',                           // App
    'newLock': 'Prepare your new lock',                             // App
    'privacy': 'Our Privacy Policies',                              // App
    'problems': 'I am having problems with my lock',                // App
    'resetLock': 'Reset lock by clearing fingerprints and other data',// App
    'saveLocation': 'Save the current location of this lock',       // App
    'settings': 'Configure location auto saving and other features',// App
    'unlockLock': 'Unlock the closed lock',                         // App
  },
  message: {
    'cancelFingerprintRegister': 'Are you sure you want to cancel registering a print', // NewFingerprintModal
    'codeDuplicate': 'This lock is already registered', // LockCodePage
    'codeEnter': 'Please enter a valid code before continuing', // LockCodePage
    'continueClear': 'Continue to clear all information on the lock', // ResetModal
    'defaultContinue': 'Do you want to continue',     // YesNoCancelModal
    'locationFailed': 'There is no stored location to go to', // GotoFailedModal
    'lockCleared': 'Lock has been cleared',           // ResetModal
    'newLockCancelFingerprint': 'Continuing leaves lock with no registered fingerprints',// App
    'passwordsMismatch': 'Passwords need to match',   // LockPasscodePage
    'pressNextToContinue': 'Press next to continue',  // ConfirmPage
    'pressNextForgetLock': 'Press next to forget this lock', // ForgetModal
  },
  prompt: {
    'enterCode': 'Enter the code for the lock',       // LockCodePage
    'enterNickname': 'Enter your nickname',           // NicknamePage
    'fingerOnSensorDefault': 'Place finger on sensor to capture', // FingerprintCapture
    'fingerOnSensor': 'Place finger on sensor',       // FingerprintCapturePage
    'fingerOnSensorAgain': 'Place same finger on sensor again',  // FingerprintCapturePage
    'lockName': 'Enter an optional name for this lock',// LockNamePage
    'newLockFingerprints': 'You will now register a fingerprint for unlocking', // NewLockFinishPage
    'newLockFinish': 'Preparing your new lock',        // NewLockFinishPage
    'lockPassword': 'Enter the lock password',         // PasscodePage
    'passwordOptional': 'Enter an optional password for this lock', // LockPasscodePage
    'alwaysSaveLastLocation': 'Automatically save last location on detected locking', // SettingsModal
    'success': 'Success',                              // NewLockFinishPage
  },
  placeholder: {
    'lockCode': 'Lock code',                          // LockCodePage
    'nickname': 'Your nickname',                      // NicknamePage
    'lockName': 'Lock name',                          // LockNamePage
    'password': 'Password',                           // LockPasscodePage
    'passwordConfirm': 'Confirm password',            // LockPasscodePage
    'lockPassword': 'Password',                       // PasscodePage
  },
  status: {
    'lockSearching': 'Looking for locks',
  },
  title: {
    'allMyLocks': 'All Of Mine',        // App
    'cancel': 'Cancel',                 // YesNoCancelModal
    'forgetLock': 'Forget lock',        // App
    'gotoLocation': 'Goto Lock Location',// App
    'locationSaved': 'Lock location saved!', // LocationModal
    'logs': 'Logs',                     // App
    'navCancel': 'Cancel',              // NavigationPage
    'newLock': 'New Lock!',             // App
    'next': 'Next',                     // NavigationPage
    'no': 'No',                         // YesNoCancelModal
    'previous': 'Prev',                 // NavigationPage
    'privacy': 'Privacy',               // App
    'problems': 'Problems',             // App
    'rememberLocation': 'Remember Location', // App
    'settings': 'Settings',             // App
    'unlock': 'Unlock',                 // App
    'wipeLock': 'Wipe Lock',            // App
    'yes': 'Yes',                       // YesNoCancelModal
  },
};

export default strings;
