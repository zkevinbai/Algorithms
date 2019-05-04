// select a range of strings that has k different things in it

function upToKDifferences(str, k) {
    let split = [];

    let array = str.split("");

    for (let i = 0; i < array.length; i++) {
        let slice = new Set([array[i]])
        for (let j = i + 1; j < array.length; j++) {
            slice.add(array[j]);

            if(slice.size === k){
                split.push(array.slice(i,j).join(""))
                i = j;
                j = i + 1;
            }
        }
    }

    return split;
}

