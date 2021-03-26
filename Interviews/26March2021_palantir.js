// 2048, build an algo that can move an array left

// input would be numerical, array of n length
// output should have values concatenated, and shifted left

const shiftLeft = (array) => {
    let left = 0;
    let right = 1;

    while (left < array.length && right < array.length) {
        const leftVal = array[left];
        const rightVal = array[right];

        if (rightVal === 0) {
            right += 1;
        } else if (rightVal > leftVal || rightVal < leftVal) {
            left += 1;
            right = left + 1;
        } else if (leftVal === rightVal) {
            array[left] += rightVal;
            array[right] = 0;
            left = right + 1;
            right = left + 1;
        } else {
            right += 1;
        }
    }

    // 0 0 0 4

    // available [0, 1, 2]

    const openIndices = [];

    for (let i = 0; i < array.length; i++) {
        const currentVal = array[i];

        if (currentVal !== 0 && openIndices.length) {
            const shiftIndex = openIndices.shift();
            array[shiftIndex] = currentVal;
            array[i] = 0;
        }

        if (currentVal === 0) {
            openIndices.push(i);
        }
    }

    return array;

    // 2 0 2 0
    // 4 0 0
}


let testCase = [2, 4, 6, 8, 10];

console.log(shiftLeft(testCase))