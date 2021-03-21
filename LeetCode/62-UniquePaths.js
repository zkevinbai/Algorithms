/*
62. Unique Paths
Medium

4746

240

Add to List

Share
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?

Example 1:


Input: m = 3, n = 7
Output: 28
Example 2:

Input: m = 3, n = 2
Output: 3
Explanation:
From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
1. Right -> Down -> Down
2. Down -> Down -> Right
3. Down -> Right -> Down
Example 3:

Input: m = 7, n = 3
Output: 28
Example 4:

Input: m = 3, n = 3
Output: 6


Constraints:

1 <= m, n <= 100
It's guaranteed that the answer will be less than or equal to 2 * 109.
*/

/*
dynamic programming solution

build the board one square at a time
moving left to right, top from down
memoize the potential unique paths of each square 
use addition to get the total uniques 

*/

const uniquePaths = (m, n) => {
    const board = Array(m).fill(Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 || j === 0) {
                board[i][j] = 1;
            } else {
                const top = board[i][j - 1];
                const left = board[i - 1][j];
                board[i][j] = top + left;
            }
        }
    }

    return board[m -1][n - 1];
}

/*
solution
m = height of box
n = width of box

starting position is always (0, 0)
DFS to get all possible paths

increment path count each time there is a solution;

too slow
*/
const uniquePaths = (m, n) => {
    let stack = [[1, 1]];

    let paths = 0;

    while (stack.length) {
        const position = stack.shift();
        const x = position[0];
        const y = position[1];

        let newPosition;

        if (x === n && y === m) {
            paths += 1;
        } else {

            if (x < n) {
                newPosition = [x + 1, y];
                stack.unshift(newPosition);
            }

            if (y < m) {
                newPosition = [x, y + 1];
                stack.unshift(newPosition);
            }

        }

    }

    return paths;
}