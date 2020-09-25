/*
Write a program to find the node at which the intersection of two singly linked lists begins.

Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
Output: Reference of the node with value = 8

Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
Output: Reference of the node with value = 2

Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
Output: null

Notes:

If the two linked lists have no intersection at all, return null.
The linked lists must retain their original structure after the function returns.
You may assume there are no cycles anywhere in the entire linked structure.
Each value on each linked list is in the range [1, 10^9].
Your code should preferably run in O(n) time and use only O(1) memory.
*/

// find offset
// traverse longer until offset
// solve

const linkedListLength = (head) => {
    let length = 1;
    let node = head;

    while (node) {
        node = node.next;
        length += 1;
    }

    return length;
}

const getIntersectionNode = function (headA, headB) {
    const lengthA = linkedListLength(headA);
    const lengthB = linkedListLength(headB);

    let nodeA = headA;
    let nodeB = headB;
    let offset;

    if (lengthA > lengthB) {
        offset = lengthA - lengthB;
        while (offset) {
            nodeA = nodeA.next;
            offset -= 1;
        }
    } else if (lengthB > lengthA) {
        offset = lengthB - lengthA;
        while (offset) {
            nodeB = nodeB.next;
            offset -= 1;
        }
    }

    let intersection = null;

    while (nodeA) {
        if (!intersection && nodeA === nodeB) {
            intersection = nodeA;
        } 
        
        if (intersection && nodeA !== nodeB) {
            intersection = null;
        }

        nodeA = nodeA.next;
        nodeB = nodeB.next;
    }

    return intersection;
};
/*
an intersection means from the right side the 2 are the same
reverse both linked lists, and see if the end (head) nodes are the same
this tells you if there is any intersection
then get the last value before divergence, thats intersection
do a traverse again through the linked lists to find the value
return the intersection
*/

// const linkedListLength = (head) => {
//     let length = 1;
//     let node = head;

//     while (node) {
//         node = node.next;
//         length += 1;
//     }
    
//     return length; 
// }

// const reverseLinkedList = (head) => {
//     let prev = null;
//     let curr = head;
//     let next = null;

//     while (curr) {
//         next = curr.next;
//         curr.next = prev;
//         prev = curr;
//         curr = next;
//     }

//     return prev;
// }

// const getIntersectionNode = function (headA, headB) {
//     const reverseA = reverseLinkedList(headA);
//     const reverseB = reverseLinkedList(headB);

//     if (reverseB.val !== reverseA.val) {
//         return null;
//     }

//     let intersection = nodeA.val;
//     let nodeAOffset = 1;
//     let nodeA = reverseA;
//     let nodeB = reverseB;

//     while (nodeA.val = nodeB.val) {
//         nodeA = nodeA.next;
//         nodeB = nodeB.next;
        
//         nodeAOffset += 1;
//         intersection = nodeA.val;
//     }

//     const listALength = linkedListLength(headA);
//     let intersectionOffSet = listALength - listAOffset;

//     nodeA = headA;
//     while (intersectionOffSet > 0) {
//         nodeA = nodeA.next;
//         intersectionOffSet -= 1;
//     }

//     return nodeA;
// };