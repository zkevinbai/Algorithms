function kthLargestElement(nums, k) {
    nums = nums.sort();

    let kleIndex = nums.length - 1 - k;

    return nums[kleIndex];
}