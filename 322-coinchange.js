// hello nick
/* 
322. Coin Change
Medium
Topics
Companies
You are given an integer array coins representing coins of different denominations 
and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. 
If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

Example 1:
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1

Example 2:
Input: coins = [2], amount = 3
Output: -1

Example 3:
Input: coins = [1], amount = 0
Output: 0

Constraints:
1 <= coins.length <= 12
1 <= coins[i] <= 231 - 1
0 <= amount <= 104
*/

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

const coinChange = (coins, amount) => {
    return myCoinChange(coins, amount, { 0: 0 });
}

const myCoinChange = (coins, amount, memo) => {
    if (amount === 0) {
        return 0
    }

    // const sortedCoins = coins.sort((a, b) => a - b)

    // build foundation
    for (let coin of coins) {
        memo[coin] = 1
    }

    for (let i = 0; i <= amount; i++) {
        const memoizedAmounts = []

        if (memo[i] !== 0 && !memo[i]) {
            for (let coin of coins) {
                if (coin <= i) {
                    if (memo[i - coin] !== -1) {
                        memoizedAmounts.push(memo[i - coin])
                    }
                }
            }

            if (memoizedAmounts.length === 0) {
                memo[i] = -1
            } else {
                memo[i] = Math.min(...memoizedAmounts) + 1
            }
        }
    }

    // console.log(memo)

    return memo[amount]
}

// const coinChange = (coins, amount) => {

//     if (amount === 0) {
//         return 0
//     }

//     let coinCount = 0;
//     let changeToMake = amount;

//     const sortedCoins = coins.sort((a, b) => a - b)

//     const findBiggestCoinIdx = (startIdx = coins.length) => {
//         for (i = startIdx; i >= 0; i--) {
//             if (coins[i] <= changeToMake) {
//                 return i
//             }
//         }
//     }

//     let biggestCoinIndex = findBiggestCoinIdx()
//     let biggestCoinValue = coins[biggestCoinIndex]

//     if (biggestCoinValue === changeToMake) {
//         return 1
//     }

//     while (changeToMake > 0 && changeToMake >= biggestCoinValue) {

//         changeToMake -= biggestCoinValue
//         coinCount += 1

//         if (biggestCoinValue > changeToMake) {
//             // console.log({ changeToMake, coinCount })
//             biggestCoinIndex = findBiggestCoinIdx(biggestCoinIndex)
//             biggestCoinValue = coins[biggestCoinIndex]
//             // console.log({ biggestCoinIndex, biggestCoinValue })
//         }
//     }

//     // console.log(biggestCoinValue, changeToMake)

//     if (changeToMake > 0) {
//         return -1
//     } else {
//         return coinCount;
//     }
// };

// const coinChange = (coins, amount) => {
//     if (amount === 0) {
//         return 0
//     }

//     const recursiveAmounts = [];

//     for (let i = 0; i < coins.length; i++) {
//         const coinVal = coins[i]

//         if (coinVal <= amount) {
//             const localChange = coinChange(coins, amount - coinVal)
//             if (localChange > -1) {
//                 recursiveAmounts.push(localChange)
//             }
//         }
//     }

//     if (!!recursiveAmounts.length) {
//         return Math.min(...recursiveAmounts) + 1
//     } else {
//         return -1
//     }
// }

// const myCoinChange = (coins, amount, memo) => {
//     if (amount === 0) {
//         return 0
//     }

//     const recursiveAmounts = [];

//     for (let i = 0; i < coins.length; i++) {
//         const coinVal = coins[i]

//         if (coinVal <= amount) {
//             const newAmount = amount - coinVal

//             if (!!memo[newAmount]) {
//                 console.log('hello', memo)
//                 recursiveAmounts.push(memo[newAmount])
//             } else {
//                 const localChange = coinChange(coins, newAmount)
//                 memo[newAmount] = localChange

//                 if (localChange > -1) {
//                     recursiveAmounts.push(localChange)
//                 }
//             }
//         }
//     }

//     if (!!recursiveAmounts.length) {
//         return Math.min(...recursiveAmounts) + 1
//     } else {
//         return -1
//     }
// }
