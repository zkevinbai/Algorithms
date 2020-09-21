/*

Given a singly linked list, determine if it is a palindrome.

Example 1:

Input: 1->2
Output: false
Example 2:

Input: 1->2->2->1
Output: true
Follow up:
Could you do it in O(n) time and O(1) space?

*/

// create array representation
// traverse from array to see if palindrome
// 1 2 2 1
// 0 1 2 3
// 1 2 3 2 1

const isPalindrome = function (head) {
    const array = [];
    let node = head;
    while (node){
       array.push(node.val);
       node = node.next; 
    }

    const isEven = (array.length % 2 === 0);
    const midPoint = array.length / 2;
    if (isEven) {
        leftIndex = midPoint - 1;
        rightIndex = midPoint;
    } else {
        leftIndex = midPoint - 2;
        rightIndex = midPoint + 1;
    }

    let right;
    let left;

    for (rightIndex; rightIndex < array.length; i++) {
        right = array[rightIndex];
        left = array[leftIndex];

        if (right !== left) {
            return false;
        }
        leftIndex -= 1;
    }
    
    return true;
};
