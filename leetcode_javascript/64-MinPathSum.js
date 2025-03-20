/*
64. MinPathSum

Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example 1:


Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
Example 2:

Input: grid = [[1,2,3],[4,5,6]]
Output: 12


Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 200
0 <= grid[i][j] <= 100
*/

/*
// TLDR JS Array.fill uses pass by reference
every thing that you are filling is a duplicate
const whatIsGoingOn = () => {
    const m = 2;
    const n = 2;
    const newGrid = Array(m).fill(Array(n).fill(0));
    newGrid.forEach((arr, idx) => newGrid[idx] = arr.slice(0))

    newGrid[0][0] = 54;

    // console.log(newGrid)
    return newGrid;
};

console.log(whatIsGoingOn());
//[ [ 54, 0 ], [ 54, 0 ] ]

const newGrid = Array.from({length: m}, e => Array(n).fill(0));
*/

const minPathSumNoMutation = (grid) => {
    const m = grid.length;
    const n = grid[0].length;
    const newGrid = Array.from({ length: m }, e => Array(n).fill(0));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            const gridVal = grid[i][j];
            if (i === 0 && j === 0) {
                console.log('One')
                newGrid[i][j] = gridVal;
                console.log(newGrid)
            } else if (i === 0) {
                console.log('Two', gridVal, newGrid[i][j - 1])
                newGrid[i][j] = gridVal + newGrid[i][j - 1];
                console.log(newGrid[0][1])
            } else if (j === 0) {
                console.log('Three')
                newGrid[i][j] = gridVal + newGrid[i - 1][j];
            } else {
                console.log('Four')
                newGrid[i][j] = gridVal + Math.min(newGrid[i][j - 1], newGrid[i - 1][j]);
            }

            console.log(newGrid[0][0], newGrid[0][1], newGrid[1][0], newGrid[1][1]);
        }
    }

    return newGrid[m - 1][n - 1];
};


const minPathSum = (grid) => {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (i === 0 && j === 0) {
                continue;
            } else if (i === 0) {
                grid[i][j] += grid[i][j - 1];
            } else if (j === 0) {
                grid[i][j] += grid[i - 1][j];
            } else {
                grid[i][j] += Math.min(grid[i][j - 1], grid[i - 1][j]);
            }
        }
    }

    // console.log(grid);

    return grid[grid.length - 1][grid[0].length - 1];
};