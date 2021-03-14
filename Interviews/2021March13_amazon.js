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

function minimalHeaviestSetA(array) {
    array = array.sort((a, b) => b - a); // biggest to smallest;

    let remainingSum = 0;
    array.forEach((number) => remainingSum += number);

    let answerArray = [];
    let answerSum = 0;
    let i = 0;

    while (remainingSum >= answerArraySum) {
        const number = array[i];
        answerArray.push(number);
        answerSum += number;
        remainingSum -= number;
        i += 1;
    }

    return answerArray;
}

/*
2 Robot Rodeo

robot inputs
G move forward
L turn left
R turn right

Robot will continue insturctions in infinite loop

Determine if the robot moves in an infintie circle

input array of strings, strings are commands ex 'GLR'
output, array of strings, YES or NO
*/
    //  1
    //4 + 2
    //  3

const isCommandCircle = (command) => {
    const G = 'G', R = 'R', L = 'L';
    if (command.length < 2 && (command === L || command === R)) return true;

    const commandArray = command.split('');

    let commandSequence = [];    
    let times = 4; // minimum number of cycles to find a circle
    while (times > 0) {
        commandSequence = commandSequence.concat(commandArray);
        times -= 1;
    }

    let x = 0, y = 0;
    let orientation = 1; // 1 up 2 right, 3 down, 4 left
    
    const botPositions = {};
    let botPosition = '0,0';
    botPositions[botPosition] = true;
    
    for (let i = 0; i < commandSequence.length; i++) {  
        debugger;      
        const order = commandSequence[i];
        if (order === G) {
            if (orientation === 1) y += 1;
            if (orientation === 2) x -= 1;
            if (orientation === 3) y -= 1;
            if (orientation === 4) x += 1;

            botPosition = x + ',' + y; // ignore rotations, only check moves
            console.log(botPosition);

            if (botPositions[botPosition]) {
                console.log(botPositions, botPosition)
                return true;
            } else {
                botPositions[botPosition] = true;
            }
        } else if (order === R) {
            if (orientation === 4) orientation = 1;
            orientation += 1;
        } else if (order === L) {
            if (orientation === 1) orientation = 4;
            orientation -= 1;
        }
    }

    return false;
}

let demo = 'GGGGGGR';
// let demo = 'GRRRRR';

console.log(isCommandCircle(demo));

function doesCircleExist(commands) {
    const YES = 'YES';
    const NO = 'NO';

    const answerArray = [];

    for (let i = 0; i < commands.length; i++) {
        const command = commands[i];
        if (isCommandCircle(command)) {
            answerArray.push(YES);
        } else {
            answerArray.push(NO)
        }
    }

    return answerArray;
}