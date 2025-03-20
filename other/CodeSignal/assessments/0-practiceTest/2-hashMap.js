// input
    // a series of values in a 2d array
    // a series of operations as strings

// output
    // the sum of all the results for get operations

// Operations
    // insert(x,y)- insert an object with key x and value y.
    // get(x) - return the value of an object with key x.
    // addToKey(x) - add x to all keys in map.
        // require creating a new object;
    // addToValue(y) - add y to all values in map.

// solved; almost 28/30

function hashMap(queryType, query) {
    debugger;
    let querySum = 0;

    let hash = {};

    for (let index = 0; index < query.length; index++) {
        const operation = queryType[index];

        const queryLeft = query[index][0];
        const queryRight = query[index][1];

        if(operation === "get"){
            querySum += hash[queryLeft];
        } else if (operation === "insert") {
            hash[queryLeft] = queryRight;
        } else if (operation === "addToValue") {
            let keys = Object.keys(hash);
            for (let index = 0; index < keys.length; index++) {
                const key = keys[index];
                hash[key] += queryLeft;
            }
        } else if (operation === "addToKey") {
            let keys = Object.keys(hash);

            let newHash = {};
            for (let index = 0; index < keys.length; index++) {
                const key = parseInt(keys[index]) + queryLeft;
                const value = hash[keys[index]];
                newHash[key] = value;
            }
            hash = newHash;
        }
    }

    return querySum;
}

let queryType = ["insert",
    "insert",
    "addToValue",
    "addToKey",
    "get"]

let query = [[1, 2],
[2, 3],
[2],
[1],
[3]]