function iterativeSubsets(array) {
    let res = [[]];

    for (let i = 0; i < array.length; i++) {
        const number = array[i];
        const newArrs = [];
        for (let j = 0; j < res.length; j++) {
            newArrs.push(res[j].concat(number));
        }
        res = res.concat(newArrs);
    }

    return res;
}

function threeSum (nums) {
    let subSets = iterativeSubsets(nums);

    let response = [];

    for (let index = 0; index < subSets.length; index++) {
        const subArray = subSets[index];
        
        if(subArray.length === 3 && subArray.reduce( (acc, val) => acc + val ) === 0 ){
            response.push(subArray);
        }
    }

    let object = {};

    for (let index = 0; index < response.length; index++) {
        let subArray = response[index].sort();
        let stringSub = subArray + "";

        object[stringSub] = subArray;
    }
    
    return Object.values(object).sort();
};