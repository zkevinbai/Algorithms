// Input: 
    // The first element of a node list (with next and value properties)
// Output:
    // boolean indicating whether this list is a palindrome
    
// Restrictions O(n) time, using O(1) space

// strategy
    // split in half
    // reverse the first half of the list in place
    // 2 iterations to check if values are equal

function isListPalindrome(list) {
    if (!list) return array;
    let node = list;
    let listLength = 0;

    while (node) {
        node = node.next;
        listLength += 1;
    }

    let firstHalfHead;
    let secondHalfHead;

    let lead = list.next; //b (.next is c)
    let trail = list;   //a (.next is b)
    for (let i = 0; i < Math.floor(listLength / 2); i++) {
        if (i === Math.floor(listLength / 2) - 1) {
            firstHalfHead = trail;
            secondHalfHead = lead;
        } else {
            trail.next = null;
            let temp = lead.next; //c
            lead.next = trail; //b.next = a
            trail = lead;   //b
            lead = temp;    //c
        }
    }

    let pointerA = firstHalfHead;
    let pointerB = secondHalfHead;
    return [pointerA, pointerB]
    for (let i = 0; i <= Math.floor(listLength / 2); i++) {
        if (pointerA.value !== pointerB.value) {
            return false;
        }
        pointerA = pointerA.next;
        pointerB = pointerB.next;
    }

    return true;
}

// O(n) space O(n) time
// function isListPalindrome(list) {
//     let array = [];
//     if (!list) return array;
//     let node = list;
//     let listLength = 0;

//     while (node) {
//         array.push(node.value);
//         node = node.next;
//         listLength += 1;
//     }

//     let rev = array;
//     rev = rev.reverse();
//     return array.toString() === rev.toString();
// }
