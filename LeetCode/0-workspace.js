let binarySearch = (array, target) => {
    if (!array.length) {
        return -1;
    }

    const pivotIndex = Math.floor(array.length/2);
    const pivotVal = array[pivotIndex];
    const data = {
        pivotIndex,
        pivotVal,
    }
    console.log(JSON.stringify(data));

    const leftArray = array.slice(0, pivotIndex);
    const rightArray = array.slice(pivotIndex, array.length);

    if (pivotVal === target) {
        return pivotIndex;
    } else if (pivotVal < target) {
        return pivotIndex + binarySearch(rightArray, target);
    } else if (pivotVal > target) {
        return binarySearch(leftArray, target);
    }
}
