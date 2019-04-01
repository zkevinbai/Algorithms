// Restrictions: O(n) time, O(1) space
// Input: singly linked list of integers starting and an integer k
// Output: remove all elements from list 1 with a value of k

function removeKFromList(list, kDelete) {
    let newList = [];

    if (!list) return newList;
    if (!list.length) return newList;


    for (let i = 0; i < list.length; i++){
        debugger;
        let number = list[i];
        if (number !== kDelete) {
            newList.push(number)
        }
    }

    return newList;
}

let l = [3, 1, 2, 3, 4, 5];
let k = 3;

removeKFromList(l, k)