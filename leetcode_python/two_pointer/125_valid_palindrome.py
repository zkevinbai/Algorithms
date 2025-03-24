class Solution(object):
    def isPalindrome(self, s):
        """
        :type s: str
        :rtype: bool
        """
        # Remove all non-alphanumeric characters and convert to lowercase
        stripped = ''.join(c.lower() for c in s if c.isalnum())

        # Two-pointer check for palindrome
        left, right = 0, len(stripped) - 1

        while left < right:
            if stripped[left] != stripped[right]:
                return False
            left += 1
            right -= 1

        return True
