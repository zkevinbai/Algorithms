class Solution(object):
    def isValid(self, s):
        """
        :type s: str
        :rtype: bool
        """

        stack = []
        mapping = {'(': ')', '[': ']', '{': '}'}  # Open → Close

        for char in s:
            if char in mapping:  # If it's an opening bracket
                stack.append(mapping[char])  # Push expected closing bracket
            else:  # It's a closing bracket
                if not stack or stack.pop() != char:
                    return False  # Either stack is empty or mismatch found

        return not stack  # Stack should be empty if all brackets matched
