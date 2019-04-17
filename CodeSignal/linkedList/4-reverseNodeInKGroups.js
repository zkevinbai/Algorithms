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
    // create function to reverse any linked list
    // create function to segment a list into k sections

function reverseNodesInKGroups(l, k) {
    // base case
    if(k < 2) return l;

    // reverse entire linked list;

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
