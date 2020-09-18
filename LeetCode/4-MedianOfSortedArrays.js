/*
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

Follow up: The overall run time complexity should be O(log (m+n)).



Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
Example 3:

Input: nums1 = [0,0], nums2 = [0,0]
Output: 0.00000
Example 4:

Input: nums1 = [], nums2 = [1]
Output: 1.00000
Example 5:

Input: nums1 = [2], nums2 = []
Output: 2.00000


Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106
*/

// create new array
// use division to find middle

const findMedianSortedArrays = function (nums1, nums2) {
    let newArray = [];
    let totalLength = nums1.length + nums2.length

    while (totalLength) {
        if (!nums1.length) {
            newArray = newArray.concat(nums2);
            totalLength = 0;
            break;
        }
        
        if (!nums2.length) {
            newArray = newArray.concat(nums1);
            totalLength = 0;
            break;
        }

        if (nums1[0] < nums2[0]) {
            newArray.push(nums1.shift());
        } else {
            newArray.push(nums2.shift());
        }

        totalLength -= 1;
    }

    const newLength = newArray.length;
    const lengthEven = (newLength % 2 === 0);
    const midPoint = Math.floor(newLength / 2);

    console.log(
        'na', newArray,
        'nl', newLength,
        'le', lengthEven,
        'mp', midPoint,
    )

    if (lengthEven) {
        const leftNum = newArray[midPoint - 1];

        return (leftNum + newArray[midPoint]) / 2;
    } else {
        return newArray[midPoint];
    }
};