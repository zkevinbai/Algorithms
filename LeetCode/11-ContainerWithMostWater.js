/*
Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

Note: You may not slant the container and n is at least 2.

The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.

Example:
Input: [1,8,6,2,5,4,8,3,7]
Output: 49
*/

// organize the values, go from the highest numbers down to the lowest

// On solution
const maxArea = function (heightArray) {
    // width refers to the spaces between the numbers
    // an array of length 9 has a width of 8
    let width = heightArray.length - 1;
    let leftPointer = 0;
    let rightPointer = width;
    let maxArea = Math.min(
        heightArray[leftPointer],
        heightArray[rightPointer],
    ) * width;

    while (leftPointer !== rightPointer) {
        if (heightArray[leftPointer] < heightArray[rightPointer]) {
            leftPointer += 1;
        } else {
            // covers right < left, and right === left
            rightPointer -= 1;
        }
        width -= 1;

        const newArea = Math.min(
            heightArray[leftPointer],
            heightArray[rightPointer]
        ) * width;

        if (newArea > maxArea) {
            maxArea = newArea;
        }
    }

    return maxArea;
};

// On^2 solution
const maxArea = function (height) {
    let maxArea = 0;

    for (let i = 0; i < height.length - 1; i++) {
        const leftVal = height[i];

        for (let n = i + 1; n < height.length; n++) {
            const rightVal = height[n];

            const distance = n - i;

            const currentArea = distance * Math.min(leftVal, rightVal);

            if (currentArea > maxArea) {
                maxArea = currentArea;
            }
        }
    }

    return maxArea;
};