/*
48. Rotate Image
Medium

You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. 
DO NOT allocate another 2D matrix and do the rotation.

Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]

Example 2:
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

Example 3:
Input: matrix = [[1]]
Output: [[1]]

Example 4:
Input: matrix = [[1,2],[3,4]]
Output: [[3,1],[4,2]]

Constraints:
matrix.length == n
matrix[i].length == n
1 <= n <= 20
-1000 <= matrix[i][j] <= 1000
*/

/*
solution

Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
                    3        2        1

Output: [[7,4,1],[8,5,2],[9,6,3]]
          7       8       9    

go backwards 
and then shift and push n times, where n is the length of the subArray


Your input
[[1,2,3],[4,5,6],[7,8,9]]

7 [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 8, 9 ] ]
8 [ [ 1, 2, 3, 7 ], [ 4, 5, 6 ], [ 9 ] ]
9 [ [ 1, 2, 3, 7 ], [ 4, 5, 6, 8 ], [] ]
4 [ [ 1, 2, 3, 7 ], [ 5, 6, 8 ], [ 9 ] ]
5 [ [ 1, 2, 3, 7, 4 ], [ 6, 8 ], [ 9 ] ]
6 [ [ 1, 2, 3, 7, 4 ], [ 8, 5 ], [ 9 ] ]
1 [ [ 2, 3, 7, 4 ], [ 8, 5 ], [ 9, 6 ] ]
2 [ [ 3, 7, 4, 1 ], [ 8, 5 ], [ 9, 6 ] ]
3 [ [ 7, 4, 1 ], [ 8, 5, 2 ], [ 9, 6 ] ]

Output
[[7,4,1],[8,5,2],[9,6,3]]
*/
const rotate = function (matrix) {

    const subArrayLength = matrix[0].length;

    for (let i = matrix.length - 1; i >= 0; i--) {
        let j = 0;

        while (j < subArrayLength) {
            let subArrNum = matrix[i].shift();
            // console.log(subArrayNum, matrix)
            matrix[j].push(subArrNum);

            j += 1;
        }
    }

    return matrix;
};

// going forwards, less intuitive
const rotateTraverseForwards = function (matrix) {

    const subArrayLength = matrix[0].length;

    for (let i = 0; i < matrix.length - 1; i++) {
        // current matrix

        let j = 0;

        while (j < subArrayLength) {
            let subArrNum = matrix[i].pop();

            matrix[j].unshift(subArrNum);

            j += 1;
        }
    }

    return matrix;
};