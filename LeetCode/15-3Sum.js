// stage 4 a + b = -c;
function threeSum(nums) {
    // create negatives
    let sorted = nums.sort();
    let negatives = sorted.map( el => el * -1 );

    let answer = [];

    for (let index = 0; index < negatives.length; index++) {
        const target = negatives[index];
        let dup = sorted.slice(0);
        dup.splice(index, 1);

        let hash = {};

        for (let j = 0; j < dup.length; j++) {
            let element = dup[j];

            if(hash[element] !== undefined){
                let negativeTarget = -1 * target;
                let originalNumber = dup[hash[element]];
                let zeroes = [negativeTarget, element, originalNumber];

                answer.push(zeroes);
            }

            if(hash[target - element] === undefined) {
                hash[target - element] = j;
            }
        }

    }

    return answer;
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

// stage 2 brute force 311/313
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