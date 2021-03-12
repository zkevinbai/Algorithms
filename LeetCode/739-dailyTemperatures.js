/*
Given a list of daily temperatures T, return a list such that, for each day in the input, tells you how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put 0 instead.

For example, given the list of temperatures T = [73, 74, 75, 71, 69, 72, 76, 73], your output should be [1, 1, 4, 2, 1, 1, 0, 0].

Note: The length of temperatures will be in the range [1, 30000]. Each temperature will be an integer in the range [30, 100].
*/
const dailyTemperatures_stack = function (temperature) {
    const result = Array(temperature.length).fill(0); // prefill results
    const stack = [];

    for (let i = 0; i < temperature.length; i++) {
        let top = stack[stack.length - 1];

        while (stack.length && temperature[i] > temperature[top]) { // stack exists, current temperature > top of stack temperature
            const topIndex = stack.pop();

            result[topIndex] = i - topIndex; // update topIndex day's days until hot

            top = stack[stack.length - 1]; // reset top
        }
        stack.push(i);
    }
    return result;
};

// 2 pointer O(n), 3x slower than n^2
const dailyTemperatures_2Pointer = (temperatures) => {
    let slow = 0; fast = 1; res = []; count = 0;

    while (slow < temperatures.length - 1) {
        count++;
        if (temperatures[fast] > temperatures[slow]) {
            res.push(count);
            count = 0;
            slow++
            fast = slow + 1;
        } else if (fast === temperatures.length) {
            res.push(0);
            count = 0;
            slow++
            fast = slow + 1;
        } else {
            fast += 1;
        }
    }

    return res;
};

// iterative O(n^2)
const dailyTemperatures = (temperatures) => {
    const res = [];

    for (let i = 0; i < temperatures.length; i++) {
        const day = temperatures[i];
        let daysUntilHigherTemp = 0;

        if (i === temperatures.length - 1) {
            res.push(daysUntilHigherTemp);
            continue;
        }

        for (let j = i + 1; j < temperatures.length; j++) {
            const newDay = temperatures[j];

            if (newDay > day) {
                daysUntilHigherTemp = j - i;
                break;
            };
        }

        res.push(daysUntilHigherTemp);
    }

    return res;
};