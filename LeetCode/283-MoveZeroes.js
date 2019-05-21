const moveZeroes = function (nums) {
    let sorted = nums.sort((a,b) => a - b);

    let firstNonZero;

    for (let index = 0; index < sorted.length; index++) {
        const number = sorted[index];
        if(number !== 0){
            firstNonZero = index;
            break;
        }
    }

    return sorted.slice(firstNonZero).concat(sorted.slice(0, firstNonZero));
    
};