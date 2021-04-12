/*
279. Perfect Squares
Medium

Share
Given an integer n, return the least number of perfect square numbers that sum to n.

A perfect square is an integer that is the square of an integer; in other words, it is the product of some integer with itself.For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

Example 1:
Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4.
Example 2:

Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.


Constraints:

1 <= n <= 104
*/

/*
the question is asking for the largest perfect squares that sum up to n

perfect squares to use
1
4
9
16
25
36
49
64
81

strategy, 
    find the largest perfect square that is smaller than num
    subtract that from num and keep going until num is 0

    this does not work for a case like 12, where we would have 
*/

const findLargestSquare = (num) => {
    if (num < 4) return 1;

    let square = 1;
    let number = 1;

    while (square < num) {
        number += 1;
        square = number * number;
    }

    if (square > num) return (number - 1) * (number - 1); // input 4 should output 4, not 9

    return square;
}

const numSquares = (num) => {
    let perfectSquaresUsed = 0;

    let n = num;

    while (n > 0) {
        const largestSquare = findLargestSquare(n);

        console.log('largest', largestSquare)

        perfectSquaresUsed += 1;
        n -= largestSquare;
        console.log(n)
    }

    return perfectSquaresUsed;
}

const test = 6;
console.log(findLargestSquare(test));