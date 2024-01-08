function iterativeSubsets(array){
    let res = [[]];

    for (let i = 0; i < array.length; i++) {
        const number = array[i];
        const newArrs = [];
        for (let j = 0; j < res.length; j++) {
            newArrs.push(res[j].concat(number));
        }
        res = res.concat( newArrs );
    }

    return res;
}

let array = [1, 2, 3];


// res = [[]];
//     newArrs = [[1]];

// res = [[], [1]];
//     newArrs = [[2], [1,2]];

// res = [[], [1], [2], [1, 2]];
//     newArrs = [[3], [1,3], [2,3], [1,2,3]];

// res = [[], [1], [2],[3] [1, 2], [1,3], [2,3], [1,2,3]];
