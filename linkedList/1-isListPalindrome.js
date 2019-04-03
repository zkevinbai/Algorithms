function isListPalindrome(l) {
    let array = [];
    let node = list.value;
    while(node) {
        array.push(node);
        node = node.next;
    }

    return array === array.reverse();
}
