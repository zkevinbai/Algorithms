/*

Given a non negative integer number num. For every numbers i in the range 0 ≤ i ≤ num calculate the number of 1's in their binary representation and return them as an array.

Example 1:

Input: 2
Output: [0,1,1]
Example 2:

Input: 5
Output: [0,1,1,2,1,2]
Follow up:

It is very easy to come up with a solution with run time O(n*sizeof(integer)). But can you do it in linear time O(n) /possibly in a single pass?
Space complexity should be O(n).
Can you do it like a boss? Do it without using any builtin function like __builtin_popcount in c++ or in any other language.


translated to english
from 0 up to n, convert to binary and count the 1's

*/

function toBinary (integer) {
    let workingNumber = integer;
    let binaryNumber = "";

    while (workingNumber !== 0) {
        let remainder = workingNumber % 2;

        binaryNumber = remainder + binaryNumber;

        workingNumber = parseInt(workingNumber / 2);
    }

    console.log(binaryNumber);

    return binaryNumber;
}

function countOnes(string) {
    return (string.match(/1/g) || []).length;
}

function countBits(num) {
    const countArray = [];

    for (let i = 0; i <= num; i++) {
        const binaryNum = toBinary(i);
        const bits = countOnes(binaryNum);
        countArray.push(bits);
    }

    return countArray;
};