function kthLargestElement(nums, k) {
    nums = nums.sort();

    let kleIndex = nums.length - k;

    return nums[kleIndex];
}