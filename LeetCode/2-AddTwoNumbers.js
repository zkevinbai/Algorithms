/*
You are given two non - empty linked lists representing two non - negative integers.The digits are stored in reverse order and each of their nodes contain a single digit.Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

    Example:

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
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

const addTwoNumbers = (l1, l2) => {
    return linkedListSum(l1) + linkedListSum(l2);
};