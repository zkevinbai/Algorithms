/*
    for a given number, determine if it is palindromic
    
    (if it can be reversed to be the same number)
*/

// var isPalindrome = function(x) {
//     const string = x + "";

//     for (let i = 0; i < string.length / 2; i++) {
//         const right = string[string.length - i - 1]
//         const left = string[i]

//         if (right !== left) return false;
//     }

//     return true;
// };

const isPalindrome = (number) => {
    let num = number;
    let rev = 0;

    if (num < 0) return false
    if (num < 10) return true

    while (num !== 0) {
        const digit = num % 10;
        rev = rev * 10 + digit;
        num = Math.floor(num / 10)
    }

    // console.log ({rev, num})

    return rev === number
}

/*

smaller than 0 is nonpalindrome
between 0 and 10 is palindrome
convert string split reverse 

left pointer starts at 0
right pointer starts at length - 1

as long as left pointer < right pointer

1 2 3
1 2

*/


