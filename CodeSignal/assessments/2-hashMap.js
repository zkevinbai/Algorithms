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

function hashMap(queryType, query) {
    let querySum = 0;

    let hash = {};

    for (let index = 0; index < query.length; index++) {
        const operation = queryType[index];

        const queryLeft = query[index][0];
        const queryRight = query[index][1];

        let keys = Object.keys(hash);
        let values = Object.values(hash);

        if(operation === "get"){
            querySum += hash[queryLeft];
        } else if (operation === "insert") {
            hash[queryLeft] = queryRight;
        } else if (operation === "addToValue") {
            for (let index = 0; index < keys.length; index++) {
                const key = keys[index];
                hash[key] += queryLeft;
            }
        } else if (operation === "addToValue") {
            let newHash = {};
            for (let index = 0; index < keys.length; index++) {
                const key = keys[index] + queryLeft;
                const value = values[index];
                newHash[key] = value;
            }
            hash = newHash;
        }
    }

    return querySum;
}
