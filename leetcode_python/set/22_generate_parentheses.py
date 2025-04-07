class Solution(object):
    def generateParenthesis(self, n):
        """
        :type n: int
        :rtype: List[str]
        """
        result = []

        def backtrack(current, left, right):
            if len(current) == 2 * n:  # Base case: When we've placed all n pairs
                result.append(current)
                return

            if left < n:  # If we can still place an open bracket, do it
                backtrack(current + "(", left + 1, right)

            if right < left:  # If we can place a close bracket, do it
                backtrack(current + ")", left, right + 1)

        backtrack("", 0, 0)
        return result
