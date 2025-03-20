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
dynamic programming approach
*/

function numSquares(n) {

    // General strategy is to build up a memoization array with the smallest amount of squares needed to make the number at each index
    // since the only square in the beginning is 1, until we see 4, it's very boring:
    // to make 1, we use 1, to make 2 we use two 1's, to make 3, we use three 1's
    // mem[1] = 1, d[2] = 2, mem[3] = 3
    // initially, mem[4] will also use 1s and end up at 4
    // but now we can consider 2^2 too since the inner loop now allows it
    // we then compare, is what we have calculated so far better? or using this new square?
    // To answer that, we subtract the current square (4) from i (4) and look up in our mem lookup to see how many steps that took
    // mem[0] is zero of course, so we end up with Math.min(4, 0 + 1). The 2nd is less of course, so we set mem[4] to 1

    // Our memory lookup. Others often name this 'dp'
    let mem = [0];
    let i, j;

    // Outer loop, where we build up till we reach n
    for (i = 1; i <= n; i++) {

        // Initially, we have no idea how many steps it will take
        mem[i] = Infinity;

        // Now loop over all squares that are smaller or equal to the current i.
        for (j = 1; j * j <= i; j++) {

            // The smallest amount of squares is either what we already have, or what we can build with a new square and remainder
            // the new square is going to be 1 "square away"
            // if current j^2 is 4, we need to go i - 4 to get to the previous 1 "4" away number
            // we then add 1 to represent the distance between i - 4 and i
            mem[i] = Math.min(mem[i], mem[i - j * j] + 1)
        }


    }
    // console.log(mem)
    return mem[n];
}

/*
----------------------------------------------------------------------------------
initial attempt
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

const numSquaresSimple = (num) => {
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

/*
----------------------------------------------------------------------------------
insane math based solution, faster than everything else
https://leetcode.com/problems/perfect-squares/discuss/476318/Math-solution-explained%3A-Beats-100-Javascript-%2B-Whiteboard
Lagrange's theorem for four squares states:
Every number can be written as the sum of four squares of integers
so my potential answers are 0,1,2,3,4

0 never happens because there's always an answer
1 happens when the number itself is a valid square
So 2,3,4 are the only available solutions.
Legendre's three square theorem states:
A number n can be written as the sum of at most three squares if n =/= 4^a (8*b+7)

So I can immediately deduce if it can be written as a sum of 4 if n==4^a (8*b+7), by contradicting the above Theorem.
All I have to do is divide n by 4 as many times as possible and mod8 the final result, to test if result%8==7
If result%8==7, Legendre's theorem is contradicted and my number cannot be written as a sum of (at most) three squares. Therefore utilizing Lagrange's theorem, my solution is immediately 4.

Otherwise, having ruled out the option 4, I have 2 and 3 remaining as the potential solutions.

I can manually check If It's a sum of 2 numbers:
say that n=a^2 +b^2 then I can easily find a^2 If i search for every number less than n.
If i happen to find any number x, such that n-x*x is a valid square, then i m done, because
n =x^2 + (n-x^2)^2 (a sum of 2 squares)

Having ruled out the solution 2, only 3 remains as the only solution

Here's a whiteboard recap:
image
*/

var numSquaresMath = n => {

    //returns if the number x is a valid square root ( can be represented as the square of an integer)
    let isSquare = x => Math.floor(Math.sqrt(x)) ** 2 === x

    if (isSquare(n))
        return 1 // that would be the fact that its equal to itself

    // Legendre's three square theorem: A natural number n can be represented as
    // the sum of AT MOST three squares of integers if and only if : n!= 4^x ( 8*m+7)
    while (n % 4 === 0)
        n /= 4
    //Try contradicting Legendre
    if (n % 8 === 7)
        return 4

    // Manually checking for result 2, because Legendre states  AT MOST 3,
    // so 2 is possible aswell
    for (let i = 0; i <= n; i++)
        // if x=n-i*i   and x is a valid square then OBVIOUSLY
        // n=i^2 +sqrt(x)^2  ,so n is a square of two numbers
        if (isSquare(n - i * i))
            return 2

    // Legendre applies
    return 3
}