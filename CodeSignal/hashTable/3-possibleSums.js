// input
    // coins array of coin values
    // quantity array of number of each coin you have
// output
    // integer representing all distinct sums you can make from groupings

// strategy
    // create a trueCount where each coin is represented n times, n being the coin count

function possibleSums(coins, quantity) {
    let trueCount = [];
    while (quantity.length) {
        let shift = quantity.shift();
        let coinShift = coins.shift();

        for (let i = 0; i < shift; i++) {
            trueCount.push(coinShift);
        }
    }

    return trueCount;
}
