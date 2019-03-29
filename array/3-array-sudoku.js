// objective is to fill a 9 × 9 grid with numbers in such a way that
    // each column, row, and 3 x 3 subgrid contains the numbers 1 - 9

// Input: 9x9 2D array
// Output: boolean determining if this is a valid sudoku puzzle

function sudoku2(grid) {
    let columns = new Array( 9 );

    for (let i = 0; i < columns.length; i++) {
        columns[i] = [];
    }

    for (let i = 0; i < grid.length; i++) {
        const row = grid[i];
        if (!rowChecker(row)) return false;

        for (let j = 0; j < row.length; j++) {
            columns[j].push( row[i] )
        }
    }

    for (let i = 0; i < columns.length; i++) {
        const row = columns[i];
        if (!rowChecker(row)) return false;
    }  

    return sudokuChecker(grid);
}

function rowChecker(rowArr) {
    let rowSet = new Set();
    for (let i = 0; i < rowArr.length; i++) {
        const number = rowArr[i];

        if (rowSet.has(number)) return false;

        rowSet.add(number)
    }
    return true;
}

function sudokuChecker(grid) {

}

0: [0, 1, 2],   1: [0, 1, 2],   2: [0, 1, 2],]
0: [3, 4, 5],   1: [3, 4, 5],   2: [3, 4, 5],]
0: [6, 7, 8],   1: [6, 7, 8],   2: [6, 7, 8],]

3: [0, 1, 2],   4: [0, 1, 2],   5: [0, 1, 2],]
3: [3, 4, 5],   4: [3, 4, 5],   5: [3, 4, 5],]
3: [6, 7, 8],   4: [6, 7, 8],   5: [6, 7, 8],]

6: [0, 1, 2],   7: [0, 1, 2],   8: [0, 1, 2],]
6: [3, 4, 5],   7: [3, 4, 5],   8: [3, 4, 5],]
6: [6, 7, 8],   7: [6, 7, 8],   8: [6, 7, 8],]

0: [0, 1, 2, 3, 4, 5, 6, 7, 8]
1: [0, 1, 2, 3, 4, 5, 6, 7, 8]
2: [0, 1, 2, 3, 4, 5, 6, 7, 8]
3: [0, 1, 2, 3, 4, 5, 6, 7, 8]
4: [0, 1, 2, 3, 4, 5, 6, 7, 8]
5: [0, 1, 2, 3, 4, 5, 6, 7, 8]
6: [0, 1, 2, 3, 4, 5, 6, 7, 8]
7: [0, 1, 2, 3, 4, 5, 6, 7, 8]
8: [0, 1, 2, 3, 4, 5, 6, 7, 8]






grid = [
    ['.', '.', '.', '1', '4', '.', '.', '2', '.'],
    ['.', '.', '6', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '1', '.', '.', '.', '.', '.', '.'],
    ['.', '6', '7', '.', '.', '.', '.', '.', '9'],
    ['.', '.', '.', '.', '.', '.', '8', '1', '.'],
    ['.', '3', '.', '.', '.', '.', '.', '.', '6'],
    ['.', '.', '.', '.', '.', '7', '.', '.', '.'],
    ['.', '.', '.', '5', '.', '.', '.', '7', '.']
]

