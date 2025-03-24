class Solution(object):
    def twoSum(self, numbers, target):
        """
        :type numbers: List[int]
        :type target: int
        :rtype: List[int]
        """
        left, right = 0, len(numbers) - 1

        while left < right:
            current_sum = numbers[left] + numbers[right]

            if current_sum == target:
                return [left + 1, right + 1]  # Convert to 1-based index
            elif current_sum < target:
                left += 1  # Increase sum by moving left pointer right
            else:
                right -= 1  # Decrease sum by moving right pointer left
