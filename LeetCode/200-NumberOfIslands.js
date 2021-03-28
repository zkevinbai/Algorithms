/*
200. Number of Islands
Medium

8008

241

Add to List

Share
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.



Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3


Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.
*/

/*
solution

key is that you cannot get from one island to another

navigate from the first 1 we see, going right and down if those are 1s 
check for duplicates using a visited object
keep going using a queue / BFS 
count that as 1 island

dont count previously seen 1's as they are already part of an island
*/

const numIslands = (grid) => {
    const visited = {};
    let islandCount = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const position = '' + i + j;
            const value = grid[i][j];

            if (visited[position]) {
                continue;
            } else if (value === '1') {
                const queue = [[i, j]];

                while (queue.length) {
                    const shift = queue.shift();
                    const shiftI = shift[0];
                    const shiftJ = shift[1];
                    const shiftPos = '' + shiftI + shiftJ;

                    if (
                        !visited[shiftPos] && // right of down is the same as down of right
                        shiftI !== grid.length - 1 && // stop at the edge
                        shiftJ !== grid.length - 1
                    ) {
                        const down = grid[shiftI + 1][shiftJ];
                        const right = grid[shiftI][shiftJ + 1];

                        if (down === '1') queue.push([shiftI + 1, shiftJ]);
                        if (right === '1') queue.push([shiftI, shiftJ + 1]);
                    }

                    visited[shiftPos] = true;
                }

                islandCount += 1;
            } else if (value === '0') {
                continue;
            }
        }
    }

    return islandCount;
};