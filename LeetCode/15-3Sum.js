function threeSum(nums) {
    let sorted = nums.sort();

    let object = [];

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

                    object[stringSub] = subArray;
                }
            }
        }
    }

    return Object.values(object).sort();
};


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
//     let subSets = iterativeSubsets(nums);

//     let response = [];

//     for (let index = 0; index < subSets.length; index++) {
//         const subArray = subSets[index];
        
//         if(subArray.length === 3 && subArray.reduce( (acc, val) => acc + val ) === 0 ){
//             response.push(subArray);
//         }
//     }

//     let object = {};

//     for (let index = 0; index < response.length; index++) {
//         let subArray = response[index].sort();
//         let stringSub = subArray + "";

//         object[stringSub] = subArray;
//     }
    
//     return Object.values(object).sort();
// };