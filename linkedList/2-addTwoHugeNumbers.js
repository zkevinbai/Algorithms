// function ListNode(x) {
//   this.value = x;
//   this.next = null;
// }

function addTwoHugeNumbers(a, b) {
    let aValue = getValue(a);
    let bValue = getValue(b);

    let newValue = aValue + bValue + "";

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

    return fourSplit
    return fourSplit.map(element => parseInt(element));
}

function linkedListMaker(array){
    let shift = array.shift();
    let node = ListNode(parseInt(shift));

    while(array.length) {
        shift = array.shift();

        let temp = ListNode(parseInt(shift));

        node.next = temp;

        node = temp;
    }

    return node;
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