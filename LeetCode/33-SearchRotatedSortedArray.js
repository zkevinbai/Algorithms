/*
You are given an integer array nums sorted in ascending order, and an integer target.

Suppose that nums is rotated at some pivot unknown to you beforehand (i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

If target is found in the array return its index, otherwise, return -1.



Example 1:

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
Example 2:
                + + + - + +
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
Example 3:

Input: nums = [1], target = 0
Output: -1


Constraints:

1 <= nums.length <= 5000
-10^4 <= nums[i] <= 10^4
All values of nums are unique.
nums is guranteed to be rotated at some pivot.
-10^4 <= target <= 10^4

edge cases to cover
[1,2,3], 8
[1,2,3], 0
[1,3,5], 4
[1, 2, 3, 4, 5, 6, 7], 6
*/

// this is asking for array.indexOf(target)

// Approach
// find the pivot
// binary search the two halves afterwards

const findPivot = (array) => {
    let index = 0;

    while (array[index] < array[index + 1]) {
        index += 1;
    }

    return index + 1;
}

const binarySearch = (array, target) => {
    if (!array.length) return -1;
    if (array.length === 1 && array[0] !== target) return -1;

    const pivotIndex = Math.floor(array.length / 2);
    const pivotVal = array[pivotIndex];

    const leftArray = array.slice(0, pivotIndex);
    const rightArray = array.slice(pivotIndex, array.length);

    if (pivotVal === target) {
        return pivotIndex;
    } else if (pivotVal < target) {
        const rightSearch = binarySearch(rightArray, target);
        if (rightSearch > 0) {
            return pivotIndex + rightSearch;
        } else {
            return -1;
        }
    } else if (pivotVal > target) {
        return binarySearch(leftArray, target);
    }
}

const search = (nums, target) => {
    const pivot = findPivot(nums);
    if (nums[0] === target) return 0;

    const rightOfPivot = nums.slice(pivot, nums.length);
    const leftOfPivot = nums.slice(0, pivot);

    if (rightOfPivot[rightOfPivot.length - 1] < target || !rightOfPivot.length) {
        return binarySearch(leftOfPivot, target);
    } else {
        const searchRight = binarySearch(rightOfPivot, target);
        if (searchRight >= 0) {
            return searchRight + pivot;
        } else {
            return -1;
        }
    }
};

// ----

const searchV2 = (nums, target) => {
    const pivot = findPivot(nums);
    if (nums[0] === target) return 0;

    const rightOfPivot = nums.slice(pivot, nums.length);
    const leftOfPivot = nums.slice(0, pivot);

    const preSearchData = {
        pivot,
        leftOfPivot,
        rightOfPivot,
    }
    console.log(JSON.stringify(preSearchData));

    if (rightOfPivot[rightOfPivot.length - 1] < target || !rightOfPivot.length) {
        console.log('hello')
        return binarySearch(leftOfPivot, target);
    } else {
        const searchRight = binarySearch(rightOfPivot, target);
        if (searchRight >= 0) {
            return searchRight + pivot;
        } else {
            return -1;
        }
    }
};

const searchV1 = (nums, target) => {
    const pivot = findPivot(nums);

    const rightOfPivot = nums.slice(pivot, nums.length);
    const leftOfPivot = nums.slice(0, pivot);

    const preSearchData = {
        pivot,
        leftOfPivot,
        rightOfPivot,
    }
    console.log(JSON.stringify(preSearchData));

    const searchLeft = binarySearch(leftOfPivot, target);
    const searchRight = binarySearch(rightOfPivot, target);

    const postSearchData = {
        searchLeft,
        searchRight,
    }
    console.log(JSON.stringify(postSearchData));

    if (searchLeft >= 0) {
        return searchLeft;
    } else if (searchRight >= 0) {
        return searchRight + pivot;
    } else {
        return -1;
    }
};

let binarySearchV1 = (array, target) => {
    if (!array.length) {
        return -1;
    }

    if (array.length === 1 && array[0] !== target) {
        return -1;
    }

    const pivotIndex = Math.floor(array.length / 2);
    const pivotVal = array[pivotIndex];
    const data = {
        array,
        pivotIndex,
        pivotVal,
    }
    console.log(JSON.stringify(data));

    const leftArray = array.slice(0, pivotIndex);
    const rightArray = array.slice(pivotIndex, array.length);

    if (pivotVal === target) {
        return pivotIndex;
    } else if (pivotVal < target) {
        const rightSearch = binarySearch(rightArray, target);
        if (rightSearch > 0) {
            return pivotIndex + rightSearch;
        } else {
            return -1;
        }
    } else if (pivotVal > target) {
        return binarySearch(leftArray, target);
    }
}

const iterativeBinarySearch = (array, target) => {
    if (!array.length) {
        return -1;
    }

    let pivotIndex = Math.floor(array.length / 2);

    const pivotIndices = {};

    while (array[pivotIndex] !== target) {
        debugger;
        // covers the too big and too small edge cases, and the back and forth
        // the first rule is not necessary because of pivot indices
        if (pivotIndex === 0 ||
            pivotIndex > array.length - 1 ||
            pivotIndices[pivotIndex]) {
            return -1;
        }
        // it is important we set this here, or this would return -1 immediately;
        pivotIndices[pivotIndex] = true;

        if (array[pivotIndex] > target) {
            pivotIndex = Math.floor(pivotIndex / 2);
        } else {
            pivotIndex = pivotIndex + (Math.floor(pivotIndex / 2) || 1);
        }
    }

    return pivotIndex;
}
/*
----
Other people's approaches to consider


// var search = function (nums, target) {
//     let left = 0;
//     let right = nums.length - 1;

//     while (nums[right] < nums[left]) {
//         right--;
//     }

//     if (target < nums[0]) {
//         left = right + 1;
//         right = nums.length - 1;
//     }

//     return binSearch(nums, target, left, right);
// };

// const binSearch = function (nums, target, left, right) {
//     let l = left;
//     let r = right;

//     while (l <= r) {
//         let mid = Math.floor((l + r) / 2);

//         if (nums[mid] === target) {
//             return mid;
//         } else if (target < nums[mid]) {
//             r = mid - 1;
//         } else {
//             l = mid + 1;
//         }
//     }

//     return -1;
// }

var search = function(nums, target) {
let n = nums.length
if(n==0) return -1
    if(n==1) return nums[0] == target? 0: -1

    let rotateindex = FindRotateIndex(nums,0,n-1)

    if(nums[rotateindex] == target) return rotateindex

     if (rotateindex == 0)
      return BinarySearch(nums,0, n - 1,target);

    if(target < nums[0]) return BinarySearch(nums,rotateindex,n-1,target)

    // if(target > nums[0])
        return BinarySearch(nums,0,rotateindex,target)


};

var FindRotateIndex = function(nums,left,right){
    if (nums[left] < nums[right])
      return 0;

    while (left <= right) {
      let pivot = left + Math.floor((right- left ) / 2);
      if (nums[pivot] > nums[pivot + 1])
        return pivot + 1;
      else {
        if (nums[pivot] < nums[left])
          right = pivot - 1;
        else
          left = pivot + 1;
      }
    }
    return 0;
}

var BinarySearch = function(nums, left, right,target){



    while (left <= right) {
        let mid = left + Math.floor((right - left) / 2)

        if (nums[mid] == target) {
            return mid
        }

        if ( nums[mid] < target) {
            left = mid +1
        } else {
            right = mid - 1
        }

    }

    return -1
}
*/