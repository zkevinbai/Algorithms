// Input: 
    // The first element of a node list (with next and value properties)
// Output:
    // boolean indicating whether this list is a palindrome
    
// Restrictions O(n) time, using O(1) space

function isListPalindrome(list) {
    let array = [];
    if(!list) return array;
    let node = list;
    while(node) {
        array.push(node.value);
        node = node.next;
    }

    let rev = array;
    rev = rev.reverse();
    return [arr, rev];
    return array === rev;
}

