// Sample test

function fizzBuzz(n) {
    // Write your code here

    for (let i = 1; i <= n; i++) {
        const divThree = i % 3 === 0;
        const divFive = i % 5 === 0;
        if (divThree && !divFive) console.log('Fizz');
        if (!divThree && divFive) console.log('Buzz');
        if (divThree && divFive) console.log('FizzBuzz');
        if (!divThree && !divFive) console.log(i);
    }
}

// Whats the difference between span and div

/*

span and div are different HTML tags
divs will not permit anything to be next to it
spans are inline aligned by default, multiple spans can be next to one another

*/

/*
1 optimizing box weights

Input
integer array of item weights

divide item weights into 2 subsets A and B

A & B have no intersection

number of elements in A is minimal

sum of A's weight > sum of B's weight

Output
subsetA in increasing order where the sum of A's weight is greater than sum of B's weight

find the fewest elements whose sum is greater than the remaining elements
*/

/*
 * Complete the 'minimalHeaviestSetA' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

const sum = (array, start, end)

function minimalHeaviestSetA(array) {
    array = array.sort((a, b) => b - a); // biggest to smallest;

    let remainingSum = 0;
    array.forEach((number) => remainingSum += number);

    let answerArray = [];
    let answerSum = 0;
    let i = 0;

    while (remainingSum > answerArraySum) {
        const number = array[i];
        answerArray.push(number);
        answerSum += number;
        remainingSum -= number;
        i += 1;
    }

    return answerArray;
}

