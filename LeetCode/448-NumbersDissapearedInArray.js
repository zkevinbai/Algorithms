/* 
Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.

Find all the elements of [1, n] inclusive that do not appear in this array.

Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.

Example:

Input:
[4,3,2,7,8,2,3,1]

Output:
[5,6]
*/

const findDisappearedNumbers = (nums) => {
    const disapeared = [];

    const sortedNumbers = numbers.sort();

    let value = 1;
    for (let i = 0; i < sortedNumbers.length; i++) {
        const number = sortedNumbers[i];
        const nextNumber = sortedNumbers[i + 1];

        if (value === nextNumber && value === number) {
            i += 1;
            value += 1;
        } else if ( value === number ) {
            value += 1;
        } else {
            disapeared.push(value);
            value += 1;
        }
    }

    return disapeared;
};