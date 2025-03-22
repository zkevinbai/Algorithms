class Solution(object):
    def largestRectangleArea(self, heights):
        """
        :type heights: List[int]
        :rtype: int
        """
        # Initialize the stack and the max_area variable
        stack = []
        max_area = 0
        # Add an extra 0 height at the end to handle remaining bars in the stack
        heights.append(0)

        for i in range(len(heights)):
            # While the stack is not empty and the current height is less than the
            # height of the bar at the index stored at the top of the stack
            while stack and heights[i] < heights[stack[-1]]:
                # Pop the top bar index
                h = heights[stack.pop()]
                # Calculate the width of the rectangle with height h
                # If the stack is empty, it means the width extends from the start (index 0)
                w = i if not stack else i - stack[-1] - 1
                # Update max_area with the larger rectangle area
                max_area = max(max_area, h * w)

            # Push the current bar index onto the stack
            stack.append(i)

        return max_area
