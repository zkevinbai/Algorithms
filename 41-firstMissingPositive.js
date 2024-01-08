// /**
//  * @param {number[]} nums
//  * @return {number}
//  */

// const firstMissingPositive = function (array) {

//     const arrayLength = array.length;

//     // 1 - Loop through 0 to n; Check for the value 1
//     let isOnePresent = false;
//     for (i = 0; i < arrayLength; i++) {
//         if (array[i] === 1) {
//             isOnePresent = true;
//             break;
//         };
//     };

//     if (!isOnePresent) {
//         return 1;
//     };

//     // 2 - Loop through 1 to array length; Replace all out of bound values with 1
//     for (i = 0; i < arrayLength; i++) {
//         if (array[i] > arrayLength + 1 || array[i] < 1) {
//             array[i] = 1;
//         };
//     };
//     console.log(array);

//     // 3 - Change index 0 to the value 1
//     // array[0] = 1;

//     // 4 - Loop through 1 to array length; Map each value which corresponds to an index to the value -1
//     for (i = 0; i < arrayLength; i++) {
//         const value = Math.abs(array[i]);

//         if (value === arrayLength) {
//             array[0] = -1;
//         } else if (value > 0 && value < arrayLength + 1) {
//             array[value] = -1 * Math.abs(array[value]);
//         };
//     };

//     console.log(array);

//     // 5 - Loop through 2 to array length; Return the index of the first positive number

//     for (i = 2; i < arrayLength; i++) {
//         if (array[i] > 0) {
//             return i;
//         }
//     };

//     // 6 - If all numbers are found,return array length + 1, else return array length
//     if (array[0] === -1) {
//         return arrayLength + 1;
//     } else {
//         return arrayLength;
//     }
// };

/** 
Runtime: 52 ms, faster than 92.66% of JavaScript online submissions for First Missing Positive.
Memory Usage: 34.9 MB, less than 58.33% of JavaScript online submissions for First Missing Positive.
**/

const firstMissingPositive = function (array) {

    const arrayLength = array.length;

    // ------------------------------------------------------------------
    // 1 - Loop from 0 to array length;
    // Check for the value 1;
    // If value 1 is not present, return 1;

    let isOnePresent = false;
    for (i = 0; i < arrayLength; i++) {
        if (array[i] === 1) {
            isOnePresent = true;
            break;
        };
    };

    if (!isOnePresent) {
        return 1;
    };

    // ------------------------------------------------------------------
    // 2 - Loop from 0 to array length;
    // Replace all out of bound values with 1

    for (i = 0; i < arrayLength; i++) {
        if (array[i] > arrayLength || array[i] < 1) {
            array[i] = 1;
        };
    };

    // ------------------------------------------------------------------
    // 3 - Loop from 0 to array length;
    // Get the absolute value;
    // Map the index of the absolute value to be negative;
    // If array length value is found, store it at the 0 index;

    for (i = 0; i < arrayLength; i++) {
        const value = Math.abs(array[i]);

        if (value === arrayLength) {
            array[0] = -1;
        } else if (value > 0 && value < arrayLength + 1) {
            array[value] = -1 * Math.abs(array[value]);
        };
    };

    // ------------------------------------------------------------------
    // 4 - Loop from 2 to array length;
    // Return the index of the first positive number;

    for (i = 2; i < arrayLength; i++) {
        if (array[i] > 0) {
            return i;
        }
    };

    // ------------------------------------------------------------------
    // 5 - If the array length value is found, return array length + 1;
    // Otherwise return array length;

    if (array[0] === -1) {
        return arrayLength + 1;
    } else {
        return arrayLength;
    }
};

/** 
No variables, ended up being slower
**/

// const firstMissingPositive = function (array) {

//     if (array.length < 1) {
//         return 1
//     }

//     // 1 - Loop through 0 to n; Check for the value 1
//     for (i = 0; i < array.length; i++) {
//         if (array[i] === 1) {
//             break;
//         }

//         if (i === array.length - 1) {
//             return 1;
//         }
//     };

//     // 2 - Loop through 1 to array length; Replace all out of bound values with 1
//     for (i = 0; i < array.length; i++) {
//         if (array[i] > array.length + 1 || array[i] < 1) {
//             array[i] = 1;
//         };
//     };

//     // 3 - Loop through 1 to array length; Map each value which corresponds to an index to the value -1
//     for (i = 0; i < array.length; i++) {
//         if (Math.abs(array[i]) === array.length) {
//             array[0] = -1;
//         } else if (Math.abs(array[i]) > 0 && Math.abs(array[i]) < array.length + 1) {
//             array[Math.abs(array[i])] = -1 * Math.abs(array[Math.abs(array[i])]);
//         };
//     };

//     // 4 - Loop through 2 to array length; Return the index of the first positive number
//     for (i = 2; i < array.length; i++) {
//         if (array[i] > 0) {
//             return i;
//         }
//     };

//     // 5 - If the max number is found, return array length + 1, else return array length
//     if (array[0] === -1) {
//         return array.length + 1;
//     } else {
//         return array.length;
//     }
// };