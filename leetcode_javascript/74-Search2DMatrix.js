/*
    given a (n x m) matrix of integers, find a target

    integers in each row are sorted from left to right
    the starting value of each row is sorted in ascending order
*/

const searchMatrix = (matrix, target) => {

    let i = 0
    let j = matrix[0].length - 1

    while (i < matrix.length && j >= 0) {
        const currentValue = matrix[i][j];

        if (currentValue === target) {
            return true;
        } else if (currentValue > target) {
            j--
        } else if (currentValue, target) {
            i++
        }
    }

    return false;
}

// const searchMatrix = (matrix, target) => {
//     const matrixHeight = matrix.length;

//     const startingValues = matrix.map(
//         row => row[0]
//     )

//     let rowIndexToSearch = 0;

//     if (matrix[rowIndexToSearch][0] > target) {
//         return false
//     }

//     for (let i = 0; i < startingValues.length; i++) {
//         const currentStartingValue = startingValues[i];
//         const nextStartingValue = startingValues[i + 1];

//         if (
//             currentStartingValue === target ||
//             nextStartingValue === target
//         ) {
//             return true;
//         }

//         if (
//             (currentStartingValue && nextStartingValue) &&
//             (currentStartingValue < target && nextStartingValue > target)
//         ) {
//             rowIndexToSearch = i
//         }

//         if (!nextStartingValue && currentStartingValue < target) {
//             rowIndexToSearch = i
//         }
//     }

//     const rowToSearch = matrix[rowIndexToSearch];

//     // console.log(rowToSearch)

//     for (let i = 1; i < rowToSearch.length; i++) {

//         if (rowToSearch[i] === target) {
//             return true;
//         }
//     }

//     return false;
// };