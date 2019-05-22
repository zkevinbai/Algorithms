// this question is jank
// we are not actually deleting a linked list node
//  we are just shifting everything down by one

var deleteNode = function (node) {
    node.val = node.next.val;
    node.next = node.next.next;
};