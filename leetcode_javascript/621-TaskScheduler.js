/*
621. Task Scheduler
Medium

Given a characters array tasks, representing the tasks a CPU needs to do, 
where each letter represents a different task. Tasks could be done in any order. 
Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.

However, there is a non-negative integer n that represents the cooldown period 
between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks.

Return the least number of units of times that the CPU will take to finish all the given tasks.


Example 1:

Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation:
A -> B -> idle -> A -> B -> idle -> A -> B
There is at least 2 units of time between any two same tasks.
Example 2:

Input: tasks = ["A","A","A","B","B","B"], n = 0
Output: 6
Explanation: On this case any permutation of size 6 would work since n = 0.
["A","A","A","B","B","B"]
["A","B","A","B","A","B"]
["B","B","B","A","A","A"]
...
And so on.
Example 3:

Input: tasks = ["A","A","A","A","A","A","B","C","D","E","F","G"], n = 2
Output: 16
Explanation:
One possible solution is
A -> B -> C -> A -> D -> E -> A -> F -> G -> A -> idle -> idle -> A -> idle -> idle -> A


Constraints:

1 <= task.length <= 104
tasks[i] is upper-case English letter.
The integer n is in the range [0, 100].
*/

/*
solution
group individual tasks into units of unique groups
group - gap - group

answer is number of groups + n * (number of groups - 1) // the amount of time for the gaps

i did not understand the question
groups should not be unique
*/

const leastInterval = (tasks, n) => {
    if (n === 0) {
        return tasks.length;
    }

    const groups = [];
    const taskCount = {};

    tasks.forEach(task => {
        if (!taskCount[task]) {
            taskCount[task] = 1;
        } else {
            taskCount[task] += 1;
        }
    });

    const uniqueTasks = Object.keys(taskCount);

    let counter = tasks.length;
    // console.log(JSON.stringify(taskCount, null, 2))
    while (counter > 0) {
        const group = [];

        uniqueTasks.forEach((task) => {
            if (taskCount[task] > 0) {
                taskCount[task] -= 1
                counter -= 1;
                group.push(task)
            };
        })

        groups.push(group);
    }

    const groupCount = groups.length;

    return (groupCount) + ((groupCount - 1) * n)
};