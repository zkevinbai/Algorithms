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