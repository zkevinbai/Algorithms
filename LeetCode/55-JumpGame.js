/**
 * @param {number[]} nums
 * @return {boolean}
 */

const canJump = (nums) => {
    let floatingMax = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (floatingMax < i) {
            return false
        }
        
        const currentMax = i + nums[i];
        
        if (currentMax > floatingMax) {
            floatingMax = currentMax;
        }
    
        if (floatingMax >= nums.length - 1) {
            return true;
        }
    }

    return false;
}


// targetValue - (currentvalue + currentIndex)
// [2,3,1,1,4]
// 2, 0, -2, -1, 0

// const canJump = (nums) => { 
//    if (nums.length < 2) return true 
    
//     const targetIndex = nums.length - 1
//     const stamina = []
//     let sum = 0
//     for (let i = 0; i < nums.length - 1; i++) {
//         const num = (
//             targetIndex - (nums[i] + i)
//         )
        
//         sum += num
//         stamina.push(num)
//     }
    
//     console.log(stamina, sum)
    
//     return !!(sum < nums.length- 1)
// }

// const canJump = (nums) => {
//     let stamina = nums[0];
    
//     for (let i = 1; i < nums.length - 1; i++) {
//         stamina = stamina + nums[i] - 1;
//     }
    
//     console.log(stamina)
    
//     return stamina >= 0
// }

// const helperCanJump = ({
//     targetIndex,
//     currentIndex,
//     currentValue
// }) => {    
//     return !!(currentValue >= targetIndex - currentIndex)
// }

// const canJump = (nums) => {
    
//     if (nums.length === 1) {
//         return true
//     }
    
//     let targetIndex = nums.length - 1;
    
//     // find if any index value pairs (IV pairs) arrive at target index
    
//     let targets = [
//         { 
//             currentIndex: targetIndex, 
//             currentValue: nums[targetIndex]
//         },
//     ];
    
//     while(targets.length > 0) {
//         const target = targets.shift();
//         targetIndex = target.currentIndex
        
//         // console.log("target", target)
//         // console.log("targets", targets)
        
//         for (let i = 0; i < targetIndex; i++) {
//             const currentIndex = i;
//             const currentValue = nums[i];

//             const viable = helperCanJump({
//                 targetIndex,
//                 currentIndex,
//                 currentValue,
//             })

//             if (viable) {
//                 targets.push({
//                     currentIndex,
//                     currentValue
//                 })
//             }

//             if (viable && currentIndex === 0) {
//                 return true;
//             }
//         }
        
//         // console.log("end state", {
//         //     targets,
//         // })
//     }
    
// //     return false;
// // };

// // [1,2,3,4]
// //  0 1 2 3

// const recursiveHelper = (array, targetIndex) => {
//     if (targetIndex === 0) {
//         return true
//     }
    
//     for (let i = targetIndex - 1; i >= 0; i--) {
//         const currentIndex = i;
//         const currentValue = array[i];

//         const viable = !!(currentValue >= targetIndex - currentIndex)

//         if (viable) {
//             return recursiveHelper(array, currentIndex)
//         }
//     }  
    
//     return false;
// }

// const canJump = (nums) => {
//     return recursiveHelper(nums, nums.length - 1)
// }