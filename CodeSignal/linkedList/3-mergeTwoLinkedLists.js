// Definition for singly-linked list:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
//

// Strategy
    // merge sort but with lists instead of arrays

function mergeTwoLinkedLists(l1, l2) {

    let listOne = l1;
    let listTwo = l2;

    if (!listOne) return listTwo;
    if (!listTwo) return list;

    let node;
    if (listOne.value < listTwo.value) {
        node = new ListNode(listOne.value);
        listOne = listOne.next;
    } else {
        node = new ListNode(listTwo.value);
        listTwo = listTwo.next;
    }

    let head = node;

    while (listOne && listTwo) {
        if (listOne.value < listTwo.value) {
            node.next = new ListNode(listOne.value);
            if (!listOne.next) {
                listOne = null
            } else {
                listOne = listOne.next;
            }

        } else {
            node.next = new ListNode(listTwo.value);
            if (!listTwo.next) {
                listTwo = null
            } else {
                listTwo = listTwo.next;
            }
        }

        node = node.next;
    }

    if (listOne) {
        node.next = listOne;
    } else if (listTwo) {
        node.next = listTwo;
    }

    return head;
}