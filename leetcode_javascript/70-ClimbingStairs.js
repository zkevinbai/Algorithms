/*
You are climbing a stair case.It takes n steps to reach to the top.

Each time you can either climb 1 or 2 steps.In how many distinct ways can you climb to the top ?

Example 1:
Input: 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps

Example 2:
Input: 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step

4
    1 1 1 1
    1 1 2
    1 2 1
    2 1 1
    2 2
5 steps

5
8 steps

6
13 steps

Constraints:
1 <= n <= 45
*/

// this is the fibonacci sequence
//   1 2 3
// 1 1 2 3 5 8 13

// const fibonacci = function (n) {
//     if (n === 1) {
//         return 1;
//     }
//     if (n === 2) {
//         return 1;
//     }

//     return fibonacci(n - 1) + fibonacci(n - 2);
// };

// const climbStairs = function (n) {
//     return fibonacci(n + 1);
// };

// const climbStairs = function (n) {
//     if (n === 1) {
//         return 1;
//     }
//     if (n === 2) {
//         return 2;
//     }
//     if (n === 3) {
//         return 3;
//     }

//     return climbStairs(n - 1) + climbStairs(n - 2);
// };

// clean recursive solution
// const climbStairs = function (n) {
//     if (n < 4) {
//         return n;
//     }

//     return climbStairs(n - 1) + climbStairs(n - 2);
// };

// optimized solution
const climbStairs = function (n) {
    if (n < 4) {
        return n;
    }

    const steps = [1, 1, 2, 3];

    for (let i = 4; i <= n; i++) {
        steps[i] = steps[i - 1] + steps[i - 2];
    }

    return steps[n];
};
