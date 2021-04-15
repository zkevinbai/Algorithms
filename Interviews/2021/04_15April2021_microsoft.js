/*
first problem

implement a circular queue with the front, insert, and delete APIs

discuss thread blocking and how to handle multiple simultaneous requests

*/

```
/*

=========================================================================================================================
=========================================================================================================================
=========================================================================================================================

*/

```
/*
second problem

given a linked list with a random pointer pointing to another node in the list

make a deep copy

*/

/*
1 - create array representation of input linked list
1.5 - for each node, search the array for its random, 
then store the array index as a property

{
  val: 1
  next: 2 (node)
  random: 8 (node)
  randomIndex: 3
}

2 - create next pointer only copy of linked list (new linked list)

2.5 create newLinkedList array 


{ val: 1, next: 2}

3 - iterating through the original and the new linked list at same time
use the randomIndex property from original LL
and the array representation of the new Linked List to find the 
newrandomnodes
*/

// 1 2 4 8
// 8 1 2 4

const newNode = (val, next, random) => {
    return ({
        val,
        next,
        random,
    })
}

const deepCopy = (head) => {

    if (!head) return null;

    if (!head.next) return newNode(head.val);

    // make array of original linked list
    const originalLinkedList = []; // [1, 2, 4, 8]

    let node = head;
    while (node.next) {
        originalLinkedList.push(node);
        node = node.next;
    }

    const randomHashes = {}; // 8null: 3, 12: 0, 24: 2, 43: 1

    for (let i = 0; i < originalLinkedList.length; i++) {
        const node = originalLinkedList[i];
        const randomNode = node.random;
        const randomHash = randomNode.val + '' + randomNode.next.val;

        randomHashes[randomHash] = i;
    }

    // 1 2 4 8
    // 8 1 2 4
    /*
        { v: 1, n: 2, r: 8, randomIndex: 3}
    */

    for (let j = 0; j < originalLinkedList.length; j++) {
        const node = originalLinkedList[i];
        const nodeHash = node.val + '' + node.next.val;

        if (randomHases[nodeHash]) {
            node.randomIndex = randomHashes[nodeHash];
        }
    }

    const newHead = newNode(head.val);
    let prevNode = newHead;
    node = head.next;

    // 1 2 4 8
    /*
        { v: 1, n: 2}
    */

    while (node.next) {
        const newNode = newNode(node.val);
        prevNode.next = newNode;
        prevNode = newNode;
    };

    const newLinkedList = [];

    node = newHead;
    while (node.next) {
        newLinkedList.push(node);
        node = node.next;
    }

    // 1 2 4 8
    // 8 1 2 4
    /*
        { v: 1, n: 2, r: 8, randomIndex: 3}
    */
    for (let k = 0; k < newLinkedList.length; k++) {
        {
            const node = newLinkedList[k];

            const originalNode = originalLinkedList[k];
            const originalRandomIndex = originalNode.randomIndex;

            node.random = newLinkedList[originalRandomIndex];
        }
    }

    return newHead;
    // 1 2 4 8
    // 8 1 2 4
};

```

/*

=========================================================================================================================
=========================================================================================================================
=========================================================================================================================

*/

```
/*
third problem

given pairs of courses and prerequsites, determine if it is possible to take all classes
one class can have multiple prerequsites
[1, 0], [1, 2], [2, 4]

*/

/*

prereqs line up for us to take these classes 

*/

const node = (value, next, prev) => {
    return {
        value,
        next,
        prev
    };
}

/*

[1, 0], [1, 2], [2, 4]
{
    1: [0, 2]
    0: null
    2: [4]
    4: null
}

*/


const canTakeCourse = (courses, requirementPairs) => {

    const coursesObject = {};

    // start with a value null key as head of linked list
    // continue building it with the object
    // if a connection is impossible or if we see the same node again (cycle) return false
    // if we build all connections return true

    for (let i = 0; i < requirementPairs.length; i++) {
        const pair = requirementPairs[i];

        const course = pair[0];
        const coursePrereq = pair[1]

        if (!coursesObject[course]) {
            coursesObject[course] = [coursePrereq];
        } else {
            coursesObject[course].push(coursePrereq)
        }

        if (!coursesObject[coursePrereq]) {
            coursesObject[coursePrereq] = null;
        }
    }
    const pointsToNull = {};
    const keys = Object.keys(coursesObject);

    const doesNodePointToNull = (course) => { // return false if goes to null or infinite

        const visited = { course: true };

        if (pointsToNull[course] === null) {
            return true;
        } else {
            let node = course;
            const prereqs = coursesObject[node];

            if (prereqs !== null && !visited[node]) {
                prereqs.forEach
            }
        }

        return false;
    }

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        const prereqs = coursesObject[key];

        if (prereqs === null) {
            pointsToNull[key] = true;
        } else if (prereqs.length === 1) {
            const goesToNull = doesNodePointToNull(prereqs[0]);
            if (!goesToNull) {
                return false;
            } else {
                pointsToNull[prereqs[0]] = true;
            }
        } else {
            for (let j = 0; j < keys.length; j++) {
                const goesToNull = doesNodePointToNull(prereqs[j]);
                if (!goesToNull) {
                    return false;
                } else {
                    pointsToNull[prereqs[0]] = true;
                }
            }
        }
    }

    return true;
}

```

/*

=========================================================================================================================
=========================================================================================================================
=========================================================================================================================

*/

```
/*
fourth problem

find the 10 most common words in a list of non normalized words with possible spaces
tiebreak alphabetically

*/

/*

    input ['Weather', 'weather', 'c',]

    // more than 10 uniques
    // prefer alphabetical order
    // caps? normalize data

    solution

    {
        [word] : count
    }

    {
        [count] : [' ', " cat", words, words]
    }

    Object.values(obj) = []
    sort that array
    return the top 9, see if 10th is a tie, and then tiebreak
*/

const buzzFeed = (words) => {
    const obj = {};

    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        word = word.split(' ').join('');
        if (word.length !== 0) {
            word = String.lowercase(word);

            if (!obj[word]) {
                obj[word] = 1;
            } else {
                obj[word] += 1;
            }
        }
    }

    /*
    { 
        cat: 10
        dog: 11
    }
    */

    let keys = Object.keys(obj); // [cat, dog ...]

    const wordCounts = {};

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const count = obj[key];

        if (!wordCounts[count]) {
            wordCounts[count] = [key];
        } else {
            wordCounts[count].push(key);
        }
    }

    /*
    { 
        10: [cat]
        11: [dog, bird, moose]
    }
    */

    let countKeys = Object.keys(wordCounts);

    countKeys = countKeys.sort((a, b) => a - b); // [11, 10, ]

    let responseCounter = 10;
    const response = [];

    for (let i = 0; i < countKeys.length; i++) {
        if (responseCounter === 0) break;

        let words = wordCounts[i].sort();

        if (words.length >= responseCounter) {
            reponse.concat(words.slice(0, responseCounter));
            responseCounter = 0;
        }

        for (let j = 0; j < words.length; j++) {
            if (responseCounter === 0) break;
            const word = word[j];
            response.push(word);
            responseCounter -= 1;
        }
    }

    return response;
}


    // keys = keys.sort((a, b) => obj[a] - obj[b]);

    // const response = [];

    // response.concat(keys.slice(0, 10));

    // const tenthCount = obj[keys[9]];

    // let wordsWithSameFrequencyAsTenth = keys.filter((key) => obj[key] === tenthCount);
    // wordsWithSameFrequencyAsTenth = wordsWithSameFrequencyAsTenth.sort();

    // response.push(wordsWithSameFrequencyAsTenth[0]);