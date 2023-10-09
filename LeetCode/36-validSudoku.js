/*
https://leetcode.com/problems/valid-sudoku/description/

Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true

board.length == 9
board[i].length == 9
board[i][j] is a digit 1-9 or '.'.

notes
if there is a repeat number in a row, then not valid
if there is a repeat in a column, then not valid

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
*/

var isValidSudoku = function (board) {

    // check the rows
    const checkRowValid = (row) => {
        const numbers = {}
        for (let i = 0; i < row.length; i++) {
            const num = row[i]

            if (num in numbers && num !== '.') {
                return false
            } else {
                numbers[num] = true
            }
        }

        return true
    }

    for (const row of board) {
        if (!checkRowValid(row)){
            return false
        }
    }

    // check the columns
    const getColumns = (boardRows) => {
        const numRows = boardRows.length
        const numColumns = boardRows[0].length
        const columns = Array.from({ length: numColumns }, () => [])

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numColumns; j++) {
                columns[j].push(boardRows[i][j])
            }
        }

        return columns
    }

    const columns = getColumns(board)

    for (const column of columns) {
        if (!checkRowValid(column)) {
            return false
        }
    }

    // check the subgrids
    const checkSubGrid = (startingRow, startingColumn) => {
        const numbers = {}
        for (let i = startingRow; i < startingRow + 3; i++) {
            for (let j = startingColumn; j < startingColumn + 3; j++) {
                const num = board[i][j]
                if (num in numbers && num !== '.') {
                    return false
                } else {
                    numbers[num] = true
                }
            }
        }

        return true
    }


    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            if (!checkSubGrid(i, j)) {
                return false
            }
        }
    }

    return true
};