// Definition for singly-linked list:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
//

// Input
    // linked list
    // non negative integer n

// Output
    // linked list with the lead being the last n elements of the input list
    // and terminiating at the n-1th position from the back of the input list

// Example
    // i: [0,1,2,3,4], 2
    // o: [3, 4, 0,1,2]

// Strategy
    // define 4 variables
        // head
        // nSubOneTail
        // nHead
        // tail
    // assign nsubOneTail.next = null;
    // assign tail.next = head;
    // return nHead;

function rearrangeLastN(l, n) {
    let head = l;
    let nsubOneTail;
    let nHead;
    let tail;

    let length = linkedListLength(l);

    let counter = length - 1;
    let nCounter = length - n - 1;
    let node = l;

    while(counter > 0) {
        if(nCounter === 0){
            nsubOneTail = node;
            nHead = node.next;
        }
        node = node.next;

        counter -= 1;
        nCounter -= 1;
    }

    tail = node;

    nsubOneTail.next = null;
    tail.next = head;

    return nHead;
}

function linkedListLength(l) {
    let length = 0;
    let node = l;
    while (node) {
        length += 1;
        node = node.next;
    }
    return length;
}