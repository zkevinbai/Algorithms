/*
Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.

Example:

Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4

 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
*/

// iterative solution
const mergeTwoLists = (listOne, listTwo) => {
    if (!listOne) {
        return listTwo;
    }
    if (!listTwo) {
        return listOne;
    }

    const falseHead = new ListNode(0, null);

    let nodeOne = listOne;
    let nodeTwo = listTwo;

    let newNode = falseHead;

    while (nodeOne && nodeTwo) {
        if (nodeOne.val < nodeTwo.val) {
            newNode.next = new ListNode(nodeOne.val);
            nodeOne = nodeOne.next;
        } else {
            newNode.next = new ListNode(nodeTwo.val);
            nodeTwo = nodeTwo.next;
        }

        newNode = newNode.next;
    }

    if (nodeOne) {
        newNode.next = nodeOne;
    }
    if (nodeTwo) {
        newNode.next = nodeTwo;
    }

    return falseHead.next;
};

// recursive solution
const mergeTwoLists = (listOne, listTwo) => {
    if (!listOne) {
        return listTwo;
    }
    if (!listTwo) {
        return listOne;
    }

    let nodeOne = listOne;
    let nodeTwo = listTwo;

    const newNode = new ListNode(0);

    if (nodeOne.val < nodeTwo.val) {
        newNode.val = nodeOne.val;
        nodeOne = nodeOne.next;
    } else {
        newNode.val = nodeTwo.val;
        nodeTwo = nodeTwo.next;
    }

    newNode.next = mergeTwoLists(nodeOne, nodeTwo);

    return newNode;
};