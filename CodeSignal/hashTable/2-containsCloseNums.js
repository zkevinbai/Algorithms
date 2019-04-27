// input
    // array of integers nums, integer k

// output
    // boolean indicating whether there is a pair of key value pairs (i, j)
        // where nums[i] = nums[j] and
        // the difference between i and j is less than or equal to k

// strategy
    // generate all pairs of i and j, with k or less in between
    // check the pairs for equality

// SOLUTION ONE O(n^2)
// function containsCloseNums(nums, k) {
//     let indices = [];

//     for (let i = 0; i < nums.length; i++) {
//         for (let j = i + 1; j < nums.length; j++) {
//             let difference = j - i;
//             if (difference <= k){
//                 indices.push([i, j]);
//             }
//         }
//     }

//     for (let index = 0; index < indices.length; index++) {
//         let i = indices[index][0];
//         let j = indices[index][1];

//         if (nums[i] === nums[j]){
//             return true;
//         }
//     }

//     return false;
// }


// strategy
    // store all index positions of numbers in hashmap
    // check if the index positions are length > 2, and the distance
        // using pointers

// SOLUTION TWO O(n^3)
function containsCloseNums(nums, k) {
    let numbers = {};

    for (let i = 0; i < nums.length; i++) {
        let number = nums[i];
        if (numbers[number]) {
            numbers[number].push(i);
        } else {
            numbers[number] = [i];
        }
    }

    let keys = Object.keys(numbers);
    let queue = [];

    for (let index = 0; index < keys.length; index++) {
        let key = keys[index];

        if (numbers[key].length > 1){
            queue.push(numbers[key]);
        }
    }
    
    while(queue.length){
        let shift = queue.shift();

        for (let i = 0; i < shift.length; i++) {
            for (let j = i+1; j < shift.length; j++) {
                
                let difference = shift[j] - shift[i];
                
                if (difference <= k){
                    return true;
                }
            }
        }

    }

    return false;
}
