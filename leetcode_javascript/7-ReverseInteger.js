/**
 * @param {number} x
 * @return {number}
 */

/*

Given a signed 32-bit integer x, return x with its digits reversed.
If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

Example 1:

Input: x = 123
Output: 321
Example 2:

Input: x = -123
Output: -321
Example 3:

Input: x = 120
Output: 21


Constraints:

-231 <= x <= 231 - 1

*/

var reverse = function (x) {

    if (x === 0) {
        return 0
    }

    const isXNegative = (x < 0);

    let num = x;

    if (isXNegative) {
        num *= -1
    }
 
    // convert x to string
    let number = num + "";

    // remove trailing zeroes
    number = number.replace(/\.?0+$/, '');

    // reverse
    number = number.split('').reverse().join('');

    // converst to number
    number = parseFloat(number);

    if (number > (Math.pow(2, 31) - 1)) {
        return 0
    }

    if (isXNegative) {
        number *= -1
    }

    return number;

};