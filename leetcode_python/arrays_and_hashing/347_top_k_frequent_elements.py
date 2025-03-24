import heapq


class Solution(object):
    def topKFrequent(self, nums, k):
        """
        :type nums: List[int]
        :type k: int
        :rtype: List[int]
        """

        count = {}

        for num in nums:
            if num in count:
                count[num] += 1
            else:
                count[num] = 1

        min_heap = []

        for num, freq in count.items():
            heapq.heappush(min_heap, (freq, num))

            if len(min_heap) > k:
                heapq.heappop(min_heap)

        return [num for freq, num in min_heap]
