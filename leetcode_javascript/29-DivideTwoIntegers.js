/* 
Given two integers dividend and divisor, divide two integers without using multiplication, division and mod operator.

Return the quotient after dividing dividend by divisor.

The integer division should truncate toward zero, which means losing its fractional part. For example, truncate(8.345) = 8 and truncate(-2.7335) = -2.

Example 1:

Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = truncate(3.33333..) = 3.
Example 2:

Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7/-3 = truncate(-2.33333..) = -2.
Note:

Both dividend and divisor will be 32-bit signed integers.
The divisor will never be 0.
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 231 − 1 when the division result overflows.
*/

/**
 * @param {number} dividend
 * @param {number} divisor
 * @return {number}
 */

const divide = (dividend, divisor) => {
    // JS max integer edge case
    if (dividend === -2147483648 && divisor === -1) {
        return 2147483647;
    }

    const absoluteDividend = Math.abs(dividend);
    const absoluteDivisor = Math.abs(divisor);

    // dividend 0 edge case
    if (absoluteDivisor > absoluteDividend) {
        return 0;
    };

    const dividendNegative = dividend < 0;
    const divisorNegative = divisor < 0;
    const resultShouldBeNegative = (dividendNegative !== divisorNegative);

    // divisor 1 or -1 edge case
    if (absoluteDivisor === 1) {
        if (resultShouldBeNegative) {
            return 0 - absoluteDividend;
        } else {
            return absoluteDividend;
        }
    }

    // dividend equals divisor edge case
    if (absoluteDividend === absoluteDivisor) {
        if (resultShouldBeNegative) {
            return -1;
        } else {
            return 1;
        }
    }

    // actual divison
    let divisonStore = 0;
    let divisionTimes = 0;

    // we want to go over the dividend, this covers all types of dividend remainder edge cases
    // ex: 5/2 and 5/3
    while (divisonStore <= absoluteDividend) {
        divisionTimes += 1;
        divisonStore += absoluteDivisor;
    }

    // we offset the answer by 1, to account for the fact that we go over the dividend
    if (resultShouldBeNegative) {
        return 1 - divisionTimes;
    }

    return divisionTimes - 1;
};