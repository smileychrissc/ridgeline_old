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
 * Utility methods
 */
export class Utils {
  /*
   * Finds an exact match of an embedded string within another string having terminators
   * For example and ID within a list of comma separated list of other IDs: 'foo' in 'bar,cat,meow,foo'
   * needle - The string to match
   * stack - The string to look in
   * separator - The separator value
   * Returns false if a needle or stack parameter is not specified or if an exact match is not found.
   * If a separator is not specified then an exact match is performed on the entire strings. An empty
   * string parameter is considered the same as an undefined parameter. White space is considered
   * relevant
   */
  static findInList(needle: string, stack: string, separator: string = ',') {
    // Parameter checking
    if (!needle || !stack) {
      return false;
    }
    if ((needle.length <= 0) || (stack.length <= 0)) {
      return false;
    }
    // No separator, exact match check
    if (!separator || (separator.length <= 0)) {
      return needle == stack;
    }
    
    // Try to find the needle in the stack
    let idx = 0;
    while (idx >= 0) {
      // Assume no exact match
      let leftMatch = false;
      let rightMatch = false;
      
      // Get first/next match
      idx = stack.indexOf(needle, idx);
      if (idx < 0) {
        continue;  // No more matches
      }
      
      // Find either a comma at either end of the match or the actual ends of the list
      // for an exact match
      leftMatch = (idx == 0) || (stack[idx-1] == ',');
      idx += needle.length;
      rightMatch = (idx == stack.length) || (stack[idx] == ',');
      
      if (leftMatch && rightMatch) {
        return true;
      }
    }
    
    // Didn't find an exact match
    return false;
   }
};
