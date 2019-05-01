// input
    // array of integers a

// output
    // create new array b
        // b[0] is equal to a[0];
        // b[1] is equal to the last element of a;
        // b[2] is equal to a[1];
        // b[3] is equal to the second - last element of a;
        // and so on.
    // return boolean if new array b is sorted in strictly ascending order

// a 0 1 2 3
// b 0 3 2 1

// strategy
    // create an array of all evens
    // create an array of all odds
    // reverse the odds array
    // create array b and check along the way

function alternatingSort(a) {
    // fill both arrays
    let evens = [];
    let odds = [];

    for (let index = 0; index < a.length; index++) {
        let number = a[index];
        if (index % 2 === 0){
            evens.push(number);
        } else {
            odds.push(number);
        }
    }

    // reverse odds
    odds = odds.reverse();

    // create b
    let b = [];

    while(evens.length && odds.length) {
        b.push(evens.shift());
        b.push(odds.shift());
    }

    b = b.concat(evens, odds);

    // check b against strictly ascending
    return b.toString() === b.sort().toString();
}
