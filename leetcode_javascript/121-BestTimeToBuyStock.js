var maxProfit = function (prices) {
    let min = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        let newNum = prices[i];

        if (newNum < min) {
            min = newNum;
        }

        if (newNum - min > maxProfit) {
            maxProfit = newNum - min;
        }

    }

    return maxProfit;

};