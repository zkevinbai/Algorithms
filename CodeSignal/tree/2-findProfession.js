// e
// ed
// eded
// ededed

//         E
//      /         \
//     E           D
//     /   \        /  \
//     E     D      D    E
//     / \   / \    / \   / \
//     E   D D   E  D   E E   D

// input
    // level and position

// output
    // profession of the individual

// strategy
    // for each level, 
        // double ed pattern, 
        // replace current level
    // at target level
        // key in with n -1 

function findProfession(level, pos) {
    if(level === 1)return "Engineer";

    let counter = 1;
    let currentLevel = ["Engineer", "Doctor"];

    while(counter < level){
        let reversedDuplicate = currentLevel.slice().reverse();
        currentLevel = currentLevel.concat(reversedDuplicate);
        counter += 1;
    }

    return currentLevel[pos - 1];
}
