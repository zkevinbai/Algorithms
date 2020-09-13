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

const mergeTwoLists = (listOne, listTwo) => {
    const falseHead = new ListNode(0, null);

    let nodeOne = listOne;
    let nodeTwo = listTwo;

    let newNode = falseHead;

    while (nodeOne || nodeTwo) {
        if (nodeOne.val <= nodeTwo.val) {
            newNode.next = nodeOne;
            newNode = newNode.next;

            newNode.next = nodeTwo;
            newNode = newNode.next;
        } else {
            newNode.next = nodeTwo;
            newNode = newNode.next;

            newNode.next = nodeOne;
            newNode = newNode.next;
        }
    } 

    return falseHead.next;
};