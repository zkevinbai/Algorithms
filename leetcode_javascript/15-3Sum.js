// stage 5 while loops 313/313 O(n^2)
var threeSum = function (nums) {

    var ret = []; //ret is "return"
    if (!nums || nums.length < 3) return ret;

    nums = nums.sort(function (a, b) { return a - b; });

    for (var y = 0; y < nums.length - 2; y++) {
        if (y == 0 || nums[y] > nums[y - 1]) {
            var j = y + 1;
            var k = nums.length - 1;

            while (j < k) {
                var sum = nums[y] + nums[j] + nums[k];
                if (sum == 0) {
                    ret.push([nums[y], nums[j], nums[k]]);
                    j++;
                    k--;

                    //skip duplicates from j iterator                   
                    while (j < k && nums[j] == nums[j - 1])
                        j++;

                    //skip duplicates from k iterator
                    while (j < k && nums[k] == nums[k + 1])
                        k--;
                }

                //if sum < 0 then we know we need to increase our lower number (remember the array is sorted)
                else if (sum < 0) {
                    j++;
                }
                //if sum > 0 then we need to decrease our upper number
                else {
                    k--;
                }
            }
        }
    }

    return ret;
}

// stage 4 a + b = -c; 311/313 O(n^2)
function threeSum(nums) {
    // create negatives
    let sorted = nums.sort();
    let negatives = sorted.map( el => el * -1 );

    let object = {};

    for (let index = 0; index < negatives.length; index++) {
        const target = negatives[index];
        let dup = sorted.slice(0);
        dup.splice(index, 1);

        let hash = {};

        // use negatives as target for 2 sum
        for (let j = 0; j < dup.length; j++) {
            let element = dup[j];

            if(hash[element] !== undefined){
                let negativeTarget = -1 * target;
                let originalNumber = dup[hash[element]];
                let zeroes = [negativeTarget, originalNumber, element];

                let subArray = zeroes.sort();
                let stringSub = subArray + "";

                if (!object[stringSub]) {
                    object[stringSub] = subArray;
                }
            }

            if(hash[target - element] === undefined) {
                hash[target - element] = j;
            }
        }

    }

    return Object.values(object).sort();
};

// function twoSum(target, nums){
//     hash[target - element] = index;
// };

// stage 3 failed simultaneous movement

// let nums = [-1, 0, 1, 2, -1, -4]

// function threeSum(nums) {
//     debugger;
//     let sorted = nums.sort();

//     let object = {};

//     for (let a = 0; a < sorted.length - 1; a++) {
//         const elementA = sorted[a];
        
//         let cCounter = sorted.length - 1;

//         for (let b = a + 1; b < sorted.length; b++) {
//             let elementB = sorted[b];
//             let elementC = sorted[cCounter];

//             if (elementA + elementB + elementC === 0 && b !== cCounter) {
//                 let zeroes = [elementA, elementB, elementC];

//                 let subArray = zeroes.sort();
//                 let stringSub = subArray + "";

//                 if (!object[stringSub]) {
//                     object[stringSub] = subArray;
//                 }
//             }

//             cCounter -= 1;
//         }
//     }

//     return Object.values(object).sort();
// };

// stage 2 brute force 311/313 O(n^3)
function threeSum(nums) {
    let sorted = nums.sort();

    let object = {};

    for (let a = 0; a < sorted.length - 2; a++) {
        const elementA = sorted[a];
        for (let b = a + 1; b < sorted.length - 1; b++) {
            const elementB = sorted[b];
            for (let c = b + 1; c < sorted.length; c++) {
                const elementC = sorted[c];
                if (elementA + elementB + elementC === 0) {
                    let zeroes = [elementA, elementB, elementC];

                    let subArray = zeroes.sort();
                    let stringSub = subArray + "";

                    if (!object[stringSub]){
                        object[stringSub] = subArray;
                    }
                }
            }
        }
    }

    return Object.values(object).sort();
};

// stage 1 extreme brute force 114/313
// function iterativeSubsets(array) {
//     let res = [[]];

//     for (let i = 0; i < array.length; i++) {
//         const number = array[i];
//         const newArrs = [];
//         for (let j = 0; j < res.length; j++) {
//             newArrs.push(res[j].concat(number));
//         }
//         res = res.concat(newArrs);
//     }

//     return res;
// }

// function threeSum (nums) {
//     // get all subsets
//     let subSets = iterativeSubsets(nums);

//     let response = [];

//     // filter for length 3
//     for (let index = 0; index < subSets.length; index++) {
//         const subArray = subSets[index];
        
//         if(subArray.length === 3 && subArray.reduce( (acc, val) => acc + val ) === 0 ){
//             response.push(subArray);
//         }
//     }

//     // filter for unique and sort
//     let object = {};

//     for (let index = 0; index < response.length; index++) {
//         let subArray = response[index].sort();
//         let stringSub = subArray + "";

//         object[stringSub] = subArray;
//     }
    
//     return Object.values(object).sort();
// };