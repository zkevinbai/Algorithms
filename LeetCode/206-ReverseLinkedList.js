const reverseList = function (head) {
    let prev = null;
    let curr = head;
    let next = null;

    while(curr){
        next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }

    return prev;
};

// Linked list

// const nodeOne = {
//     next: nodeTwo,
//     value: 1
// }

// const nodeTwo = {
//     next: nodeThree,
//     value: 2
// }

// const nodeThree = {
//     next: null,
//     value: 2
// }


