/* demo
This is a demo task.

Write a function:

function solution(A);

that, given an array A of N integers, returns the smallest positive integer (greater than 0) that does not occur in A.

For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.

Given A = [1, 2, 3], the function should return 4.

Given A = [−1, −3], the function should return 1.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..100,000];
each element of array A is an integer within the range [−1,000,000..1,000,000].
Copyright 2009–2021 by Codility Limited. All Rights Reserved. Unauthorized copying, publication or disclosure prohibited.
*/


function solution(A) {
    const nums = {};

    A.forEach((number) => nums[number] = true);

    let currentNum = 1;
    while (nums[currentNum]) {
        currentNum += 1;
    }

    return currentNum;
}


/* 1, debug */

/* 2 

return sign of product of all nums

*/

function solution(A) {
    let product = 1;

    A.forEach((number) => product *= number);

    if (product > 0) return 1; 
    if (product < 0) return -1; 
    return 0;
}

/* 3 multiple choice */

/* 4 Binary tree

return the number of visible nodes in a binary tree

visible means, for a node with value v, a path exists from the root

that does not contain a value greater than v

obj.x = value
obj.r = right
obj.l = left
*/ 

function kthSmallestInBST(t, k) {
    let values = [];

    let queue = [t];

    while (queue.length) {
        let shift = queue.shift();
        values.push(shift.value);

        if (shift.left) {
            queue.push(shift.left)
        }
        if (shift.right) {
            queue.push(shift.right)
        }
    }

    return values.sort((a, b) => a - b)[k - 1];
}
