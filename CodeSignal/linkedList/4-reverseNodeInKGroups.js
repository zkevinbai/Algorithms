// Definition for singly-linked list:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
//

// Input
    // linked list l
    // k is a positive integer less than or equal to the number of nodes in linked list

// Output
    // same list with nodes reversed k at at a time
    // return modified linked list
    // if linked list is not a multiple of k, the nodes at the end should be left as is

// Restrictions
    // O(n) time
    // O(1) space

// Example
    // For l = [1, 2, 3, 4, 5] and k = 2, the output should be
    // reverseNodesInKGroups(l, k) = [2, 1, 4, 3, 5];

// strategy
    // [x] create function to reverse any linked list
    // [x] create function to segment a list into k sections
    // [] create function to determine the length of a linked list;
    // [] build reversed linked list using the function

function reverseNodesInKGroups(l, k) {
    // base case
    if(k < 2) return l;

    // build segments of linked list
    let segments = segmentLinkedList(l, k);

    // build new linked list, reverse only if sub linked list is of k length;


}

// segment linked list
function segmentLinkedList(l, k) {
    let segments = [];
    let node = l;
    let counter = 0;

    while (node) {
        if (counter === 0) {
            segments.push(node);
            counter = k;
        }

        counter -= 1;
        node = node.next;
    }

    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];

        let counter = k;
        let node = segment;
        let copy = node;

        while (counter > 1) {
            if (node.next) {
                node = node.next;
            }
            counter -= 1;
        }
        node.next = null;

        segments[i] = copy;
    }

    return segments;
}

// reverse linked list;
function linkedListReverse(l) {
    let prev = null;
    let current = l;
    let next = current.next;

    let newHead;

    while (current) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;

        if (!current) {
            newHead = current;
        }
    }

    return newHead;
}