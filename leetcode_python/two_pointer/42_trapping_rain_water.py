class Solution(object):
    def trap(self, height):
        """
        :type height: List[int]
        :rtype: int
        """

        if not height:
            return 0

        left, right = 0, len(height) - 1  # Initialize pointers
        # Initialize max heights
        left_max, right_max = height[left], height[right]
        water_trapped = 0

        while left <= right:
            if height[left] < height[right]:
                # If current left height is less than right height, process the left pointer
                if height[left] >= left_max:
                    left_max = height[left]  # Update left_max
                else:
                    # Calculate trapped water
                    water_trapped += left_max - height[left]
                left += 1  # Move the left pointer to the right
            else:
                # If current right height is less than or equal to left height, process the right pointer
                if height[right] >= right_max:
                    right_max = height[right]  # Update right_max
                else:
                    water_trapped += right_max - \
                        height[right]  # Calculate trapped water
                right -= 1  # Move the right pointer to the left

        return water_trapped

        # if not height:
        #     return 0

        # n = len(height)

        # left_max = [0]*n
        # right_max = [0]*n
        # water_trapped = 0

        # left_max[0] = height[0]
        # for i in range(1, n):
        #     left_max[i] = max(left_max[i-1], height[i])

        # right_max[n-1] = height[len(height) - 1]
        # for i in range(n-2, -1, -1):
        #     right_max[i] = max(right_max[i+1], height[i])

        # for i in range(n):
        #     water_trapped += min(left_max[i], right_max[i]) - height[i]

        # return water_trapped
