// Definition for singly-linked list:
// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }
//

// input: 
    // 2 large numbers represented as a linked list
    // each link is a 4 digit number with leading zeros removed
// output
    // sum of 2 large numbers in linkedlist or array it looks like
    // segmented into 4 digits, with leading zeros removed

// function addTwoHugeNumbers(a, b) {
//     function reverseList(next) {
//         let prev;

//         while (next) {
//             const tmp = next.next;
//             next.next = prev;
//             prev = next;
//             next = tmp;
//         }

//         return prev;
//     }

//     a = reverseList(a);
//     b = reverseList(b);

//     let c;
//     let cur;
//     let buf = 0;

//     while (a || b) {
//         let sum = (a ? a.value : 0) + (b ? b.value : 0);

//         sum += buf;
//         buf = 0;

//         if (sum >= 10000) {
//             buf = Math.floor(sum / 10000);
//             sum = sum % 10000;
//         }

//         if (!c) {
//             c = new ListNode(sum);
//             cur = c;
//         } else {
//             cur.next = new ListNode(sum);
//             cur = cur.next;
//         }

//         if (a) a = a.next;
//         if (b) b = b.next;
//     }

//     if (buf) {
//         cur.next = new ListNode(buf);
//         cur = cur.next;
//     }

//     c = reverseList(c);

//     const res = [];

//     while (c) {
//         res.push(c.value);
//         c = c.next;
//     }

//     return res;
// }

    // The code below was my own but only solved 10/16 of the tests/ hidden tests;

Number.prototype.noExponents = function () {
    var data = String(this).split(/[eE]/);
    if (data.length == 1) return data[0];

    var z = '', sign = this < 0 ? '-' : '',
        str = data[0].replace('.', ''),
        mag = Number(data[1]) + 1;

    if (mag < 0) {
        z = sign + '0.';
        while (mag++) z += '0';
        return z + str.replace(/^\-/, '');
    }
    mag -= str.length;
    while (mag--) z += '0';
    return str + z;
}

function addTwoHugeNumbers(a, b) {
    let aValue = getValue(a);
    let bValue = getValue(b);

    let newValue = (aValue + bValue).noExponents() + "";

    let fourSplit = [];

    while (newValue.length) {

        let newValueLength = newValue.length;

        let startShave = newValueLength - 4;
        if (startShave < 0) {
            startShave = 0;
        }

        fourSplit.unshift(
            shaveLeadingZeros(newValue.slice(startShave, newValueLength))
        );

        newValue = newValue.slice(0, startShave);
    }

    let newValueArray = fourSplit.map(element => parseInt(element));

    let shift = newValueArray.shift();
    let first = new ListNode(shift);
    let node = first;

    while (newValueArray.length) {
        shift = newValueArray.shift();
        const temp = new ListNode(shift);

        node.next = temp;

        node = temp;
    }

    return first;
}

function shortest(a, b) {
    let i = 1;
    let nodeA = a;

    while (nodeA) {
        i += 1;

        nodeA = nodeA.next;
    }

    let j = 1;
    let nodeB = b;

    while (nodeB) {
        j += 1;

        nodeB = nodeB.next;
    }

    if (i < j) {
        return a;
    } else {
        return b;
    }
}

function longest(a, b) {
    let i = 1;
    let nodeA = a;

    while (nodeA) {
        i += 1;

        nodeA = nodeA.next;
    }

    let j = 1;
    let nodeB = b;

    while (nodeB) {
        j += 1;

        nodeB = nodeB.next;
    }

    if (i > j) {
        return a;
    } else {
        return b;
    }
}

function shaveLeadingZeros(string) {
    while (string[0] === "0") {
        string = string.slice(1);
    }

    if (!string.length) return "0";

    return string;
}

function getValue(linkList) {
    let value = "";

    let node = linkList;

    while (node) {
        let nodeV = node.value + "";

        while (nodeV.length < 4) {
            nodeV = "0" + nodeV;
        }

        value += nodeV;

        node = node.next;
    }

    return parseInt(value);
}