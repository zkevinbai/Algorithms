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

Links used
https://coderbyte.com/challenges#
https://www.w3schools.com/sql/func_sqlserver_right.asp
https://stackoverflow.com/questions/139630/whats-the-difference-between-truncate-and-delete-in-sql#:~:text=TRUNCATE%20always%20removes%20all%20the,clause%20in%20the%20TRUNCATE%20statement.
https://www.sqlshack.com/what-is-the-difference-between-clustered-and-non-clustered-indexes-in-sql-server/
https://www.geeksforgeeks.org/denormalization-in-databases/
https://stackoverflow.com/questions/17563726/how-to-see-the-changes-in-a-git-commit#:~:text=To%20see%20the%20diff%20for,the%20~%20notation%20and%20its%20friends.
https://docs.openshift.com/container-platform/3.7/dev_guide/deployments/deployment_strategies.html
https://restfulapi.net/
https://stackshare.io/stackups/aws-codebuild-vs-circleci#:~:text=AWS%20CodeBuild%20is%20a%20fully,%2C%20safely%2C%20and%20at%20scale.
https://medium.com/@kittypawar.8/alternatives-for-rest-api-b7a6911aa0cc#:~:text=There%20are%20many%20alternatives%20for,they%20need%20as%20an%20output.
https://dzone.com/articles/zero-downtime-deployment

How many years of experience do you have as a full-stack developer?
2

---
What is a RESTful API and what are its advantages?

REpresentational
State
Transfer

REST is a pattern, and a RESTful API is an API conforming to that pattern.

The main benefit of REST architecture is its division of responsibility between the server and the client.

Each REST call contains all the information necessary to process it.  The server will never need to be aware of state.
That responsibility is taken care of by the client.

---
What are the benefits of AWS CodeBuild in AWS DevOps?

Codebuild is a CI/CD tool, similar to CircleCI that allows you to build and deploy an app.

Codebuild's advantage is that it will handle load and spin up servers as necessary.  And you can pay by the minute

---
What deployment strategies do you know and have used before? How can a company deploy with no downtime?

In my work experience we used a blue green strategy.  Where we deploy the new code (blue) to production, 
test it.  And then take down the existing servers (green).  If blue fails any tests, users will never see it.

Blue green is a way to deploy without downtime

---
What is the difference between git merge and git rebase?

The difference is how history is treated.  
Rebase replays all existing history, and then adds your code.  This prevents merge conflicts but does change the order that code may have been written in.

Merge combines all commits into one unified timeline.  And is the "true" order of events.  With mutiple developers, this can easily cause merge conflicts.

---
How do you find a list of files that have been changed in a particular commit?

Normally I would navigate to github, use the sha to find that commit, and check the diff.

If github couldn't be accessed, I would use git diff in my terminal.

---
What is the process to revert a commit that has already has been pushed and made public?

Pull the branch, revert the change, commit that revert, and force push the branch.  

---
What is Denormalization in databases?

Denormalization is when you duplicate data in multiple tables to avoid joins.
If you know one apil will require frequent joins, it could be good to denormalize a table to prevent the join.
This is only for a heavily read data.  Data that is frequently updated should not be denormalized.

---
What are some of the different types of indexes in SQL?

Clustered Index - sorted data
NonClustered Index - unsorted data

---
What is the difference between the DELETE and TRUNCATE commands in SQL?

Truncate cannot be rolled back, locks the table, and cannot use WHERE to filter
Delete can be rolled back, locks rows in the table, and can use WHERE to filter

---
What does the following SQL query do?
SELECT RIGHT(Studentname, 5) as Studentname from student

Select the first 5 chars of a student's name, and label it as Studentname from the student table
*/




