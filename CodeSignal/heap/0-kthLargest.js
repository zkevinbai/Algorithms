
// strategy 1 - sorting and indexing O(n)
function kthLargestElement(nums, k) {
    nums = nums.sort((a, b) => a > b);

    let kleIndex = nums.length - k;

    return nums[kleIndex];
}