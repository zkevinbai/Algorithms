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
            columns[j].push( row[j] )
        }
    }

    for (let i = 0; i < columns.length; i++) {
        const row = columns[i];
        if (!rowChecker(row)) return false;
    }  

    let subgrids = subGrids(grid);

    for (let i = 0; i < subgrids.length; i++) {
        const row = subgrids[i];
        if (!rowChecker(row)) return false;
    }

    return true;
}

function rowChecker(rowArr) {
    let rowSet = new Set();
    for (let i = 0; i < rowArr.length; i++) {
        const number = rowArr[i];

        if (rowSet.has(number) && number !== ".") return false;

        rowSet.add(number)
    }
    return true;
}

function subGrids(grid) {

    let subgrids = [];

    let topThree = [[], [], []];
    for (let i = 0; i < 3; i++) {
        const row = grid[i];
        for (let j = 0; j < 3; j++) {
            topThree[j] = topThree[j].concat(row.slice(j * 3, j * 3 + 3))
        }
    }
    subgrids = subgrids.concat(topThree);

    let midThree = [[], [], []];
    for (let i = 3; i < 6; i++) {
        const row = grid[i];
        for (let j = 0; j < 3; j++) {
            midThree[j] = midThree[j].concat(row.slice(j * 3, j * 3 + 3))
        }
    }
    subgrids = subgrids.concat(midThree);

    let bottomThree = [[], [], []];
    for (let i = 6; i < 9; i++) {
        const row = grid[i];
        for (let j = 0; j < 3; j++) {
            bottomThree[j] = bottomThree[j].concat(row.slice(j * 3, j * 3 + 3))
        }
    }
    subgrids = subgrids.concat(bottomThree);

    return subgrids;
}

const grid = [
[".", ".", "4", ".", ".", ".", "6", "3", "."],
[".", ".", ".", ".", ".", ".", ".", ".", "."],
["5", ".", ".", ".", ".", ".", ".", "9", "."],
[".", ".", ".", "5", "6", ".", ".", ".", "."],
["4", ".", "3", ".", ".", ".", ".", ".", "1"],
[".", ".", ".", "7", ".", ".", ".", ".", "."],
[".", ".", ".", "5", ".", ".", ".", ".", "."],
[".", ".", ".", ".", ".", ".", ".", ".", "."],
[".", ".", ".", ".", ".", ".", ".", ".", "."]
];

// Gets all grids
// function sudokuChecker(grid) {

//     let subgrids = [];

//     let topThree = [[], [], []];
//     for (let i = 0; i < 3; i++) {
//         const row = grid[i];
//         for (let j = 0; j < 3; j++) {
//             topThree[j].push(row.slice(j * 3, j * 3 + 3))
//         }
//     }
//     subgrids = subgrids.concat(topThree);

//     let midThree = [[], [], []];
//     for (let i = 3; i < 6; i++) {
//         const row = grid[i];
//         for (let j = 0; j < 3; j++) {
//             midThree[j].push(row.slice(j * 3, j * 3 + 3))
//         }
//     }
//     subgrids = subgrids.concat(midThree);

//     let bottomThree = [[], [], []];
//     for (let i = 6; i < 9; i++) {
//         const row = grid[i];
//         for (let j = 0; j < 3; j++) {
//             bottomThree[j].push(row.slice(j * 3, j * 3 + 3))
//         }
//     }
//     subgrids = subgrids.concat(bottomThree);

//     return subgrids;
// }

// After
0: 0: [0, 1, 2],   1: [0, 1, 2],   2: [0, 1, 2],]
1: 0: [3, 4, 5],   1: [3, 4, 5],   2: [3, 4, 5],]
2: 0: [6, 7, 8],   1: [6, 7, 8],   2: [6, 7, 8],]

3: 3: [0, 1, 2],   4: [0, 1, 2],   5: [0, 1, 2],]
4: 3: [3, 4, 5],   4: [3, 4, 5],   5: [3, 4, 5],]
5: 3: [6, 7, 8],   4: [6, 7, 8],   5: [6, 7, 8],]

6: 6: [0, 1, 2],   7: [0, 1, 2],   8: [0, 1, 2],]
7: 6: [3, 4, 5],   7: [3, 4, 5],   8: [3, 4, 5],]
8: 6: [6, 7, 8],   7: [6, 7, 8],   8: [6, 7, 8],]

// Before
0: [0, 1, 2,    3, 4, 5,    6, 7, 8]
1: [0, 1, 2,    3, 4, 5,    6, 7, 8]
2: [0, 1, 2,    3, 4, 5,    6, 7, 8]

3: [0, 1, 2,    3, 4, 5,    6, 7, 8]
4: [0, 1, 2,    3, 4, 5,    6, 7, 8]
5: [0, 1, 2,    3, 4, 5,    6, 7, 8]

6: [0, 1, 2,    3, 4, 5,    6, 7, 8]
7: [0, 1, 2,    3, 4, 5,    6, 7, 8]
8: [0, 1, 2,    3, 4, 5,    6, 7, 8]


const grid = [
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

// function sudokuChecker(grid) {

//     let subgrids = [];

//     let topThree = [[], [], []];
//     for (let i = 0; i < 3; i++) {
//         const row = grid[i];
//         for (let j = 0; j < 3; j++) {
//             topThree[j].push(row.slice(j * 3, j * 3 + 3))
//         }
//     }
//     subgrids.push(topThree);

//     return subgrids;
// }