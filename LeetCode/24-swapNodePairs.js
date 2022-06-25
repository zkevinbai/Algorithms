
const swap = ({
    first,
    second,
    third
}) => {
    second.next = first;
    first.next = third

    return first;
}

var swapPairs = function (head) {
    let start = null;

    let current = head;
    let prev;

    while (current.next) {
        const next = current.next
        const future = next.next;

        if (!start) {
            prev = swap({
                first: current,
                second: next,
                third: future,
            })
            start = two;
        } else {
            prev.next = next
            prev = swap({
                first: current,
                second: next,
                third: future,
            })
        }

        current = future;
    }

    return start || head;
};