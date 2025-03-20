/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

/*
solution
    check current number and next number
    if target is inbtween, return index of next number
    
    if current is last index in array, return length of array
    
edge cases
    length of 1 or less
        1 is infront or fate
        
   0, 1, 2
    1 
    3 / 2 = 1.5 = 1
    
   [1, 2]
   
*/

const searchInsert = (nums, target) => {
  if (target < nums[0]) return 0
  else if (target > nums[nums.length - 1]) return nums.length

  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const mid = parseInt((start + end)/2);
    const guess = nums[mid];

    if (guess === target) {
      return mid
    }
    else if (guess > target) {
      end = mid - 1
    }
    else {
      start = mid + 1
    }
  }
  
  return start
};

// const searchInsert = (
//     nums,
//     target
// ) => {    
//     let low = 0
//     let high = nums.length
    
//     while (low < high) {
//         const midIndex = Math.floor((high - low)/ 2) + low;
//         const midVal = nums[midIndex];
        
//         const midNextIndex = midIndex + 1;
//         const midNextVal = nums[midNextIndex]
              
//         const midPrevIndex = midIndex - 1;
//         const midPrevVal = nums[midPrevIndex];
        
//         // console.log({
//         //     midVal, // 6
//         //     midNextVal, // undef
//         //     midPrevVal, // 5
//         // })
        
//         if (midVal === target) {
//             return midIndex;
//         } else if (
//             midVal < target &&
//             (!midNextVal || midNextVal > target)
//         ) {
//             return midIndex + 1;
//         } else if (
//             midVal > target &&
//             (!midPrevVal || midPrevVal < target)
//         ) {
//             return midIndex;
//         }
        
//         // if (
//         //     midNextIndex === nums.length
//         // ) {
//         //     return nums.length
//         // }
        
//         if (midVal > target) {
//             high = midIndex;
//             continue;
//         } else if (midVal < target) {
//             low = midIndex;
//         }
//     }
// }

// const recursiveSearchInsert = (
//     nums,
//     target
// ) => {
//     let midIndex = Math.floor(nums.length/ 2)
    
//     let midVal = nums[midIndex]
    
//     if (midVal === target) {
//         return midIndex
//     } 
    
// //     left midval right
    
//     if (midVal > target) {
//         return searchInsert(
//             nums.slice(0, midVal),
//             target
//         )
//     }
    
//     if (midVal < target) {
//         return searchInsert(
//             nums.slice(midVal, nums.length),
//             target
//         )
//     } 
// }

// const searchInsert = (
//     nums,
//     target
// ) => {
    
//     if (nums.length < 1) return 0;
    
//     let currentVal = nums[0]
        
//     if (nums.length == 1) {
//         if (currentVal > target) {
//             return 0;
//         } else if (currentVal < target) {
//             return 1;
//         } else if (currentVal === target) {
//             return 0;
//         }
//     }
    
//     let nextVal
//     let targetInsertionIndex
    
//     for (let i = 0; i < nums.length; i++) {        
//         currentVal = nums[i]
//         nextVal = nums[i + 1]
        
//         if (i === 0 && currentVal > target){
//             targetInsertionIndex = 0;
//             break;
//         }
        
//         if (target > currentVal && target < nextVal) {
//             console.log("plus")
//             return targetInsertionIndex = i + 1;
//             break;
//         }
        
//         if (target === currentVal) {
//             console.log("equals")
//             return targetInsertionIndex = i;
//             break;
//         }
        
//         if (i === nums.length - 1){
//             targetInsertionIndex = nums.length;
//             break;
//         }
//     }
    
//     return targetInsertionIndex;
// };