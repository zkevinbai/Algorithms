# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution(object):
    def hasCycle(self, head):
        """
        :type head: ListNode
        :rtype: bool
        """

        list_set = set()

        while head:
            if head in list_set:
                return True
            else:
                list_set.add(head)
                head = head.next

        return False
