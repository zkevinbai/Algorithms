// O(1) space

function rotateImage(a) {
    for (let i = 0; i < a.length; i++) {
        let temp = [];
        for (let j = 0; j < a.length; j++) {
            temp.unshift( a[j].shift() )
        }
        
        for (let k = 0; k < temp.length; k++) {
            const element = temp[k];
            a[i].push(element);
        }
    }

    return a;
}

// let a = [
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9]
// ]

// a = [
//     [2, 3, 7, 4, 1],
//     [5, 6],
//     [8, 9]
// ]

// a = [
//     [3, 7, 4, 1],
//     [6, 8, 5, 2],
//     [9]
// ]

// a = [
//     [7, 4, 1],
//     [8, 5, 2],
//     [9, 6, 3]
// ]

// rotateImage(a);