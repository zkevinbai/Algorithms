class Solution(object):
    def minEatingSpeed(self, piles, h):
        """
        :type piles: List[int]
        :type h: int
        :rtype: int
        """

        left, right = 1, max(piles)

        while left < right:
            mid = (left + right) // 2

            totalTime = 0

            for pile in piles:
                totalTime += (pile + mid - 1) // mid
                # totalTime += math.ceil(pile / mid)

            if totalTime > h:
                left = mid + 1
            else:
                right = mid

        return left
