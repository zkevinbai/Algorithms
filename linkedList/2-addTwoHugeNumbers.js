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

        fourSplit.unshift(
            shaveLeadingZeros(newValue.slice(newValueLength - 4, newValueLength))
        );

        newValue = newValue.slice(0, newValueLength - 4);
    }

    return fourSplit;
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