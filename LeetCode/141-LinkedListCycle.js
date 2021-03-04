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

const hasCycle = (head) => {
    const values = {};

    let node = head;

    while (node.next) {
        if (values[node.next.val]) {
            console.log('hello')
            return true;
        }

        values[node.val] = true;

        node = node.next;
    }

    return false
};