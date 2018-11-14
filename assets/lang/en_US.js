let strings = {
  status: {
    'lockSearching': 'Looking for locks',
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
    'success': 'Success',                              // Various places
  },
  placeholder: {
    'lockCode': 'Lock code',                          // LockCodePage
    'nickname': 'Your nickname',                      // NicknamePage
    'lockName': 'Lock name',                          // LockNamePage
    'password': 'Password',                           // LockPasscodePage
    'passwordConfirm': 'Confirm password',            // LockPasscodePage
    'lockPassword': 'Password',                       // PasscodePage
  },
  message: {
    'cancelFingerprintRegister': 'Are you sure you want to cancel registering a print', // NewFingerprintModal
    'codeDuplicate': 'This lock is already registered', // LockCodePage
    'codeEnter': 'Please enter a valid code before continuing', // LockCodePage
    'continueClear': 'Continue to clear all information on the lock', // ResetModal
    'defaultContinue': 'Do you want to continue',     // YesNoCancelModal
    'locationFailed': 'There is no stored location to go to', // GotoFailedModal
    'lockCleared': 'Lock has been cleared',           // ResetModal
    'pressNextToContinue': 'Press next to continue',  // ConfirmPage
    'pressNextForgetLock': 'Press next to forget this lock', // ForgetModal
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
