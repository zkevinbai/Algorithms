// input
    // coins array of coin values
    // quantity array of number of each coin you have
// output
    // integer representing all distinct sums you can make from groupings

// strategy
    // create a trueCount where each coin is represented n times, n being the coin count
    // generate all unique combinations of truecount sums using a set

    // SOLUTION ONE
// const possibleSums = (coins, quantity) => {
//     let trueCount = [];
//     while (quantity.length) {
//         let shift = quantity.shift();
//         let coinShift = coins.shift();

//         for (let i = 0; i < shift; i++) {
//             trueCount.push(coinShift);
//         }
//     }

//     let set = new Set();

//     for (let i = 0; i < trueCount.length; i++) {
//         let coinI = trueCount[i];
//         let sum = coinI;
//         for (let j = i + 1; j < trueCount.length; j++) {
//             set.add(sum);
//             let coinJ = trueCount[j];
//             sum += coinJ;
//         }
//         set.add(sum);
//     }

//     return set.size;
// }

    // SOLUTION TWO
const possibleSums = (coins, quantity) => {
    const uniqueSums = new Set([0]);

    for (let i = 0; i < coins.length; i++) {
        const currentSums = new Set();
        for (let j = 1; j <= quantity[i]; j++) {
            for (let sum of uniqueSums) {
                currentSums.add((coins[i] * j) + sum);
            }
        }
        console.log(currentSums);
        for (let sum of currentSums) {
            uniqueSums.add(sum);
        }
    }

    return uniqueSums.size - 1;
}