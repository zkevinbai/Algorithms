// Input: 
    // The first element of a node list (with next and value properties)
// Output:
    // boolean indicating whether this list is a palindrome
    
// Restrictions O(n) time, using O(1) space

// strategy
    // get the length, and know where half is
    // create a stack

function isListPalindrome(list) {
    let array = [];
    if (!list) return array;
    let node = list;
    let listLength = 0;

    while (node) {
        array.push(node.value);
        node = node.next;
        listLength += 1;
    }

    let rev = array.slice();
    rev = rev.reverse();
    return array.toString() === rev.toString();
}