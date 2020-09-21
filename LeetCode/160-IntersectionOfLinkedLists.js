/*
Write a program to find the node at which the intersection of two singly linked lists begins.

Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
Output: Reference of the node with value = 8

Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
Output: Reference of the node with value = 2

Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
Output: null
*/

/*
an intersection means from the right side the 2 are the same
reverse both linked lists, and see if the end (head) nodes are the same
this tells you if there is any intersection
then get the last value before divergence, thats intersection
do a traverse again through the linked lists to find the value
return the intersection
*/

const lengthLinkedList = (head) => {
    let length = 0;
    let node = head;

    while (node) {
        node = node.next;
        length += 1;
    }
    
    return length; 
}

const reverseLinkedList = (head) => {
    let prev = null;
    let curr = head;
    let next = null;

    while (node.next) {
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return prev;
}

const getIntersectionNode = function (headA, headB) {
    const reverseA = reverseLinkedList(headA);
    const reverseB = reverseLinkedList(headB);

    if (reverseB.val !== reverseA.val) {
        return null;
    }

    let intersection = nodeA.val;
    let nodeA = reverseA;
    let nodeB = reverseB;

    while (nodeA.val = nodeB.val) {
        nodeA = nodeA.next;
        nodeB = nodeB.next;

        intersection = nodeA.val;
    }

    return new ListNode(intersection);
};