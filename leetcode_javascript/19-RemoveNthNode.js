/*
Given a linked list, remove the n-th node from the end of list and return its head.

Example:

Given linked list: 1->2->3->4->5, and n = 2.

After removing the second node from the end, the linked list becomes 1->2->3->5.
Note:

Given n will always be valid.

Follow up:

Could you do this in one pass?

to do this in one pass, you hit the end
then you go back until you get where you want to go
then you delete
then you complete
*/

const linkedListLength = (head) => {
    let length = 0;
    let node = head;

    while (node) {
        node = node.next;
        length += 1;
    }

    return length;
}

const removeNthFromEnd = (head, n) => {
    const length = linkedListLength(head);
    let node = head;
    let prevNode = null;
    let targetCount = length - n;

    if (targetCount === 0) {
        return head.next;
    }

    while (targetCount > 0) {
        prevNode = node;
        node = node.next;
        targetCount -= 1;
    }

    prevNode.next = node.next;

    return head;
};

