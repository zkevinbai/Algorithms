// Restrictions: O(n) time, O(1) space
// Input: singly linked list of integers starting and an integer k
// Output: remove all elements from list 1 with a value of k


function removeKFromList(list, kDelete) {
    if (!list) return [];
    let head = list;
    let pointerA = list;
    let pointerB = list.next;

    if (pointerA.value === kDelete) {
        head = pointerB;
        pointerA.next = null;

        pointerA = head;
        pointerB = pointerA.next;
    }

    while(pointerB){
        if (pointerB.value === kDelete) {
            let pointerC = pointerB.next;

            pointerB.next = null;
            
            pointerA.next = pointerC;
            pointerB = pointerC;
        } else {
            pointerA = pointerB;
            pointerB = pointerA.next;
        }
    }

    return head;
}

// For array list
// function removeKFromList(list, kDelete) {
//     let newList = [];

//     if (!list) return newList;
//     if (!list.length) return newList;


//     for (let i = 0; i < list.length; i++){
//         debugger;
//         let number = list[i];
//         if (number !== kDelete) {
//             newList.push(number)
//         }
//     }

//     return newList;
// }

// let l = [123, 456, 789, 0]
// let k = 0;

// removeKFromList(l, k)