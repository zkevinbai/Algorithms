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