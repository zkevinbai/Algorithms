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
    // [x] create function to determine the length of a linked list;
    // [x] build reversed linked list using the reversed segments


function reverseNodesInKGroups(l, k) {
    // base case
    if (k < 2) return l;

    // build segments of linked list
    let segments = segmentLinkedList(l, k);

    // reverse segments if they are k length;       
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];

        if (linkedListLength(segment) === k) {
            segments[i] = linkedListReverse(segment);
        }
    }

    // join segments; 
    let head = segments.shift();
    let node = head;

    while(segments.length !== 0) {
        while(node.next !== null) {
            node = node.next;
        }

        node.next = segments.shift();
    }
    
    return head;
}

// length of linked list
function linkedListLength(l) {
    let length = 0;
    let node = l;
    while (node) {
        length += 1;
        node = node.next;
    }
    return length;
}

// segment linked list by integer k
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
    let next = null;

    let newHead;

    while (current) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;

        if (!current) {
            newHead = prev;
        }
    }

    return newHead;
}