/*
You are given two non - empty linked lists representing two non - negative integers.The digits are stored in reverse order and each of their nodes contain a single digit.Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

    Example:

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

const linkedListSum = (head) => {
    let value = [];
    let node = head;

    while (node) {
        value.unshift(node.val + '');
        node = node.next;
    }

    console.log(value)
    console.log(parseInt(value.join('')))
    return parseInt(value.join(''));
}

const numberToLinkedLIst = (integer) => {
    let array = (integer + '').split('');

    const head = ListNode(
        parseInt(array.pop),
        null,
    )

    let node = head;

    while (array.length) {
        let newNode = ListNode(
            parseInt(array.pop),
            null,
        );

        node.next = newNode;
        node = newNode;
    }

    return head;
}

const addTwoNumbers = (l1, l2) => {
    const sum = linkedListSum(l1) + linkedListSum(l2);

    return numberToLinkedLIst(sum);
};