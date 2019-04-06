function addTwoHugeNumbers(a, b) {
    let aValue = getValue(a);
    let bValue = getValue(b);

    return aValue + bValue;
}

function geValue(linkList) {
    let value = "";

    let node = linkList;

    while( node.next ) {
        value += node.value;

        node = node.next;
    }

    return parseInt(value);
}