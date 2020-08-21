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
    if (Math.abs(divisor) > Math.abs(dividend)) {
        return 0;
    };

    const dividendNegative = dividend < 0;
    const divisorNegative = divisor < 0;
    const resultShouldBeNegative = (dividendNegative !== divisorNegative);

    console.log(resultShouldBeNegative)

    if (Math.abs(divisor) === 1) {
        if (resultShouldBeNegative) {
            return 0 - Math.abs(dividend);
        } else {
            return Math.abs(dividend);
        }
    }

    if (Math.abs(dividend) === Math.abs(divisor)) {
        if (resultShouldBeNegative) {
            return -1;
        } else {
            return 1;
        }
    }

    let divisonStore = divisor;
    let divisionTimes = 1;
    while (Math.abs(divisonStore) < Math.abs(dividend)) {
        divisionTimes += 1;

        for (i = 0; i < divisionTimes; i++) {
            divisonStore += divisor;
        }
    }

    if (resultShouldBeNegative) {
        return 0 - divisionTimes;
    }

    return divisionTimes;
};