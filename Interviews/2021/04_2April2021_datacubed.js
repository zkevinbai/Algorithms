/*
1
String Reduction
Have the function StringReduction(str) take the str parameter being passed and return the smallest number you can get through the following reduction method. The method is: Only the letters a, b, and c will be given in str and you must take two different adjacent characters and replace it with the third. For example "ac" can be replaced with "b" but "aa" cannot be replaced with anything. This method is done repeatedly until the string cannot be further reduced, and the length of the resulting string is to be outputted.

For example: if str is "cab", then "ca" can be reduced to "b" and you get "bb" (you can also reduce it to "cc"). The reduction is done so the output should be 2. If str is "bcab", "bc" reduces to "a", so you have "aab", then "ab" reduces to "c", and the final string "ac" is reduced to "b" so the output should be 1.
Examples
Input: "abcabc"
Output: 2
Input: "cccc"
Output: 4
Browse Resources
Search for any help or documentation you might need for this problem. For example: array indexing, Ruby hash tables, etc
*/

/*
    2 pointer approach, build up new string 
*/

const StringReduction = (string) => {

    const mapping = {
        'ab': 'c',
        'ba': 'c',
        'bc': 'a',
        'cb': 'a',
        'ac': 'b',
        'ca': 'b',
    };
    
    for (let i = 0; i < string.length; i++) {
        const current = string[i];
        const next = string[i + 1];
        
        if (!next) continue;

        const combo = current + next;
        const reduced = mapping[combo];

        if (reduced) {
            string = string.slice(0, i) + reduced + string.slice(i + 2, string.length);
            i = 0;
        }
    }

    return string.length;
}

const test = 'abcabc'

console.log(StringReduction(test))

/*
2
SQL Sort Ages
Your table: maintable_ZOTNW

MySQL version: 5.5.56-log

In this MySQL challenge, your query should return the rows from your table where 
LastName = Smith or FirstName = Robert and the rows should be sorted by Age in ascending order. 
Your output should look like the following table.
*/

SELECT
    *
FROM
    maintaible_ZOTNW
WHERE
    FirstName = 'Robert'
OR
    LastName = 'Smith'
ORDER BY
    Age

/*
3
Open ended

How many years of experience do you have as a full-stack developer?
2

What is a RESTful API and what are its advantages?
REpresentational
State
Transfer
What are the benefits of AWS CodeBuild in AWS DevOps?
Write your answer here...
What deployment strategies do you know and have used before? How can a company deploy with no downtime?
Write your answer here...
What is the difference between git merge and git rebase?
Write your answer here...
How do you find a list of files that have been changed in a particular commit?
Write your answer here...
What is the process to revert a commit that has already has been pushed and made public?
Write your answer here...
What is Denormalization in databases?
Write your answer here...
What are some of the different types of indexes in SQL?
Write your answer here...
What is the difference between the DELETE and TRUNCATE commands in SQL?
Write your answer here...
What does the following SQL query do?
SELECT RIGHT(Studentname, 5) as Studentname from student

*/




