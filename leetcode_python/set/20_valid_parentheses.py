class Solution(object):
    def isValid(self, s):
        """
        :type s: str
        :rtype: bool
        """

        stack = []

        pairs = {
            ')': '(',
            ']': '[',
            '}': '{'
        }

        for b in s:
            if b in pairs:
                if not stack or stack.pop() != pairs[b]:
                    return False
            else:
                stack.append(b)

        return not stack
