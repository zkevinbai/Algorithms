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

const addTwoNumbers = (l1, l2) => {
    let nodeOne = l1;
    let nodeTwo = l2;

    let carryOver = 0;

    // calculate initial values
    let nodeOneVal = nodeOne ? nodeOne.val : 0;
    let nodeTwoVal = nodeTwo ? nodeTwo.val : 0;

    let positionSum = nodeOneVal + nodeTwoVal + carryOver;

    if (positionSum > 10) {
        carryOver = 1;
        positionSum -= 10;
    }

    const newListHead = new ListNode(
        positionSum,
        null,
    )

    let newList = newListHead;

    nodeOne = nodeOne.next;
    nodeTwo = nodeTwo.next;

    while (carryOver || nodeOne || nodeTwo) {
        nodeOneVal = nodeOne ? nodeOne.val : 0;
        nodeTwoVal = nodeTwo ? nodeTwo.val : 0;

        console.log(
            'start: ', newList.val,
            'n1v: ', nodeOneVal,
            'n2v: ', nodeTwoVal,
            'c: ', carryOver,
        )

        positionSum = nodeOneVal + nodeTwoVal + carryOver;

        if (positionSum > 10) {
            carryOver = 1;
            positionSum -= 10;
        } else {
            carryOver = 0;
        }

        newList.next = new ListNode(
            positionSum,
            null,
        );

        newList = newList.next;

        if (nodeOne) { nodeOne = nodeOne.next };
        if (nodeTwo) { nodeTwo = nodeTwo.next };
    }

    return newListHead;
}


// This works for 1560 / 1563 test cases, but not for numbers > JS max int.

// const linkedListSum = (head) => {
//     let value = [];
//     let node = head;

//     while (node) {
//         value.unshift(node.val + '');
//         node = node.next;
//     }

//     console.log(value)
//     console.log(parseInt(value.join('')))
//     return parseInt(value.join(''));
// }

// const numberToLinkedLIst = (integer) => {
//     let array = (integer + '').split('');

//     // console.log(ListNode);
//     // console.log(new ListNode(1, null));

//     const head = new ListNode(
//         parseInt(array.pop()),
//         null,
//     )

//     console.log(array)

//     let node = head;

//     console.log(head);

//     while (array.length) {
//         let newNode = new ListNode(
//             parseInt(array.pop()),
//             null,
//         );

//         node.next = newNode;
//         node = newNode;
//     }

//     return head;
// }

// const addTwoNumbers = (l1, l2) => {
//     const sum = linkedListSum(l1) + linkedListSum(l2);

//     return numberToLinkedLIst(sum);
// };