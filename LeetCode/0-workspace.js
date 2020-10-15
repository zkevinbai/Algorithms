let binarySearch = (array, target) => {
    if (!array.length) {
        return -1;
    }

    if (array.length === 1 && array[0] !== target) {
        return -1;
    }

    const pivotIndex = Math.floor(array.length/2);
    const pivotVal = array[pivotIndex];
    const data = {
        array,
        pivotIndex,
        pivotVal,
    }
    console.log(JSON.stringify(data));

    const leftArray = array.slice(0, pivotIndex);
    const rightArray = array.slice(pivotIndex, array.length);

    if (pivotVal === target) {
        return pivotIndex;
    } else if (pivotVal < target) {
        const rightSearch = binarySearch(rightArray, target);
        if (rightSearch > 0) {
            return pivotIndex + rightSearch;
        } else {
            return -1;
        }
    } else if (pivotVal > target) {
        return binarySearch(leftArray, target);
    }
}
