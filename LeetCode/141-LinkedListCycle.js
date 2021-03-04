/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */

// o(n) runtime, o(n) space
const hasCycle = (head) => {
    const values = {};

    let node = head;

    if (!node) return false;
    if (!node.next) return false;
    if (node.next.next === node) return true;

    while (node.next.next) {
        if (values[node.next.val] === node.next.next.val) {
            console.log(node.next.val)
            return true;
        }

        values[node.val] = node.next.val;

        node = node.next;
    }

    return false
};

// o(n) runtime, o(1) space
const hasCycle = (head) => {
    const values = {};

    let node = head;

    if (!node) return false;
    if (!node.next) return false;

    while (node.next.next) {
        if (node.next.visited) {
            return true;
        }
        node.visited = true;
        node = node.next;
    }

    return false
};